import React from 'react';
import {withNavigation } from 'react-navigation';
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Button } from 'react-native'
const GLOBAL = require('../../Globals.js');
import Icon from "@expo/vector-icons/Ionicons"


class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.name);
  };
  _onPressRemove = () => {
    this.props.onPressRemove(this.props.name);
  }
  render() {
    return (
      <View style={styles.contianer}>
        <TouchableOpacity onPress={this._onPress}>
          <Text style={styles.groupName}>{this.props.name}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._onPressRemove}>
          <Text style={styles.removeGroup}>Remove Group<Icon name="ios-trash" size={25} /></Text>
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
        'groupAdmin': global.email
      })
    })
      .then((response) =>
        response.json())
      .then((responseJson) => {
        console.log(responseJson.toString());
        this.setState({
          groups: responseJson
        })
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  removeItem(groupName) {
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
          'groupAdmin': global.email,
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
<<<<<<< HEAD
    

=======
>>>>>>> 08783cc35df9e04ca0800bca878b3f6ee12be06d
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
  _onPressItem = (name) => {
    // updater functions are preferred for transactional updates
    this.props.navigation.navigate('GroupDetailScreen', { groupName: name })
  };
  _addGroup() {
    this.props.navigation.navigate('AddGroupScreen')
  }
  _onPressRemove = (groupName) => {
    this.removeItem(groupName);
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>GroupsScreen</Text>
        <FlatList
          data={this.state.groups}
          extraData={this.state.groups}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        <Button title={'Add Group'} style={styles.bottomStyle} onPress={() => this._addGroup()}></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeGroup: {
    fontSize: 14
  },
  bottomStyle: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
})
export default withNavigation(GroupsScreen)