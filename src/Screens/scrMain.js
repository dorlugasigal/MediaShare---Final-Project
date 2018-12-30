import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions,Modal } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons"
import Icon from "@expo/vector-icons/Ionicons"

import SlidingUpPanel from 'rn-sliding-up-panel';
import ActionButton from 'react-native-action-button';

class MainScreen extends React.Component {
  state = {
    slideUpPanelvisible: false
  }

  render() {
    const window = Dimensions.get('window');
    const { navigation } = this.props;
    const signedIn = global.signedIn;
    const name = global.name;
    const photoUrl = global.photoUrl;

    return (

      <View style={{ flex: 1 }}>
        <View style={[styles.container]}  >
          <Text style={styles.header}>Welcome {name}</Text>
          <Image style={styles.image} source={{ uri: photoUrl }} />
        </View>
        <View style={styles.addButton}>
          <ActionButton buttonColor="#2465B5" size={40}>
          <ActionButton.Item buttonColor='#71777F' title="Add Photo" onPress={() => console.log("notes tapped!")}>
            <Icon  name="md-camera" size={25} color= "white" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#338EFF' title="Add Document" onPress={() => {}}>
            <Icon name="md-document" size={25} color= "white"/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#8CBFFF' title="Add audio" onPress={() => {}}>
            <Icon name="md-mic" size={25}color= "white"/>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#163D6E' title="Gallery" onPress={() => {}}>
            <Icon name="md-images" size={25}color= "white"  />
          </ActionButton.Item>
        </ActionButton>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  rowmenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  addButton: {
    height: '10%',
    alignItems: 'flex-end',
  },
  panelrowmenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '40%',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '80%',
  },
  panelbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  panelcontainer: {
    height: '30%',
    backgroundColor: "#fff",
    borderWidth: 2,
  },
  header: {
    fontSize: 13
  },
  image: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }

});

export default MainScreen;