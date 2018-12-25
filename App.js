import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import MenuScreen from "./src/screens/menu/menu";
import DetailsScreen from "./src/screens/details/details";
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
