import React from 'react';
import { TouchableOpacity, ScrollView, FlatList, Image, View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons"
import Icon from "@expo/vector-icons/Ionicons"
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import { ImagePicker, DocumentPicker } from 'expo';



class MyListItem extends React.PureComponent {
  constructor(props) {
    console.log("inside constructor");
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem(this.props.name);
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._onPress()}>
          <View style={styles.mediasContainer}>
            <Text style={styles.mediaText}>
              {this.props.name}</Text>
            <Text style={{
              color: '#7695c9',
              paddingLeft: 10,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
              Items: {this.props.amount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class SubjectMedias extends React.Component {

  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (
    <MyListItem
      onPressItem={this._onPressItem}
      id={item._id}
      name={item.name}
      amount={item.media.length}
    />
  );
  _onPressItem = (name) => {
    alert("you pressed an item");
  };

  render() {
    // const window = Dimensions.get('window');
    // const { navigation } = this.props;
    // const signedIn = global.signedIn;
    // const name = global.name;
    // const photoUrl = global.photoUrl;
    // const accessToken = global.accessToken;

    return (

      <View style={{ flex: 1 }}>
        <Text style={{
          color: '#338EFF',
          marginTop: 10,
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center'
        }}>
          Medias:
           </Text>
        <ScrollView>

          <FlatList
            data={global.subjects}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>

      </View>

    )
  }
}

const styles = StyleSheet.create({

  mediasContainer: {
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    marginRight: 15,
    padding: 10,
    paddingLeft: 20,
    //marginLeft: 15,
    marginTop: 15,
    //width: '90%',
    alignItems: 'flex-start',
    backgroundColor: '#d9e6fc'
  },
  mediaText: {
    color: '#7695c9',
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default SubjectMedias;