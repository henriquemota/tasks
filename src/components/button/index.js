import React from 'react'
import { Text, TouchableHighlight } from 'react-native'
import { Feather } from '@expo/vector-icons'

function Button(props) {
  const {
    backgroundColor = 'rgba(70, 130, 250, 0.30)',
    text = '',
    iconName = 'cast',
    onPress,
  } = props
  return (
    <TouchableHighlight
      style={{
        backgroundColor: backgroundColor,
        height: 100,
        width: 100,
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <>
        <Text style={{ textAlign: 'center' }}>{text}</Text>
        <Feather
          name={iconName}
          size={24}
          color='#282B35'
          style={{ margin: 5 }}
        />
      </>
    </TouchableHighlight>
  )
}

export default Button
