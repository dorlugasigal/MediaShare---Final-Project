import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
const GLOBAL = require('../Globals.js');
import Icon from "@expo/vector-icons/Ionicons"

class MediaDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploderName: '',
        }
    }
    componentDidMount() {
        this.getUploaderName()

    }
    getUploaderName() {
        const { navigation } = this.props;
        let mediaUploader = navigation.getParam('mediaUploader');

        fetch(GLOBAL.API + 'GetUserName', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': mediaUploader
            })
        }).then((response) =>
            response.json()
        ).then((responseJson) => {
            this.setState({
                uploderName: responseJson.name
            })
        }).catch((error) => {
            console.error(error);
        });

    }
    deleteMediaFromSubject() {
        const { navigation } = this.props;
        let mediaUploader = navigation.getParam('mediaUploader');
        let id = navigation.getParam('id');

        console.log(global.selectedSubjectID)
        fetch(GLOBAL.API + 'deleteMediaFromSubject', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'subjectCreator': global.selectedSubjectCreator,
                'id': id,
                'mediaUploader': mediaUploader,
                'subjectID': global.selectedSubjectID
            })
        }).then((response) =>
            this.props.navigation.navigate('MainScreen')
        ).catch ((error) => {
            console.error(error);
        });

    }
    render() {
        const { navigation } = this.props;
        let base64 = navigation.getParam('base64');
        let uploadDate = navigation.getParam('uploadDate')
        return (
            <View style={styles.container}>
                <Image style={styles.mediaPhoto} source={{ uri: base64 }}></Image>
                <View style={styles.horizontalLine} />
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.mediaTextContext}>
                            Created By:
                    </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.mediaText}>
                            {this.state.uploderName}
                        </Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.mediaTextContext}>
                            Created On:
                    </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.mediaText}>
                            {uploadDate}
                        </Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.mediaTextContext}>
                            Subject:
                    </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.mediaText}>
                            {global.selectedSubject}
                        </Text>
                    </View>
                </View>
                <View style={styles.horizontalLine} />
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 60,
                        height: 60,
                        margin: 10,
                        backgroundColor: '#37404f',
                        borderRadius: 50,
                    }}
                    onPress={() => this.deleteMediaFromSubject()}
                >
                    <Icon name={"ios-trash"} size={30} color="#6b96ea" />
                </TouchableOpacity>
            </View >
        );
    }
}
export default MediaDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222'
    },
    mediaPhoto: {
        margin: 20,
        height: '50%',
        width: '90%',
        resizeMode: 'stretch',
    },

    mediaText: {
        margin: 10,
        fontSize: 15,
        color: "#ffffff"
    },
    mediaTextContext: {
        margin: 10,
        fontSize: 15,
        color: "#aaaaaa"
    },

    horizontalLine: {
        marginTop: 10,
        borderBottomColor: '#444444',
        borderBottomWidth: 1,
        width: '100%'
    }
})