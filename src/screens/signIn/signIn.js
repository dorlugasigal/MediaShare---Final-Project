import React from 'react';
import {View,Text,Button} from 'react-native'
import * as Expo from 'expo';
class SignIn extends React.Component {
  signInWithGoogleAsync=async()=> {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '517235184328-tgvsi39epm24edn7rm02njmakmhcvmsq.apps.googleusercontent.com',
        iosClientId: '517235184328-6ih4iqcplt9ivbfmsqdrs8o0707hd6ml.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.props.navigation.navigate('Menu');
        // return result.accessToken;
      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button 
            onPress={this.signInWithGoogleAsync.bind(this)} 
            title="Sign In With Google"
            />
          </View>
        );
  }
}
export default SignIn