import React from 'react';
import {Button, View, Text,StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"

const styles = StyleSheet.create({
    rowmenu: {
      flexDirection: 'row',
      height: '33%',
      justifyContent: 'space-evenly', 
    },
  
  });

class MenuScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, }}>
        <View style={styles.rowmenu}> 
          <Button
          title="Documents"
          onPress={()=>this.props.navigation.navigate('Details')}
          />
  
          <Button
            title="Audio"
            onPress={() => this.props.navigation.navigate('Details')}>
              <Icon name="audiotrack" size={30} color='white'/>
            </Button>
          </View>
          <View style={styles.rowmenu}> 

          <Button
            title="Gallery"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <Button
            title="Schedule"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          </View>
          <View style={styles.rowmenu}> 
          <Button
            title="Settings"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <Button
            title="Uploaded Files"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          </View>
        </View>
      );
    }
  }
  
export default MenuScreen;