import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoListScreen from "./src/screen/TodoListScreen";
import TodoAddScreen from "./src/screen/TodoAddScreen";
import TodoUpdateScreen from "./src/screen/TodoUpdateScreen";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={TodoListScreen}
            options={{
              title: 'Lista de afazeres',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#f07774',
                height: 150, 
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontSize: 40,
              },
            }}
          />
          <Stack.Screen name="Adicionar Tarefa" component={TodoAddScreen} />
          <Stack.Screen name="Atualizar Tarefa" component={TodoUpdateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
