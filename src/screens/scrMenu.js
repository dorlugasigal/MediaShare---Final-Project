import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import Icon2 from "react-native-vector-icons/AntDesign"

const styles = StyleSheet.create({
  rowmenu: {
    flexDirection: 'row',
    flex:1,
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
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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

class MenuScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const signedIn= navigation.getParam('signedIn', '');
    const  name= navigation.getParam('name', '');
    const  photoUrl= navigation.getParam('photoUrl', '');
    return (

      <View style={{ flex: 1 }}>
        <View style={[styles.container]}  >
          <Text style={styles.header}>Welcome {name}</Text>
          <Image style={styles.image} source={{ uri: photoUrl }} />
        </View>       
         <View style={styles.rowmenu}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('DocumentScreen')}>
            <Text style={styles.text}>
              Documents
            </Text>
            <Icon2 name="addfile" size={40} color='black' />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttons, { backgroundColor: 'white' }]}
            onPress={() => this.props.navigation.navigate('AudioScreen')}
          >
            <Text style={styles.text}>Audio</Text>
            <Icon name="audiotrack" size={40} color='black' />
          </TouchableOpacity>
        </View>

        <View style={styles.rowmenu}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('GalleryScreen')}
          >
            <Text style={styles.text}>Gallery</Text>
            <Icon name="photo-library" size={40} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('ScheduleScreen')}
          >
            <Text style={styles.text}>Schedule</Text>
            <Icon name="schedule" size={40} color='black' />
          </TouchableOpacity>
        </View>

        <View style={styles.rowmenu}>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('SettingsScreen')}
          >
            <Text style={styles.text}>Settings</Text>
            <Icon name="settings" size={40} color='black' />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('FilesScreen')}
          >
            <Text style={styles.text}>Uploaded Files</Text>
            <Icon name="cloud-upload" size={40} color='black' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default MenuScreen;