import React from 'react';

import LoginSplashScreen from "./src/Screens/Login/scrLoginSplash"

import MainScreen from "./src/Screens/scrMain"
import AudioScreen from "./src/Screens/MediaUploadModules/scrAudio"
import DocumentScreen from "./src/Screens/MediaUploadModules/scrDocument"
import GalleryScreen from "./src/Screens/MediaUploadModules/scrGallery"
import PhotoScreen from "./src/Screens/MediaUploadModules/scrPhoto"

import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

// const AppStack = createStackNavigator({
//   MainScreen: MainScreen,
//   PhotoScreen: PhotoScreen,
//   DocumentScreen: DocumentScreen,
//   AudioScreen: AudioScreen,
//   GalleryScreen: GalleryScreen

// },
//   { headerMode: 'none' }
// );

import { createDrawerNavigator   } from 'react-navigation';

import AboutScreen from "./Menu/scrAbout"
import GroupsScreen from "./Menu/scrGroups"
import InviteAFriendScreen from ".//Menu/scrInviteAFriend"
import ScheduleScreen from "./Menu/scrSchedule"

const SideMenuDrawer = createDrawerNavigator({
  InviteAFriendScreen: InviteAFriendScreen,
  AboutScreen: AboutScreen,
  ScheduleScreen: ScheduleScreen,
  GroupsScreen: GroupsScreen
});

const Root = createAppContainer(createSwitchNavigator(
  {
    LoginSplashScreen: LoginSplashScreen,
    MainScreen: MainScreen
  },
  {
    initialRouteName: 'LoginSplashScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
));

export default class App extends React.Component {
  render() {
    return (
      <Root />
    )
  }
}
