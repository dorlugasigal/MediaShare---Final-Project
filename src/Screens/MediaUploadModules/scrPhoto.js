import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import Icon from "@expo/vector-icons/Ionicons"


export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }}
            style={{ flex: 1 }}
            type={this.state.type}
            flashMode={this.state.flashMode}>
          </Camera>
          <View
            style={{
              backgroundColor: 'black',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
                });
                console.log('flash')
              }}>
              <Icon name="ios-reverse-camera" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={() => {
                this.setState({
                  flashMode: this.state.flashMode === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off,
                });
                console.log('flash')
              }}>          
              <Icon name="ios-flash-off" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={this._takePhoto.bind(this)}>
              <Icon name="ios-camera" size={40} color="white"/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
  _takePhoto = async () => {
    if (this.camera) {
      console.log('im here')
      let photo = await this.camera.takePictureAsync({quality:1});
      console.log(photo);
    }
  }
}

const styles=StyleSheet.create({
  touchableOpacity:{
    flex: 0.2,
    alignItems: 'center',
    borderWidth: 1,
  },
});