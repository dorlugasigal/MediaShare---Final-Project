import React from 'react';
import { TouchableOpacity, FlatList, View, Text } from 'react-native'
const GLOBAL = require('../../Globals.js');

class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  _onPress = () => {
    this.props.onPressItem(this.props.name);
  };
  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={{ color: 'red' }}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
class GroupsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { groups: [], }
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
  componentDidMount() {
    this.getGroups();
  }
  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (
    <MyListItem
      onPressItem={this._onPressItem}
      id={item._id}
      admin={item.groupAdmin}
      name={item.groupName}
    />
  );
  _onPressItem = (name) => {
    // updater functions are preferred for transactional updates
    this.props.navigation.navigate('GroupDetailScreen', { groupName: name });
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>GroupsScreen</Text>
        <FlatList

          data={this.state.groups}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
export default GroupsScreen