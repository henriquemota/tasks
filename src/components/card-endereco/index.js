import React from 'react'
import { Text, View } from 'react-native'

function CardEndereco(props) {
  const { Nome, Latitude, Longitude, UF, CEP, CodigoIBGE } = props.data

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        margin: 10,
        padding: 10,
      }}
    >
      <Text style={{ fontSize: 15, margin: 5 }}>{Nome}</Text>
      <Text style={{ fontSize: 15, margin: 5 }}>
        (lat, lng) {Latitude} e {Longitude}
      </Text>
      <Text style={{ fontSize: 15, margin: 5 }}>CEP {CEP}</Text>
      <Text style={{ fontSize: 15, margin: 5 }}>UF {UF}</Text>
      <Text style={{ fontSize: 15, margin: 5 }}>IBGE {CodigoIBGE}</Text>
    </View>
  )
}

export default CardEndereco
