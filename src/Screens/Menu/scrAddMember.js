import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
const GLOBAL = require('../../Globals.js');


class AddMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupMemberName: '',
        }
    }
    handleGroupMemberName = (text) => {
        this.setState({ groupMemberName: text })
    }
    AddGroupMemberToDB = (groupName) => {
        console.log(`add group api/addGroup for ${global.email} group name:${groupName}`);
        fetch(GLOBAL.API + 'addMemberToGroup', {
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
                this.props.navigation.pop();
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    AddNewGroupMember = () => {
        if (!this.state.groupMemberName) {
            alert("You must enter a Group Name ");
            return;
        }
        else {
            this.AddGroupMemberToDB(this.state.groupMemberName);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Group Member Name"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleGroupMemberName}
                />
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