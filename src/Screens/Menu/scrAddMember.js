import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
const GLOBAL = require('../../Globals.js');


class AddMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupMemberEmail: '',
        }
    }
    handleGroupMemberEmail = (text) => {
        this.setState({ groupMemberEmail: text })
    }
    AddGroupMemberToDB = (email) => {
        const groupName = this.props.navigation.getParam('groupName', 'NO-ID');
        const groupID = this.props.navigation.getParam('groupID', 'NO-ID');
        console.log(`add member api/addmember for ${global.email} group name:${groupName}`);
        fetch(GLOBAL.API + 'addMemberToGroup', {
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
                'email': email
            })
        })
            .then((response) => {
                if (response.status != 200) {
                    alert("no such user with that email");
                }
                else {
                    response.json().then((responseJson) => {
                        if (responseJson) {
                            this.props.navigation.pop();
                            return responseJson;
                        }
                    }) .catch((error) => {
                        console.error(error);
                    });
                }
            })

            .catch((error) => {
                console.error(error);
            });
    }
    AddNewGroupMember = () => {
        if (!this.state.groupMemberEmail) {
            alert(` ${this.state.groupMemberEmail}    You must enter a Group Email `);
            return;
        }
        else {
            this.AddGroupMemberToDB(this.state.groupMemberEmail);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Group Member Email"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleGroupMemberEmail}
                />
                <Text>{this.state.groupMemberEmail}</Text>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.AddNewGroupMember()
                    }>
                    <Text style={styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    input: {
        margin: 15,
        paddingLeft: 10,
        height: 40,
        width: '80%',
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#f8effb',
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        width: '30%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButtonText: {
        color: 'white'
    },
})
export default AddMember