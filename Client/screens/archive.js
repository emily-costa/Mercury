/**
 * Mercury Project
 * Archive File
 * Displays building package archive
 */

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Modal, FlatList, TouchableOpacity, KeyboardAvoidingView, Alert, Keyboard, TouchableWithoutFeedback} from "react-native";
import { globalStyles } from "../styles/global";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function Archive({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  function searchPackage(searchQuery) {
    if (searchQuery) {
      setFilteredPackages(data.filter((pack) => {
        const regex = new RegExp(`${searchQuery.trim()}`, 'i'); /** regex that is used for searching */
        const packageString = pack.id + pack.recipient; /** construct a string that can be searched */
        return packageString.search(regex) >= 0; /** search the string */
      }
      ));
    } else {
      setFilteredPackages([]);
    }
  };

  useEffect(() => {
    fetch("https://still-falls-53764.herokuapp.com/packages")
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
                    <Text style={globalStyles.infoHeader}>Look up all packages:{"\n"}</Text>
                    <Text style={{fontWeight: 'bold'}}>1.</Text> Enter package recipient's username{"\n\n"}
                    <Text style={{fontWeight: 'bold'}}>2.</Text> Select package to view details{"\n"}
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
              <TouchableOpacity keyboardShouldPersistTaps={'always'} style={globalStyles.dataContainer} onPress={() => {Alert.alert('Package Details',
              `Size: ${item.size}\nColor: ${item.color}\nType: ${item.type}\nStatus: ${item.status}`,
              [
                { text: 'OK' },
              ])}}>
                <View style={globalStyles.buttonContainer}>
                  <Text style={globalStyles.sampleDataContainer}>ID {item.id}: For {item.recipient}</Text>
                  <IconAntDesign name="ellipsis1" size={28} color={'rgb(0,0,0)'} style={globalStyles.packageInfoIcon}/>
                </View>
              </TouchableOpacity>
            )} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
