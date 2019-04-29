import React from 'react';
import { View, Text,FlatList,TouchableOpacity } from 'react-native'
const GLOBAL = require('../../Globals.js');



class MyListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    _onPress = () => {
        this.props.onPressItem(this.props.email);
    };
    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text style={{ color: 'red' }}>{this.props.email}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

class GroupDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { group: [], members: [] }
    }
    _keyExtractor = (item, index) => item.email;
    _renderItem = ({ item }) => (
        <MyListItem
            onPressItem={this._onPressItem}
            email={item.email}
        />
    );
    _onPressItem = (name) => {
        // updater functions are preferred for transactional updates
        //this.props.navigation.navigate('GroupDetailScreen', { groupName: name });
    };
    getGroupDetails() {
        const { navigation } = this.props;
        const groupName = navigation.getParam('groupName', 'NO-ID');
        console.log(`asking for api/getGroupDetails for ${global.email}`);
        return fetch(GLOBAL.API + 'getGroupDetails', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'group': {
                    'groupAdmin': global.email,
                    'groupName': groupName
                }
            })
        })
            .then((response) =>
                response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson));
                this.setState({
                    group: responseJson,
                    members: responseJson.members
                })
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    componentDidMount() {
        this.getGroupDetails();
    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Group Members</Text>
                <FlatList
                    data={this.state.members}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}
export default GroupDetailScreen