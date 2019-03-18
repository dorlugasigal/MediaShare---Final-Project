import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, CameraRoll } from 'react-native';
import { Camera, Permissions } from 'expo';
import Icon from "@expo/vector-icons/Ionicons"
export default class CameraScreen extends React.Component {
  //type- back/front camera
  //flashmode: flash on/off
  //imageuri: uri of captured image
  //show last photo: bool to show last photo
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    AutoFocus: Camera.Constants.AutoFocus.on,
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
          /> :
          <Image
            source={{ uri: this.state.imageUri }}
            style={styles.lastPhoto}
          />
        }
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.setState({ showLastPhoto: false })}>
          <Icon name="md-reverse-camera" size={40} color="white" />
        </TouchableOpacity>
      </View>
    )
  }
  _takePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      let savePhoto = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
      this.setState({ imageUri: savePhoto })
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