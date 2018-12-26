import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import MenuScreen from "./src/Screens/scrMenu";
import DetailsScreen from "./src/Screens/scrDetails";
import PhotoScreen from "./src/Screens/scrPhoto"
import DocumentScreen from "./src/Screens/scrDocument"
import AudioScreen from "./src/Screens/scrAudio"
import ScheduleScreen from "./src/Screens/scrSchedule"
import FilesScreen from "./src/Screens/scrUploadedFiles"
import SettingsScreen from "./src/Screens/scrSettings"
import GalleryScreen from "./src/Screens/scrGallery"
import InitScreen from "./src/Screens/scrInit"


const RootStack = createStackNavigator(
  {
    MenuScreen: MenuScreen,
    DetailsScreen: DetailsScreen,
    PhotoScreen: PhotoScreen,
    DocumentScreen: DocumentScreen,
    AudioScreen: AudioScreen,
    ScheduleScreen: ScheduleScreen,
    FilesScreen: FilesScreen,
    SettingsScreen: SettingsScreen,
    GalleryScreen: GalleryScreen,
    InitScreen: InitScreen
  },
  {
    initialRouteName: 'InitScreen',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />  
    )
  }
}
