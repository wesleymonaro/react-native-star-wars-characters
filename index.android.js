import React, { Component } from 'react'
import axios from 'axios'

import {
  Text,
  AppRegistry,
  View,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar
} from 'react-native'

const Styles = {
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 20,
    borderColor: '#FFD700',
    borderWidth: 4
  },
  textButton: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold'
  },
  image: {
    alignSelf: 'center'
  }
}

class StarWarsApp extends Component {

  constructor(props) {
    super(props)
    this.state = { text: 'RANDOM CHARACTER', disableButton: false }
  }

  render() {
    var disableButton = false;

    const { main, button, textButton, image } = Styles
    
    const getCharacter = () => {
      this.setState({text: 'LOADING...', disableButton: true})

      const BASE_URL = 'https://swapi.co/api/people';

      var random = Math.floor((Math.random() * 87) + 1);
      axios.get(`${BASE_URL}/${random}`)
        .then((result) => {
          let character = result.data;

          Alert.alert(
            character.name,
            `Height: ${character.height} \nMass: ${character.mass} \nHair color: ${character.hair_color} \nSkin color: ${character.skin_color} \nEye color: ${character.eye_color} \nBirth year: ${character.birth_year} \nGender: ${character.gender}`
          )
          this.setState({ text: 'RANDOM CHARACTER', disableButton: false })
        })

    }


    return (
      <View style={main}>
        <StatusBar backgroundColor='#000' />
        <Image style={image} source={require('./imgs/star_wars.png')} />

        <TouchableOpacity style={button} onPress={getCharacter} disabled={this.state.disableButton}>
          <Text style={textButton}>{this.state.text}</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const App = () => {

  return (
    <StarWarsApp></StarWarsApp>
  )
}

AppRegistry.registerComponent('StarWarsCharacters', () => App)