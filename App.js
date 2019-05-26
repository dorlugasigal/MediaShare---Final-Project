import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, StyleSheet, Button, ImageBackground } from 'react-native'
import { createDrawerNavigator, createSwitchNavigator, createStackNavigator, createAppContainer, DrawerItems } from 'react-navigation'


import LoginSplashScreen from "./src/Screens/Login/scrLoginSplash"
import MainScreen from "./src/Screens/scrMain"
import SubjectMediasScreen from "./src/Screens/scrSubjectMedias"
import AudioScreen from "./src/Screens/MediaUploadModules/Recorder"
// import DocumentScreen from "./src/Screens/MediaUploadModules/scrDocument"
// import GalleryScreen from "./src/Screens/MediaUploadModules/scrGallery"
import PhotoScreen from "./src/Screens/MediaUploadModules/scrPhoto"
import AboutScreen from "./src/Screens/Menu/scrAbout"
import GroupsScreen from "./src/Screens/Menu/scrGroups"
import InviteAFriendScreen from "./src/Screens/Menu/scrInviteAFriend"
import ScheduleScreen from "./src/Screens/Menu/scrSchedule"
import Icon from "@expo/vector-icons/Ionicons"
import GroupDetailScreen from './src/Screens/Menu/scrGroupDetails'
import AddGroupScreen from './src/Screens/Menu/scrAddGroup'
class CoolBackgroundImage extends React.Component {
  render() {

  }
}

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground
      source={require('./assets/side-background.png')}
      style={{ resizeMode: 'stretch' }}>
      <View style={{ height: 150 }}>
        <Image style={{ height: 70, width: 70, borderRadius: 60, marginTop: 15, marginLeft: 15, marginBottom: 10 }} source={{ uri: global.photoUrl }} />
        <Text style={styles.titleText} >
          {global.name}{'\n'}
        </Text>
        <Text style={styles.baseText}>
          {global.email}
        </Text>
      </View>
    </ImageBackground>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
    <View>
      <Button title="Logout" onPress={() => { props.navigation.navigate('LoginSplashScreen') }}></Button>
    </View>
  </SafeAreaView>
)

const SideMenuDrawer = createDrawerNavigator({
  Main: MainScreen,
  'Invite A Friend Screen': InviteAFriendScreen,
  About: AboutScreen,
  Schedule: ScheduleScreen,
  Groups: GroupsScreen,
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
    },
    contentComponent: CustomDrawerComponent
  },
);


const AppStack = createStackNavigator({
  MainScreen: SideMenuDrawer,
  SubjectMedias: SubjectMediasScreen,
  PhotoScreen: PhotoScreen,
  AudioScreen: AudioScreen,
  GroupDetailScreen: GroupDetailScreen,
  AddGroupScreen: AddGroupScreen,
},
  {
    headerMode: 'float',
    defaultNavigationOptions: ({ navigation }) => {
      return {

        headerLeft: (
          <View>
            {navigation.toggleDrawer ?
              (
                <Icon
                  name="md-menu"
                  size={35}
                  style={{ paddingLeft: 10 }}
                  color="white"
                  onPress={() => {
                    if (navigation.toggleDrawer) {
                      navigation.toggleDrawer();
                    }
                  }
                  }
                />
              ) : (<Icon
                name="md-arrow-round-back"
                size={35}
                style={{ paddingLeft: 10 }}
                color="white"
                onPress={() => navigation.goBack()
                }
              />)
            }
          </View>
        )
        , headerStyle: {
          backgroundColor: '#2F95D6',
        }
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


const styles = StyleSheet.create({
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    // fontFamily: 'Roboto',
    color: 'white',
    marginLeft: 15
  },
  baseText: {
    // fontFamily: 'Roboto',
    color: '#E5E8E8',
    marginLeft: 15
  }
});