import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Button } from 'react-native'
const GLOBAL = require('../../Globals.js');
import Icon from "@expo/vector-icons/Ionicons"
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.name , this.props.id);
  };
  _onPressRemove = () => {
    this.props.onPressRemove(this.props.name, this.props.id);
  }
  render() {
    return (
      <View style={styles.contianer}>
        <TouchableOpacity onPress={this._onPress} style={styles.groupName} >
          <Text style={{ marginTop: 12, marginLeft: 15, fontWeight: 'bold', color: '#fff', fontSize: 20, }}>{this.props.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._onPressRemove} style={styles.removeGroup} >
          <Icon style={{ marginTop: 13, marginLeft: 22, color: '#ccebff' }} name="ios-trash" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}
class GroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], newGroup: '' }
  }

  getGroups() {
    console.log(`asking for api/GetGroups for ${global.email}`);
    return fetch(GLOBAL.API + 'getGroups', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'groupAdmin': global.userID
      })
    })
      .then((response) =>
        response.json())
      .then((responseJson) => {
        this.setState({
          groups: responseJson
        })
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  removeItem(groupName,id) {
    console.log(`asking for api/deleteGroup for ${global.email} group:${groupName}`);
    return fetch(GLOBAL.API + 'deleteGroup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'group': {
          'groupName': groupName,
          'groupAdmin': global.userID,
        }
      })
    })
      .then((response) =>
        response.json())
      .then((responseJson) => {
        this.setState({
          groups: responseJson
        })
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  componentDidMount() {

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getGroups();
    });


    this.getGroups();
  }
  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (
    <MyListItem
      onPressItem={this._onPressItem}
      onPressRemove={this._onPressRemove}
      id={item._id}
      admin={item.groupAdmin}
      name={item.groupName}
    />
  );
  _onPressItem = (name,id) => {
    // updater functions are preferred for transactional updates
    this.props.navigation.navigate('GroupDetailScreen', { groupName: name , groupID: id })
  };
  _addGroup() {
    this.props.navigation.navigate('AddGroupScreen')
  }
  _onPressRemove = (groupName,id) => {
    this.removeItem(groupName,id);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={this.state.groups}
          extraData={this.state.groups}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 70,
            height: 70,
            marginBottom: 10,
            backgroundColor: '#fff',
            borderRadius: 50,
          }}
          onPress={() => this._addGroup()}
        >
          <Icon name={"ios-add"} size={30} color="#ccebff" />
        </TouchableOpacity>
        {/* <Button title={'Add Group'} style={styles.bottomStyle} ></Button> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contianer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    width: width - 30,
    backgroundColor: '#CCC',
    flex: 1,
  },
  groupName: {
    flex: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeGroup: {
    flex: 1,
    backgroundColor: '#8cb3d9',
    height: 50,
    width: 50,
    color: '#005dff'
  },
  bottomStyle: {
    bottom: 0,
    position: 'absolute',

    width: '100%',
    alignItems: 'center',
  },
})
export default withNavigation(GroupsScreen)