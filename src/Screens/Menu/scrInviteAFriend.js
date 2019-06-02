import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
const GLOBAL = require('../../Globals.js');

class InviteAFriendScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendEmail: '',
    }
  }
  handleFriendEmail = (text) => {
    this.setState({ friendEmail: text })
  }
  SendFriendInvitation = () => {
    if (!this.state.friendEmail) {
      alert(` ${this.state.friendEmail}    You must enter a Group Email `);
      return;
    }
    else {
      this.SendMail(this.state.friendEmail);
    }
  }
  SendMail = (email) => {
    console.log(`send email api/sendemail for ${email}`);
    fetch(GLOBAL.API + 'SendEmail', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'email': email
      })
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.body}>Enjoy the App?</Text>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter Friend Email"
          placeholderTextColor="#2F95D6"
          autoCapitalize="none"
          onChangeText={this.handleFriendEmail}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={
            () => this.SendFriendInvitation()
          }>
          <Text style={styles.submitButtonText}>Invite A Friend</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default InviteAFriendScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  MainTitle: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 25,
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
  body: {
    fontSize: 18,
  },
})