import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
const GLOBAL = require('../../Globals.js');

class AddGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            groups: [],
        }
    }

    handleGroupName = (text) => {
        this.setState({ groupName: text })
    }

    AddGroupToDB = (groupName) => {
        console.log(`add group api/addGroup for id: ${global.userID} : ${global.email}  group name:${groupName}`);
        fetch(GLOBAL.API + 'addGroup', {
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
                //console.log(JSON.stringify(responseJson));
               // console.log(JSON.stringify(this.state));
               this.props.navigation.pop();
                // this.props.navigation.navigate('Groups', { newGroup: responseJson });
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    AddNewGroup = () => {
        if (!this.state.groupName) {
            alert("You must enter a Group Name ");
            return;
        }
        else {
            // let reg = /([a-z]*[A-Z]+[0-9]*.{3,21})/;
            // if (!this.state.groupName.match(reg)) {
            //     alert("Your group name is invalid\nThe name must be with 1 Upper letter and 4-20 charaters");
            //     return;
            // }
            // else {
            this.AddGroupToDB(this.state.groupName);
            
            // }
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Group Name"
                    placeholderTextColor="#2F95D6"
                    autoCapitalize="none"
                    onChangeText={this.handleGroupName}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={
                        () => this.AddNewGroup()
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
        borderColor: '#2F95D6',
        borderWidth: 1,
        borderRadius: 25,
        backgroundColor: '#f4f8ff',
    },
    submitButton: {
        backgroundColor: '#2F95D6',
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

export default AddGroup