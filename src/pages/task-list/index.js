import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View, FlatList, Alert } from 'react-native'
import { FAB, Searchbar, List } from 'react-native-paper'
import { API_URL } from '../../config'

function TaskList(props) {
  const [data, setData] = useState([])
  const { navigation } = props

  function getTaks() {
    axios
      .get(`${API_URL}/tasks.json`)
      .then((res) => {
        if (res.data) {
          const datalist = Object.entries(res.data).map((e) => {
            return { ...e[1], id: e[0] }
          })
          setData(datalist)
        } else setData([])
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('erro...', 'Erro ao carregar as tarefas.')
      })
  }

  function delTask(id) {
    Alert.alert(
      'confirmação...',
      'Deseja realmente excluir esta tarefa?',
      [
        { text: 'Cancelar' },
        {
          text: 'OK',
          onPress: () => {
            axios
              .delete(`${API_URL}/tasks/${id}.json`)
              .then((res) => {
                getTaks()
                Alert.alert('info...', 'Tarefa excluída com sucesso.')
              })
              .catch((err) => {
                console.log(err)
                Alert.alert('erro...', 'Erro ao excluir a tarefa.')
              })
          },
        },
      ],
      { cancelable: true }
    )
  }

  function updatetask(obj) {
    axios
      .put(`${API_URL}/tasks/${obj.id}.json`, {
        done: true,
        title: obj.title,
        description: obj.description,
      })
      .then((res) => {
        getTaks()
        Alert.alert('info...', 'Tarefa finalizada com sucesso.')
      })
      .catch((err) => {
        console.log(err)
        Alert.alert('erro...', 'Erro ao finalizar a tarefa.')
      })
  }

  useEffect(() => {
    getTaks()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Searchbar style={{ margin: 10 }} />
      <FlatList
        data={data}
        refreshing={false}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            description={`${item.description} - ${
              item.done ? 'Finalizado' : 'Ativo'
            }`}
            onPress={() => delTask(item.id)}
            right={(props) => (
              <FAB
                icon='check'
                small
                onPress={() => updatetask(item)}
                style={{ margin: 5 }}
              />
            )}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={() => getTaks()}
      />
      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon='plus'
        onPress={() => navigation.navigate('taskForm')}
      />
    </View>
  )
}

export default TaskList
