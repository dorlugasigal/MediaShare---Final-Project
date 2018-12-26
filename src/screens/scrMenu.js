import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import Icon2 from "react-native-vector-icons/AntDesign"
const styles = StyleSheet.create({
  rowmenu: {
    flexDirection: 'row',
    height: '33%',
    justifyContent: 'space-evenly',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '80%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }

});

class MenuScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, }}>
        <View style={styles.rowmenu}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('DocumentUp')}>
            <Text style={styles.text}>Documents</Text>
            <Icon2 name="addfile" size={40} color='black' />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: 'white' }]}
            onPress={() => this.props.navigation.navigate('AudioUp')}
          >
            <Text style={styles.text}>Audio</Text>
            <Icon name="audiotrack" size={40} color='black' />
          </TouchableOpacity>
        </View>

        <View style={styles.rowmenu}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('galleryscreen')}
          >
            <Text style={styles.text}>Gallery</Text>
            <Icon name="photo-library" size={40} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('schedule')}
          >
            <Text style={styles.text}>Schedule</Text>
            <Icon name="schedule" size={40} color='black' />
          </TouchableOpacity>
        </View>

        <View style={styles.rowmenu}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('settings')}
          >
            <Text style={styles.text}>Settings</Text>
            <Icon name="settings" size={40} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('uploadedF')}
          >
            <Text style={styles.text}>Uploaded Files</Text>
            <Icon name="cloud-upload" size={40} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MenuScreen;