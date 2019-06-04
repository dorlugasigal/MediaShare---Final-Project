import React from 'react';
import {
  TouchableOpacity, ScrollView, FlatList, Image, View, Text, StyleSheet, Button, Alert
} from 'react-native';
const GLOBAL = require('../Globals.js');

// import Icon from "react-native-vector-icons/MaterialIcons"
import Icon from "@expo/vector-icons/Ionicons"




class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.base64, this.props.mediaUploader, this.props.uploadDate, this.props.id);
  };

  render() {
    return (
      <View style={styles.singleMediaContainer}>
        <TouchableOpacity onPress={this._onPress} >
          <Image style={styles.mediaPhoto} source={{ uri: this.props.base64 }}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

class SubjectMedias extends React.Component {
  constructor(props) {
    super(props);
  }
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
  _onPressItem = (base64, mediaUploader, uploadDate, id) => {
    this.props.navigation.navigate('MediaDetailsScreen', { base64: base64, mediaUploader: mediaUploader, uploadDate: uploadDate, id: id })
  };
  ManageGroups() {
    this.props.navigation.navigate("SubjectGroupsScreen");
  }
  deleteSubjectMessage() {
    Alert.alert(
      'Delete Subject',
      `Are you sure you want to delete subject ${global.selectedSubject}?`,
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes', onPress: () => {
            fetch(GLOBAL.API + 'DeleteSubject', {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                'subjectCreator': global.selectedSubjectCreator,
                'subjectID': global.selectedSubjectID
              })
            }).then((response) =>
              this.props.navigation.pop()
            ).catch((error) => {
              console.error(error);
            });
          }
        },
      ],
      { cancelable: false },
    );
  }


  render() {
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
        <View style={styles.buttonContainer}>
          <View style={styles.deleteButton}>
            <Button color={"#ff4f4f"} title="Delete Subject" onPress={() => { this.deleteSubjectMessage() }}></Button>
          </View>
          <View style={styles.manageGroupsButton}>
            <Button color={"#72adff"} title="Manage Groups" onPress={() => { this.ManageGroups() }}></Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deleteButton: {
    flex:1,
    margin: 5,
    marginTop:0,
  },
  manageGroupsButton: {
    flex:1,
    margin: 5,
    marginTop:0,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#d9e6fc"
  },
  title: {
    flex: 1,
    color: '#338EFF',
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  mediasContainer: {
    flex: 10,
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
    backgroundColor: '#d9e6fc',
  },
  singleMediaContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    width: 110,
    height: 110,
    margin: 6,
    flexWrap: 'wrap',

  },
  mediaPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
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
});

export default SubjectMedias;