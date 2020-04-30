import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { API_URL } from '../../config'

export default function TaskForm(props) {
  const initialState = { title: '', description: '', done: false }
  const [data, setData] = useState(initialState)

  function saveTask() {
    axios
      .post(`${API_URL}/tasks.json`, data)
      .then((res) => {
        Alert.alert('Sucesso...', 'Dados gravados com sucesso.')
        setData(initialState)
      })
      .catch((err) => Alert.alert('Erro...', 'Erro ao gravar os dados.'))
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TextInput
        style={{ margin: 5 }}
        mode='outlined'
        placeholder='Título'
        value={data.title}
        onChangeText={(text) => setData({ ...data, title: text })}
      />
      <TextInput
        style={{ margin: 5, height: 200 }}
        textAlignVertical={true}
        mode='outlined'
        multiline={true}
        numberOfLines={10}
        placeholder='Descrição'
        value={data.description}
        onChangeText={(text) => setData({ ...data, description: text })}
      />
      <Button style={{ margin: 5 }} mode='contained' onPress={saveTask}>
        Gravar
      </Button>
    </View>
  )
}
