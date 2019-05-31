import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import * as Expo from 'expo';
const GLOBAL = require('../../Globals.js');


const styles = StyleSheet.create({
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
})


class LoginSplashScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { signedIn: false, name: "", photoUrl: "", email: "" }
  }
  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '517235184328-tgvsi39epm24edn7rm02njmakmhcvmsq.apps.googleusercontent.com',
        iosClientId: '517235184328-6ih4iqcplt9ivbfmsqdrs8o0707hd6ml.apps.googleusercontent.com',
        scopes: ['profile', 'email','https://www.googleapis.com/auth/calendar'],
      });

      if (result.type === 'success') {
        global.signedIn = true;
        global.accessToken = result.accessToken;
        global.name = result.user.name;
        global.photoUrl = result.user.photoUrl;
        global.email = result.user.email;
        fetch(GLOBAL.API + 'registerUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'user': {
              'email': result.user.email,
              'name': result.user.name
            }
          })
        })
          .then((response) =>
            response.json()
          )
          .then((responseJson) => {
            console.log(`user id is ${responseJson._id}`);
            global.userID = responseJson._id;
            this.props.navigation.navigate('MainScreen');
          
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      debugger
      return { error: true };
    }
  }
  componentDidMount() {
    this.signInWithGoogleAsync();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ?
          (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="rgba(238,73,167,1)" />
              <Text style={styles.header}>Loading...</Text>
            </View>
          ) : (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="rgba(238,73,167,1)" />
              <Text style={styles.header}>Waiting for Authentication with Google Account</Text>
            </View>
          )
        }
      </View>
    );
  }
}
export default LoginSplashScreen