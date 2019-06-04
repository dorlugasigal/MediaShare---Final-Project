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
    this.props.onPressItem(this.props.name, this.props.id);
  };
  _onPressRemove = () => {
    this.props.onPressRemove(this.props.id);
  }
  _onPressAdd = () => {
    this.props.onPressAdd(this.props.id);
  }

  render() {
    return (
      <View style={styles.contianer}>
        <TouchableOpacity onPress={this._onPress} style={styles.groupName} >
          <Text style={{ marginTop: 12, marginLeft: 15, fontWeight: 'bold', color: '#fff', fontSize: 20, }}>{this.props.name}</Text>
        </TouchableOpacity>
        {this.props.exists
          ? <TouchableOpacity onPress={() => { this._onPressRemove() }} style={styles.removeGroup} >
            <Icon style={{ marginTop: 11, marginLeft: 22, color: '#f99f9f' }} name="ios-remove" size={30} />
          </TouchableOpacity>
          : <TouchableOpacity onPress={() => { this._onPressAdd() }} style={styles.addGroup} >
            <Icon style={{ marginTop: 11, marginLeft: 22, color: '#9ff9c2' }} name="ios-add" size={30} />
          </TouchableOpacity>
        }
      </View>
    );
  }
}
class SubjectGroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [] }
  }

  getGroups() {
    console.log(`asking for api/GetGroups for ${global.email} - ${global.userID}`);
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

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getGroups();
    });
  }
  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (
    <MyListItem
      onPressItem={this._onPressItem}
      onPressRemove={this._onPressRemove}
      onPressAdd={this._onPressAdd}
      id={item._id}
      exists={this.checkExistance(item)}
      admin={item.groupAdmin}
      name={item.groupName}
    />
  );
  checkExistance = (item) => {
    var x = global.selectedSubjectGroups.filter(
      yy => yy._id == item._id);

    if (x.length > 0) {
      return (this.state.groups.filter(t => t._id == x[0]._id).length > 0);
    } else {
      return false;
    }
  }
  _onPressItem = (name, id) => {
    // updater functions are preferred for transactional updates
    this.props.navigation.navigate('GroupDetailScreen', { groupName: name, groupID: id })
  };

  _onPressAdd = (id) => {
    console.log(global.selectedSubjectID);
    console.log(id);
    return fetch(GLOBAL.API + 'AddGroupToSubject', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'subjectID': global.selectedSubjectID,
        'groupID': id,
      })
    })
      .then((response) =>
        this.props.navigation.navigate("MainScreen"))
      .catch((error) => {
        console.error(error);
      })
  };
  _onPressRemove = (id) => {
    return fetch(GLOBAL.API + 'RemoveGroupFromSubject', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'subjectID': global.selectedSubjectID,
        'groupID': id,
      })
    })
      .then((response) =>
        this.props.navigation.navigate("MainScreen"))
      .catch((error) => {
        console.error(error);
      })
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={this.state.groups}
          extraData={this.state.groups}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
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
    backgroundColor: '#f46d6b',
    height: 50,
    width: 50,
    color: '#005dff'
  },
  addGroup: {
    flex: 1,
    backgroundColor: '#49d17d',
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
export default withNavigation(SubjectGroupsScreen)