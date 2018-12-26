import React from 'react';
import { ActivityIndicator,View, Text } from 'react-native'
import * as Expo from 'expo';
class InitScreen extends React.Component {


  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '517235184328-tgvsi39epm24edn7rm02njmakmhcvmsq.apps.googleusercontent.com',
        iosClientId: '517235184328-6ih4iqcplt9ivbfmsqdrs8o0707hd6ml.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.props.navigation.navigate('MenuScreen');
        // return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  componentWillMount() {
    this.signInWithGoogleAsync();
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color="rgba(238,73,167,1)" />
        <Text>
          Waiting for authentication with Google Account
        </Text>
      </View>
    );
  }
}
export default InitScreen