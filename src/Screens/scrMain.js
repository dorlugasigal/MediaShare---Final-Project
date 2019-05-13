import React from 'react';
import { TouchableOpacity, ScrollView, FlatList, Image, View, Text, StyleSheet, Dimensions, Modal } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons"
import Icon from "@expo/vector-icons/Ionicons"
import { FloatingAction } from 'react-native-floating-action';
import ActionButton from 'react-native-action-button';
import { ImagePicker, DocumentPicker } from 'expo';



class MyListItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    global.selectedSubjectMedia = this.props.media;
    global.selectedSubject = this.props.name;
    console.log(JSON.stringify(this.props.media));
    this.props.onPressItem();
  };

  render() {
    return (
      <View >
        <TouchableOpacity onPress={this._onPress} >
          <View style={styles.subjectContainer}>
            <Text style={{ color: '#7695c9', paddingLeft: 10, fontWeight: 'bold', fontSize: 20, }}>{this.props.name}</Text>
            <Text style={{ color: '#7695c9', paddingLeft: 10, fontWeight: 'bold', fontSize: 20, }}>Items: {this.props.amount}</Text>
          </View>
        </TouchableOpacity>
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
    console.log(result);

    if (!result.cancelled) {
      this.setState({ document: result.uri });
    }
  };

  _keyExtractor = (item, index) => item._id;
  _renderItem = ({ item }) => (

    <MyListItem
      onPressItem={this._onPressItem}
      id={item.id}
      name={item.name}
      media={item.media}
      amount={item.media.length}
    />
  );
  _onPressItem = () => {
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

      <View style={{
        flex: 1, flexDirection: 'column', justifyContent: 'space-between'
      }}>
        <View style={{ height: '6%' }}>
          <Text style={{ color: '#338EFF', marginTop: 10, fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Your Items</Text>
        </View>
        <ScrollView styles={{ height: '80%' }} >
          <FlatList
            data={global.subjects}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => this.props.navigation.navigate('PhotoScreen')}
          >
            <Icon name={"md-camera"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._pickDocument()}
            style={styles.roundButton}
          >
            <Icon name={"md-document"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => this.props.navigation.navigate('AudioScreen')}
          >
            <Icon name={"md-mic"} size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => this._pickImage()}
          >
            <Icon name={"md-images"} size={30} color="white" />
          </TouchableOpacity>
        </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {

    height: '18%',
    padding: 0,
    backgroundColor: '#cedbed',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#7387a3',
  }
  ,
  roundButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#79a6d2',
    borderRadius: 50,
  },
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