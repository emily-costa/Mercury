/**
 * Mercury Project
 * Pick Up File
 * Displays Package info for those ready to be picked up in dorm SE
 */

import React, { useState, useEffect } from "react";
import { View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  FlatList, Modal,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import { globalStyles } from "../styles/global";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function PickUp({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  function searchPackage(searchQuery) {
    if (searchQuery) {
      setFilteredPackages(data.filter((pack) => {
        const regex = new RegExp(`${searchQuery.trim()}`, "i"); /** regex that is used for searching */
        const packageString = pack.id + pack.recipient; /** construct a string that can be searched */
        return packageString.search(regex) >= 0; /** search the string */
      }
      ));
    } else {
      setFilteredPackages([]);
    }
  };

  /** Calls server to update the status of the package to "Archived" */
  const putPackage = async (idNum) => {
    try {
      const response = await fetch("https://still-falls-53764.herokuapp.com/package/" + idNum + "?status=Archived", {
        method: "PUT",
      })
      return;
    } catch (error) {
      console.error(error);
    }
  }

  /** waits until putPackage to return to the Deskie Navigation screen */
  const archivePackage = (idNum) => {
    putPackage(idNum)
      .then(
        navigation.navigate("DeskieNavigation")
      )
  }

  useEffect(() => {
    fetch("https://still-falls-53764.herokuapp.com/packages/Entered")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={globalStyles.container}>
        <View style={{backgroundColor: 'white', height: '100%'}}>
          <View style={globalStyles.iconRight}>
            <Modal
              transparent={true}
              animationType="slide"
              visible={modalShow}
              style={globalStyles.modal}
            >
              <View style={globalStyles.center}>
                <View style={globalStyles.modalContainer}>
                  <IconAntDesign
                    style={globalStyles.clickable}
                    onPress={() => {setModalShow(!modalShow)}}
                    name="closecircleo"
                    size={26}
                    color={'rgb(0,0,0)'}
                  />
                  <Text style={globalStyles.infoHeadText}>Hello Deskie</Text>
                  <Text style={globalStyles.infoText}>
                    <Text style={globalStyles.infoHeader}>Distribute package for pick Up:{"\n"}</Text>
                    <Text style={{fontWeight: 'bold'}}>1.</Text> Enter package recipient's username{"\n\n"}
                    <Text style={{fontWeight: 'bold'}}>2.</Text> Select correct package, then click Confirm"
                  </Text>
                </View>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => {setModalShow(true)}}>
              <IconAntDesign style={{paddingRight: 10}} name="infocirlceo" size={34} color={'rgb(0,0,0)'}/>
            </TouchableOpacity>
          </View>
          <View style={globalStyles.inputContainer}>
            <IconAntDesign name="search1" size={28} color={'rgb(0,0,0)'} style={globalStyles.inputIcon}/>
            <TextInput
              style={globalStyles.searchInput}
              containerStyle={globalStyles.dropDownContainer}
              placeholder="Enter email holder "
              placeholderTextColor={'rgb(242,242,242)'}
              autoCapitalize = 'none'
              autoCompleteType = 'off'
              autoCorrect={false}
              onChangeText={(query) => searchPackage(query)}
            />
          </View>
          <FlatList
            style={{ marginTop: 5 }}
            data={filteredPackages}
            keyExtractor={({id}) => id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity keyboardShouldPersistTaps={'always'} style={globalStyles.dataContainer} onPress={() => {Alert.alert('Package Pick Up',
                `Size: ${item.size}\n Color: ${item.color}\nType: ${item.type}\nPackage was picked up\nPackage placed in Archive`,
                [
                  { text: 'Not yet' },
                  { text: 'Confirm', onPress: () => archivePackage(item.id)}
                ])}}>
                <View style={globalStyles.buttonContainer}>
                  <Text style={globalStyles.sampleDataContainer}>ID {item.id}: For {item.recipient}</Text>
                  <IconAntDesign name="ellipsis1" size={28} color={'rgb(0,0,0)'} style={globalStyles.packageInfoIcon}/>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}