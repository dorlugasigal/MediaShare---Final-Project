import React from 'react';
import { TouchableOpacity, ScrollView, FlatList, Image, View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons"
import Icon from "@expo/vector-icons/Ionicons"
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import { ImagePicker, DocumentPicker } from 'expo';
const GLOBAL = require('../Globals.js');
import UserSchedule from "./util/UserSchedule"

class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  _onPress = () => {
    global.selectedSubjectMedia = this.props.media;
    global.selectedSubject = this.props.name;
    global.selectedSubjectCreator = this.props.subjectCreator;
    global.selectedSubjectID = this.props.id;
    global.selectedSubjectGroups = global.subjects.filter(
      x => x._id === global.selectedSubjectID)[0].groups;
    this.props.onPressItem();
  };

  render() {
    return (
      <View >
        <TouchableOpacity onPress={this._onPress} >
          <View style={styles.subjectContainer}>
            <Text style={{ color: '#7695c9', paddingLeft: 10, fontWeight: 'bold', fontSize: 20, }}>{this.props.name}</Text>
            <Text style={{ color: '#7695c9', paddingLeft: 10, fontWeight: 'bold', fontSize: 20, }}>Items: {this.props.amount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


class MainScreen extends React.Component {
  state = {
    slideUpPanelvisible: false,
    subjects: [],
    refreshing: false,
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  componentDidMount() {
    let x = new UserSchedule();
    x.getCurrentTimeSubject();
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      global.subjects = [];
      global.refreshSubjects = false;
      this.getSubjects();
    });
    this.setState({ subjects: global.subjects });

  }
  _handleRefresh = () => {
    this.setState({
      refreshing: true
    },
      () => {
        this.getSubjects();
      })
  }
  getSubjects = () => {
    fetch(GLOBAL.API + 'GetUserSubjects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'userID': global.userID,
        'email': global.email
      })
    })
      .then((response) =>
        response.json())
      .then((responseJson) => {
        var x = Object.assign([], responseJson);
        this.setState({ subjects: responseJson, refreshing: false });

        global.subjects = responseJson;
        global.refreshSubjects = true;
      })
      .catch((error) => {
        this.setState({ refreshing: false })
        console.error(error);
      });
  }
  _pickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(global.SubjectID)
    this.setState({
      data: {
        mediaUploader: { email: global.email, userID: global.userID },
        type: "image",
        subject: global.SubjectID,
        path: photo.uri,
        base64: `data:image/jpg;base64,${photo.base64}`
      }
    })
    if (!photo.cancelled) {
      this.setState({ image: photo.uri });
      fetch(GLOBAL.API + 'AddMedia', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.data)
      })
        .then((response) =>
          response.json())
        .then((responseJson) => {
          console.log("upload success");
          alert("Uploaded Successfully!")
          this._handleRefresh()
        })
        .catch(error => {
          console.log("upload error", JSON.stringify(error));
          alert("Upload failed!");
        });
    }


  };

  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      this.setState({ document: result.uri });

      fetch(GLOBAL.API + 'AddMedia', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          "mediaUploader": global.email,
          "type": "document",
          "path": result.uri,
          "subjectID": "d4ea2c266249346fb1e706d7"
        })
      })
        .then((response) =>
          response.json())
        .then((responseJson) => {
          this.setState({
            subjects: responseJson
          })
          global.subjects = responseJson;
          global.refreshSubjects = true;
          console.log("upload success");
          alert("Uploaded Successfully!");

        })
        .catch(error => {
          console.log("upload error", JSON.stringify(error));
          alert("Upload failed!");
        });
    }
  };

  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (

    <MyListItem
      onPressItem={this._onPressItem}
      id={item._id}
      name={item.name}
      subjectCreator={item.subjectCreator}
      media={item.media}
      amount={item.media.length}
    />
  );
  _onPressItem = () => {
    this.props.navigation.navigate('SubjectMedias');
  };

  render() {
    const window = Dimensions.get('window');
    const { navigation } = this.props;
    const signedIn = global.signedIn;
    const name = global.name;
    const photoUrl = global.photoUrl;
    const accessToken = global.accessToken;

    return (

      <View style={{
        flex: 1, flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <View style={{ height: '6%' }}>
          <Text style={{ color: '#338EFF', marginTop: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Your Items</Text>
        </View>
        <ScrollView styles={{ height: '80%' }} >
          <FlatList
            data={this.state.subjects}
            extraData={this.state.subjects}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshing={this.state.refreshing}
            onRefresh={this._handleRefresh}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => this.props.navigation.navigate('PhotoScreen')}
          >
            <Icon name={"md-camera"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._pickDocument()}
            style={styles.roundButton}
          >
            <Icon name={"md-document"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => this.props.navigation.navigate('AudioScreen')}
          >
            <Icon name={"md-mic"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => this._pickImage()}
          >
            <Icon name={"md-images"} size={30} color="white" />
          </TouchableOpacity>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {

    height: '18%',
    padding: 0,
    backgroundColor: '#cedbed',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#7387a3',
  }
  ,
  roundButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#79a6d2',
    borderRadius: 50,
  },
  subjectContainer: {
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: 15,
    padding: 10,
    paddingLeft: 20,
    //marginLeft: 15,
    marginTop: 15,
    //width: '90%',
    alignItems: 'flex-start',
    backgroundColor: '#d9e6fc'
  },
  rowmenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  addButton: {
    height: '10%',
    alignItems: 'flex-end',
  },
  panelrowmenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '40%',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '80%',
  },
  panelbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  panelcontainer: {
    height: '30%',
    backgroundColor: "#fff",
    borderWidth: 2,
  },
  header: {
    fontSize: 13
  },
  image: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }

});

export default MainScreen;