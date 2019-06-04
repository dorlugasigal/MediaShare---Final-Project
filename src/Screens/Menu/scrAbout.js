import React from 'react';
import { View, Text,StyleSheet,Image } from 'react-native'

class AboutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../../assets/icon.png")}></Image>
        <Text style={styles.MainTitle}>App Developers:</Text>
        <Text style={styles.DevelopersTitle}>Dor Lugasi Gal, Daniel Morad Saka</Text>
        <Text style={styles.body}>Media Share are an application</Text>
        <Text style={styles.body}>for sharing and manage media on your phone</Text>
        <Text style={styles.body}>shring and manage media wasnt more easily</Text>
        <Text style={styles.body}>Enjoy! and Invite Your Friends</Text>
      </View>
    );
  }
}
export default AboutScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  MainTitle:{
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 25,
  },
  DevelopersTitle:{
    color: 'blue',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  body:{
    fontSize: 16,
  }, logo: {
    backgroundColor: "#056ecf",
    height: 100,
    width: 100,
    borderRadius:15
  },
})