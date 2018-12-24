import React from 'react';
import {Button, View, Text, TouchableHighlight,StyleSheet } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import Icon from 'react-native-vector-icons/FontAwesome';


class MenuScreen extends React.Component {


  render() {
   
  
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Menu</Text>

        <Button
          title="Audio"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Gallery"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Schedule"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Settings"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Documents"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}


class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Menu: MenuScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Menu',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
