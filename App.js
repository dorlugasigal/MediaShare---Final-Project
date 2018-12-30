import React from 'react';

import LoginSplashScreen from "./src/Screens/Login/scrLoginSplash"

import MainScreen from "./src/Screens/scrMain"
import AudioScreen from "./src/Screens/MediaUploadModules/scrAudio"
import DocumentScreen from "./src/Screens/MediaUploadModules/scrDocument"
import GalleryScreen from "./src/Screens/MediaUploadModules/scrGallery"
import PhotoScreen from "./src/Screens/MediaUploadModules/scrPhoto"

import { createDrawerNavigator, createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import AboutScreen from "./src/Screens/Menu/scrAbout"
import GroupsScreen from "./src/Screens/Menu/scrGroups"
import InviteAFriendScreen from "./src/Screens/Menu/scrInviteAFriend"
import ScheduleScreen from "./src/Screens/Menu/scrSchedule"
import Icon from "@expo/vector-icons/Ionicons"


const SideMenuDrawer = createDrawerNavigator({
  Main: MainScreen,
  'Invite A Friend Screen': InviteAFriendScreen,
  About: AboutScreen,
  Schedule: ScheduleScreen,
  Groups: GroupsScreen
},
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#2F95D6',
          borderBottomColor: '#ffffff',
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontSize: 18
        }
      }
    }
  }
);


const AppStack = createStackNavigator({
  MainScreen: SideMenuDrawer,
  PhotoScreen: PhotoScreen,
  DocumentScreen: DocumentScreen,
  AudioScreen: AudioScreen,
  GalleryScreen: GalleryScreen

},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            name="md-menu"
            size={35}
            style={{ paddingLeft: 10 }}
            color="white"
            onPress={() => navigation.openDrawer()}
          />
        )
      }
    }
  }
);



const AppContainer = createAppContainer(createSwitchNavigator(
  {
    LoginSplashScreen: LoginSplashScreen,
    MainScreen: AppStack
  },
  {
    initialRouteName: 'LoginSplashScreen',
  }
));

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    )
  }
}
