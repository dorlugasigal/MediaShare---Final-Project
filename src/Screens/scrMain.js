import React from 'react';
import { ScrollView, FlatList, Image, View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
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
      <View style={styles.subjectContainer}>
        <Text style={{ color: '#7695c9', paddingLeft: 10, fontWeight: 'bold', fontSize: 20, }}>{this.props.name}</Text>
        <Text style={{ color: '#7695c9', paddingLeft: 10, fontWeight: 'bold', fontSize: 20, }}>Items: {this.props.amount}</Text>
      </View>
    );
  }
}



class MainScreen extends React.Component {
  state = {
    slideUpPanelvisible: false
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);

    if (!result.cancelled) {
      this.setState({ document: result.uri });
    }
  };

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
    console.log(`pressed ${name}`)
    global.selectedSubject = name;
    this.props.navigation.navigate('SubjectMedias');
  };

  render() {
    const window = Dimensions.get('window');
    const { navigation } = this.props;
    const signedIn = global.signedIn;
    const name = global.name;
    const photoUrl = global.photoUrl;
    const accessToken = global.accessToken;

    return (

      <View style={{ flex: 1 }}>
        <Text style={{ color: '#338EFF', marginTop: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Your Items</Text>
        <ScrollView>

          <FlatList
            data={global.subjects}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
        <View style={{ flex: 1 }}>
          <ActionButton buttonColor="#338EFF" size={50}>
            <ActionButton.Item buttonColor='#79a6d2' title="Add Photo" size={40} onPress={() => this.props.navigation.navigate('PhotoScreen')}>
              <Icon name="md-camera" size={25} color="white" />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#79a6d2' title="Add Document" size={40} onPress={() =>
              //this.props.navigation.navigate('DocumentScreen')
              this._pickDocument()
            }>
              <Icon name="md-document" size={25} color="white" />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#79a6d2' title="Add audio" size={40} onPress={() => this.props.navigation.navigate('AudioScreen')}>
              <Icon name="md-mic" size={25} color="white" />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#79a6d2' title="Gallery" size={40} onPress={() =>
              //this.props.navigation.navigate('GalleryScreen')
              this._pickImage()
            }>
              <Icon name="md-images" size={25} color="white" />
            </ActionButton.Item>
          </ActionButton>
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({

  subjectContainer: {
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
  rowmenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  addButton: {
    height: '10%',
    alignItems: 'flex-end',
  },
  panelrowmenu: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '40%',
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '80%',
  },
  panelbuttons: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  panelcontainer: {
    height: '30%',
    backgroundColor: "#fff",
    borderWidth: 2,
  },
  header: {
    fontSize: 13
  },
  image: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }

});

export default MainScreen;