//NT Tshabalala 
//220044174
//gradedlab3

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import questionsData from './questions.json';
import shuffle from 'lodash.shuffle';

const Stack = createStackNavigator();

function AssessmentScreen({ navigation }) {
  const [questions, setQuestions] = useState(shuffle(questionsData).slice(0, 10));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex) => {
    if (attempts < 2) {
      setSelectedOption(optionIndex);
      setAttempts(attempts + 1);
    }
  };

  const handleNextQuestion = () => {
    if (attempts === 2) {
      const correctAnswer = questions[currentQuestionIndex].answer;
      if (selectedOption === correctAnswer) {
        setScore(score + 10);
      }
    }

    setSelectedOption(null);
    setAttempts(0);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('Result', { score });
    }
  };

  return (
    <View style={styles.container}>
      {currentQuestionIndex < questions.length ? (
        <View>
          <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === index && { backgroundColor: 'grey' },
              ]}
              onPress={() => handleOptionSelect(index)}
              disabled={selectedOption !== null}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
            disabled={selectedOption === null}
          >
            <Text>Next Question</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.result}>Assessment Completed</Text>
          <Text style={styles.result}>Your score: {score}</Text>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function ResultScreen({ route }) {
  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Assessment Completed</Text>
      <Text style={styles.result}>Your score: {score}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={AssessmentScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  option: {
    backgroundColor: 'pink',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  nextButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  navigationButton: {
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});


