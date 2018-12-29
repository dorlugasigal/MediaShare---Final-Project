import React from 'react';
import DetailsScreen from "./src/Screens/scrDetails";
import PhotoScreen from "./src/Screens/scrPhoto"
import DocumentScreen from "./src/Screens/scrDocument"
import AudioScreen from "./src/Screens/scrAudio"
import ScheduleScreen from "./src/Screens/scrSchedule"
import FilesScreen from "./src/Screens/scrUploadedFiles"
import SettingsScreen from "./src/Screens/scrSettings"
import GalleryScreen from "./src/Screens/scrGallery"
import LoginSplashScreen from "./src/Screens/scrLoginSplash"
import MenuScreen from "./src/Screens/scrMenu"
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';



const AuthStack = createStackNavigator({
  LoginSplashScreen: LoginSplashScreen 
});
const AppStack = createStackNavigator({ 
  MenuScreen:MenuScreen,
  DetailsScreen: DetailsScreen,
  PhotoScreen: PhotoScreen,
  DocumentScreen: DocumentScreen,
  AudioScreen: AudioScreen,
  ScheduleScreen: ScheduleScreen,
  SettingsScreen: SettingsScreen,
  FilesScreen: FilesScreen,
  GalleryScreen: GalleryScreen
   },{headerMode: 'none'});


const Root= createAppContainer(createSwitchNavigator(
  {
    AuthStack:AuthStack,
    AppStack:AppStack
  },
  {
    initialRouteName: 'AuthStack',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
));

export default class App extends React.Component {
  render() {
    return (
      <Root/>  
    )
  }
}
