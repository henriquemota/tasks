import React, { useState } from 'react'
import axios from 'axios'
import { View, Alert } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { API_URL } from '../../config'

function TaskForm(props) {
  const [data, setData] = useState({ title: '', description: '', done: false })
  const [loading, setLoading] = useState(false)
  const { navigation } = props

  function saveTask() {
    if (data.title.trim().length > 0 && data.description.trim().length > 0) {
      setLoading(true)
      axios
        .post(`${API_URL}/tasks.json`, data)
        .then((res) => {
          console.log(res.data)
          Alert.alert('info...', 'Tarefa gravada com sucesso.')
          navigation.goBack()
        })
        .catch((err) => {
          console.log(err)
          Alert.alert('erro...', 'Erro ao gravar a tarefa.')
        })
        .finally(() => setLoading(false))
    } else Alert.alert('info...', 'Os campos são requeridos.')
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={data.title}
        mode='outlined'
        placeholder='título'
        style={{ margin: 10 }}
        onChangeText={(text) => setData({ ...data, title: text })}
      />
      <TextInput
        value={data.description}
        mode='outlined'
        placeholder='descrição'
        multiline={true}
        numberOfLines={10}
        style={{
          margin: 10,
          height: 200,
        }}
        onChangeText={(text) => setData({ ...data, description: text })}
      />
      <Button
        loading={loading}
        mode='contained'
        style={{ margin: 10 }}
        onPress={saveTask}
      >
        Gravar
      </Button>
    </View>
  )
}

export default TaskForm
