import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TaskList from './pages/task-list'
import TaskForm from './pages/task-form'

export default function Routes() {
  const AppStack = createStackNavigator()

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: true }}>
        <AppStack.Screen
          name='taskList'
          component={TaskList}
          options={{ title: 'Lista de tarefas' }}
        />
        <AppStack.Screen
          name='taskForm'
          component={TaskForm}
          options={{ title: 'Formulário tarefas' }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
