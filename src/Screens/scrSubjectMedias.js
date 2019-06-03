import React from 'react';
import { TouchableOpacity, ScrollView, FlatList, Image, View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons"
import Icon from "@expo/vector-icons/Ionicons"
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import { ImagePicker, DocumentPicker } from 'expo';



class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.base64, this.props.mediaUploader);
  };

  render() {
    return (
      <View style={styles.singleMediaContainer}>
        <TouchableOpacity onPress={this._onPress} >
          {/* <Text style={styles.mediaText}>{this.props.id}</Text>
            <Text style={styles.mediaText}>{this.props.type}</Text>
          <Text style={styles.mediaText}>{this.props.path}</Text> */}
          <Image style={styles.mediaPhoto}  source={{ uri: this.props.base64 }}></Image>
          {/* <View style={styles.textContainer}>
              <Text style={styles.mediaText}>{this.props.mediaUploader}</Text>
              <Text style={styles.mediaText}>{this.props.uploadDate}</Text>
            </View> */}
        </TouchableOpacity>
      </View>
    );
  }
}

class SubjectMedias extends React.Component {

  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => (
    <MyListItem
      onPressItem={this._onPressItem}
      id={item.id}
      uploadDate={item.uploadDate}
      mediaUploader={item.mediaUploader}
      type={item.type}
      path={item.path}
      base64={item.base64}
    />
  );
  _onPressItem = (path, mediaUploader) => {
    this.props.navigation.navigate('MediaDetailsScreen', { path: path, mediaUploader: mediaUploader })
  };

  render() {
    // const window = Dimensions.get('window');
    // const { navigation } = this.props;
    // const signedIn = global.signedIn;
    // const name = global.name;
    // const photoUrl = global.photoUrl;
    // const accessToken = global.accessToken;

    return (

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {global.selectedSubject}
        </Text>

        <View style={styles.mediasContainer}>
          <FlatList
            data={global.selectedSubjectMedia}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            numColumns={3}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#338EFF',
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  mediasContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
    backgroundColor: '#d9e6fc',
  },
  singleMediaContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    width: 100,
    height: 100,
    margin:10,
  },
  textContainer: {
    flexDirection: 'column',
  },
  mediaText: {
    color: '#7695c9',
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  mediaPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  }
});

export default SubjectMedias;