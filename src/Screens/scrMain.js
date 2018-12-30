import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
//import Icon from "@expo/vector-icons/Ionicons"

import SlidingUpPanel from 'rn-sliding-up-panel';

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
          {/* <Image style={styles.image} source={{ uri: photoUrl }} /> */}
        </View>

        <View style={styles.addButton}>
          {/* add-button  */}
          <TouchableOpacity
            onPress={() => this.setState({ slideUpPanelvisible: true })} >
            <Icon name="add-circle" size={60} color='#0E2E49' />
          </TouchableOpacity>
        </View>

        <SlidingUpPanel
          visible={this.state.slideUpPanelvisible}
          startCollapsed={true}
          draggableRange={{ top: window.height * 0.4, bottom: 0 }}
          onRequestClose={() => this.setState({ slideUpPanelvisible: false })}
          allowDragging={true}
        >
          <View style={styles.panelcontainer}>

            <View style={styles.panelrowmenu}>
              <TouchableOpacity
                style={styles.panelbuttons}
                onPress={() => this.props.navigation.navigate('DocumentScreen')}>
                <Text style={styles.text}>Documents</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.panelbuttons}
                onPress={() => this.props.navigation.navigate('PhotoScreen')}>
                <Text style={styles.text}>Photo</Text>
                <Icon name="add-a-photo" size={40} color='black' />
              </TouchableOpacity>
            </View>

            <View style={styles.panelrowmenu}>
              <TouchableOpacity
                style={styles.panelbuttons}
                onPress={() => this.props.navigation.navigate('AudioScreen')}>
                <Text style={styles.text}>Audio</Text>
                <Icon name="audiotrack" size={40} color='black' />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.panelbuttons}
                onPress={() => this.props.navigation.navigate('GalleryScreen')}>
                <Text style={styles.text}>Gallery</Text>
                <Icon name="photo-library" size={40} color='black' />
              </TouchableOpacity>
            </View>
          </View>
        </SlidingUpPanel>
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
    height: '50%',
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