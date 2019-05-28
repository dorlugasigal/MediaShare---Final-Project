import React from 'react';
import Icon from "@expo/vector-icons/Ionicons"
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Button } from 'react-native'
import { Dimensions } from "react-native";

const GLOBAL = require('../../Globals.js');


var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class MyListItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    _onPress = () => {
        this.props.onPressItem(this.props.email);
    };
    _onPressRemove= () =>{
        this.props.onPressRemove(this.props.email);
    }
    render() {
        return (
            <View style={styles.contianer}>
                <TouchableOpacity onPress={this._onPress} style={styles.memberEmail} >
                    <Text style={{ marginTop: 12, marginLeft: 15, fontWeight: 'bold', color: '#fff', fontSize: 20, }}>{this.props.email}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this._onPressRemove} style={styles.removeMember} >
                    <Icon style={{ marginTop: 13, marginLeft: 22, color: '#ccebff' }} name="ios-trash" size={30} />
                </TouchableOpacity>
            </View>

        );
    }
}

class GroupDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { group: [], members: [] }
    }
    _keyExtractor = (item, index) => item;
    _renderItem = ({ item }) => (
        <MyListItem
            onPressItem={this._onPressItem}
            onPressRemove={this._onPressRemove}
            email={item}
        />
    );
    _onPressItem = (name) => {
       alert(name);
    };
    _onPressRemove = (email)=>{
        const { navigation } = this.props;
        const groupID = navigation.getParam('groupID', 'NO-ID');
        console.log(`asking for api/deleteMemberFromGroup for ${global.email}`);
        return fetch(GLOBAL.API + 'deleteMemberFromGroup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'group': {
                    'groupID': groupID,
                    'groupAdmin': global.userID,
                },
                'email' : email
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
    };   
    _addGroupMember() {
        const groupName = this.props.navigation.getParam('groupName', 'NO-ID');
        const groupID = this.props.navigation.getParam('groupID', 'NO-ID');
        this.props.navigation.navigate('AddMemberScreen', { groupName: groupName, groupID: groupID });
    }

    getGroupDetails() {
        const { navigation } = this.props;
        const groupName = navigation.getParam('groupName', 'NO-ID');
        const groupID = navigation.getParam('groupID', 'NO-ID');
        console.log(`asking for api/getGroupDetails for ${global.email}`);
        return fetch(GLOBAL.API + 'getGroupDetails', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'group': {
                    'groupID': groupID,
                    'groupAdmin': global.userID
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
        this.focusListener = this.props.navigation.addListener("didFocus", () => {
            this.getGroupDetails();
        });
        this.getGroupDetails();
    }

    render() {

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{this.groupName} Members</Text>
                <FlatList
                    data={this.state.members}
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
                    onPress={() => this._addGroupMember()}
                >
                    <Icon name={"ios-add"} size={30} color="#ccebff" />
                </TouchableOpacity>
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
    memberEmail: {
        flex: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    removeMember: {
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
export default GroupDetailScreen