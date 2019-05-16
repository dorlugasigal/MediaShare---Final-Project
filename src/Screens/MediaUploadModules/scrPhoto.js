import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, CameraRoll, Platform, Dimensions } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';
import Icon from "@expo/vector-icons/Ionicons"
const GLOBAL = require('../../Globals.js');
var { height, width } = Dimensions.get('window');
export default class CameraScreen extends React.Component {
  //type- back/front camera
  //flashmode: flash on/off
  //imageuri: uri of captured image
  //show last photo: bool to show last photo
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    AutoFocus: Camera.Constants.AutoFocus.off,
    imageUri: null,
    showLastPhoto: false,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        this.state.showLastPhoto == false ?
          this.rendercamera() :
          this.renderLastPhoto()
      );
    }
  }
  rendercamera() {
    return (
      <View style={styles.container}>
        <Camera ref={ref => { this.camera = ref; }}
          style={styles.container}
          type={this.state.type}
          flashMode={this.state.flashMode}>
        </Camera>
        <View
          style={styles.cameraIcons}>
          <TouchableOpacity
            style={[styles.touchableOpacity, { left: '10%' }]}
            onPress={() => {
              this.setState({
                type: this.state.type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              });
              console.log(`Camera.Constants.Type: ${this.state.type}`)
            }}>
            <Icon name="ios-reverse-camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableOpacity, { right: '20%' }]}
            onPress={() => {
              this.setState({
                flashMode: this.state.flashMode === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off,
              });
              console.log(`this.state.flashMode: ${this.state.flashMode}`)
            }}>
            {this.state.flashMode === Camera.Constants.FlashMode.off
              ? <Icon name="ios-flash-off" size={40} color="white" />
              : <Icon name="ios-flash" size={40} color="white" />}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchableOpacity, { right: '45%' }]}
            onPress={this._takePhoto.bind(this)}>
            <Icon name="ios-camera" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ showLastPhoto: true })}>
            {this.state.imageUri == null ?
              <Image
                source={require('../../../assets/No-Photo-Available.png')}
                style={{ width: 75, height: 75 }}
              /> :
              <Image
                source={{ uri: this.state.imageUri }}
                style={{ width: 75, height: 75 }}
              />
            }
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  renderLastPhoto() {
    return (
      <View style={styles.container}>
        {this.state.imageUri == null ?
          <Image
            source={require('../../../assets/No-Photo-Available.png')}
            style={styles.lastPhoto}
            resizeMethod='resize'
          /> :
          <Image
            source={{ uri: this.state.imageUri }}
            style={styles.lastPhoto}
            resizeMethod='resize'
          />
        }
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.setState({ showLastPhoto: false })}>
          <Icon name="md-reverse-camera" size={40} color="white" />
        </TouchableOpacity>
      </View>
    )
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    //data.append("name", "avatar");
    data.append("fileData", {
      name: 'avatar',
      type: 'image/jpg',
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
    return data;
  };
  handleUploadPhoto() {
    fetch(GLOBAL.API + 'AddPhoto', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',  // It can be used to overcome cors errors
        'Content-Type': 'multipart/form-data',
      },
      body: this.state.data
    })
      .then(response => {
        response.json();
      })
      .then(response => {
        console.log("upload success", response);
        this.props.navigation.goBack();
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log("upload error", JSON.stringify(error));
        alert("Upload failed!");
      });
  };
  _takePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ quality: 1 });
      let manipResult = null;
      if (Platform.OS == 'ios') {
        manipResult = await ImageManipulator.manipulateAsync(
          photo.uri,
          [],
          { format: 'jpg' }
        );
      }
      let savePhoto = Platform.OS == 'ios' ? await CameraRoll.saveToCameraRoll(manipResult.uri, 'photo') : await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
      this.setState({
        imageUri: savePhoto,
        data: this.createFormData(photo, { userId: "123" })
      })
      setTimeout(() => { this.handleUploadPhoto() }, 500);
    }
  }
}


const styles = StyleSheet.create({
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcons: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastPhoto: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});