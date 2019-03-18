import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet,Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import Icon from "@expo/vector-icons/Ionicons"
export default class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    AutoFocus: Camera.Constants.AutoFocus.on,
    image: null,
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
          this.rendercamera()
      );
    }
  }
  rendercamera(){
    return(
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
                console.log(`Camera.Constants.Type: ${this.state.type}`)
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
                console.log(`this.state.flashMode: ${this.state.flashMode}`)
              }}>   
              {this.state.flashMode === Camera.Constants.FlashMode.off
              ?<Icon name="ios-flash-off" size={40} color="white"/>
              :<Icon name="ios-flash" size={40} color="white"/>}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={this._takePhoto.bind(this)}>
              <Icon name="ios-camera" size={40} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity 
            style={{marginLeft:'30%'}}>
                   
            {this.state.image==null?
            <Image
              source={require('../../../assets/side-background.png')}
              style={{width:75,height:75,borderWidth:1, borderColor:'white'}}
            />:
            <Image
              source={{uri: this.state.image.uri}}
              style={{width:75,height:75,borderWidth:1, borderColor:'white'}}
              />
            }
            </TouchableOpacity>
            </View>
            </View>
    )
  }
  _takePhoto = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({quality:1});
      this.setState({image:photo})
    }

  }
}

const styles=StyleSheet.create({
  touchableOpacity:{
    flex: 0.2,
    alignItems: 'center',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  }
});