import React from 'react';
import { View, Text } from 'react-native'

class FilesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Uploaded Files</Text>
      </View>
    );
  }
}
export default FilesScreen