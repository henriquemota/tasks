import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, FlatList, Alert, TouchableHighlight } from 'react-native'
import { Searchbar, List, FAB } from 'react-native-paper'
import { API_URL } from '../../config'

export default function TaskList(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const { navigation } = props

  useEffect(() => {
    getTasks()
  }, [])

  function getTasks() {
    setLoading(true)
    axios
      .get(`${API_URL}/tasks.json`)
      .then((res) => {
        if (res.data) {
          const entries = Object.entries(res.data).map((e) => {
            return { id: e[0], ...e[1] }
          })
          setData(entries)
        } else setData([])
      })
      .catch((err) => Alert.alert('Erro...', 'Erro ao listar as tarefas.'))
      .finally(() => setLoading(false))
  }

  function delTask(id) {
    Alert.alert(
      'Confirmação...',
      'Deseja realmente excluir essa tarefa?',
      [
        { text: 'Cancelar' },
        {
          text: 'OK',
          onPress: () => {
            setLoading(true)
            axios
              .delete(`${API_URL}/tasks/${id}.json`)
              .then((res) =>
                Alert.alert('Info...', 'Tarefa excluída com sucesso.')
              )
              .catch((err) =>
                Alert.alert('Erro...', 'Erro ao listar as tarefas.')
              )
              .finally(() => {
                setLoading(false)
                getTasks()
              })
          },
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Searchbar placeholder='Search' onChangeText={(text) => null} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <List.Item
              title={item.title}
              description={item.description}
              onPress={() => Alert.alert('info...', 'info aqui')}
              onLongPress={() => delTask(item.id)}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={item.done ? 'check' : 'border-none-variant'}
                />
              )}
            />
          </>
        )}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => getTasks()}
      />
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='plus'
        onPress={() => navigation.navigate('taskForm')}
      />
    </View>
  )
}
