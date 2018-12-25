import React from 'react';
import {Button, View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import Icon2 from "react-native-vector-icons/AntDesign"
const styles = StyleSheet.create({
    rowmenu: {
      flexDirection: 'row',
      height: '33%',
      justifyContent: 'space-evenly', 
    },
    buttons:{
      justifyContent: 'center',
      alignItems: 'center',
      width: '40%',
      height:'80%',    
    },
    text:{
      fontSize: 20,
      fontWeight: 'bold',
    }
  
  });

class MenuScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, }}>
        <View style={styles.rowmenu}> 
          {/*Documents button*/}
          <TouchableOpacity
          style={styles.buttons}
          onPress={()=>this.props.navigation.navigate('Details')}>
          <Text style={styles.text}>Documents</Text>
          <Icon2 name="addfile" size={40} color='black'/>
          </TouchableOpacity>
  {/*Audio button*/}
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Details')}
            >
            <Text style={styles.text}>Audio</Text>
              <Icon name="audiotrack" size={40} color='black'/>
            </TouchableOpacity>
          </View>
          <View style={styles.rowmenu}> 
          {/*Gallery button*/}
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Details')}
          >
          <Text style={styles.text}>Gallery</Text>
          <Icon name="photo-library" size={40} color='black'/>
          </TouchableOpacity>
          {/*Schedule button*/}
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Details')}
          >
          <Text style={styles.text}>Schedule</Text>
          <Icon name="schedule" size={40} color='black'/>
          </TouchableOpacity>
          </View>
          <View style={styles.rowmenu}> 
          {/*Settings button*/}
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Details')}
          >
          <Text style={styles.text}>Settings</Text>
          <Icon name="settings" size={40} color='black'/>
          </TouchableOpacity>
          {/*Uploaded Files button*/}
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate('Details')}
          >
          <Text style={styles.text}>Uploaded Files</Text>
          <Icon name="cloud-upload" size={40} color='black'/>
          </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  
export default MenuScreen;