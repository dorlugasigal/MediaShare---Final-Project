import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import MenuScreen from "./src/screens/menu/menu";
import DetailsScreen from "./src/screens/details/details";
import UploadPhoto from "./src/screens/uploadPhoto/uploadPhoto"
import DocumentUpload from "./src/screens/documentupload/documentUpload"
import AudioUpload from "./src/screens/uploadAudio/uploadAudio"
import Schedule from "./src/screens/schedule/schedule"
import UploadedFiles from "./src/screens/uploadedFiles/uploadedFiles"
import Settings from "./src/screens/settings/settings"
import Gallery from "./src/screens/gallery/gallery"
import SignIn from "./src/screens/signIn/signIn"
const RootStack = createStackNavigator(
  {
    Menu: MenuScreen,
    Details: DetailsScreen,
    PhotoUp: UploadPhoto,
    DocumentUp: DocumentUpload,
    AudioUp: AudioUpload,
    schedule: Schedule,
    uploadedF: UploadedFiles,
    settings: Settings,
    galleryscreen :Gallery,
    signIn: SignIn
  },
  {
    initialRouteName: 'signIn',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
