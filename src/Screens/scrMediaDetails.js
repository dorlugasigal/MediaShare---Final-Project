import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'

class MediaDetailsScreen extends React.Component {

    render() {
        const { navigation } = this.props;
        let path = navigation.getParam('path');
        let mediaUploader = navigation.getParam('mediaUploader');
        return (
            <View style={styles.container}>
                <Image style={styles.mediaPhoto} source={{ uri: path }}></Image>
                <Text style={styles.mediaText}>{mediaUploader}</Text>
                {/* <Text style={styles.mediaText}>{this.props.uploadDate}</Text> */}
            </View>
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
        marginTop: 20,
        height: '50%',
        width: '90%',
        resizeMode: 'stretch'

    },

    mediaText: {
        fontSize: 20,
        color: "#ffffff"
    }
})