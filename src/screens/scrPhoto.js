import React from 'react';
import { View, Text } from 'react-native'

class PhotoScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Upload Photo</Text>
      </View>
    );
  }
}
export default PhotoScreen