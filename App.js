import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import MenuScreen from "./src/screens/scrMenu";
import DetailsScreen from "./src/screens/scrDetails";
import PhotoScreen from "./src/screens/scrPhoto"
import DocumentScreen from "./src/screens/scrDocument"
import AudioScreen from "./src/screens/scrAudio"
import ScheduleScreen from "./src/screens/scrSchedule"
import FilesScreen from "./src/screens/scrUploadedFiles"
import SettingsScreen from "./src/screens/scrSettings"
import GalleryScreen from "./src/screens/scrGallery"
import InitScreen from "./src/screens/scrInit"


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
