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
    this.props.onPressItem(this.props.path);
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.mediasContainer}>
            {/* <Text style={styles.mediaText}>{this.props.id}</Text>
            <Text style={styles.mediaText}>{this.props.type}</Text>
          <Text style={styles.mediaText}>{this.props.path}</Text> */}
            <Image style={styles.mediaPhoto} source={{ uri: this.props.base64 }}></Image>
            <View style={styles.textContainer}>
              <Text style={styles.mediaText}>{this.props.mediaUploader}</Text>
              <Text style={styles.mediaText}>{this.props.uploadDate}</Text>
            </View>
          </View>
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
  _onPressItem = (path) => {
    alert(`you asked for ${path}`);
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
          {global.selectedSubject}:
           </Text>
        <ScrollView>

          <FlatList
            data={global.selectedSubjectMedia}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#338EFF',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  mediasContainer: {
    flex: 1,
    flexDirection: 'row',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: 15,
    padding: 10,
    paddingLeft: 20,
    marginTop: 15,

    alignItems: 'flex-start',
    backgroundColor: '#d9e6fc'
  },
  textContainer:{
    flexDirection: 'column',

  },
  mediaText: {
    color: '#7695c9',
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  mediaPhoto: {
    flex: 1,
    width: 150,
    height: 150
  }
});

export default SubjectMedias;