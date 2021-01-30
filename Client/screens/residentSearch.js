/**
 * Mercury Project
 * Resident Search File
 * Allows you to search for package recipient
 */

import React, { useState, useEffect } from "react";
import { Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { globalStyles } from "../styles/global";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function ResidentSearch({ navigation }) {

  const pressContinue = () => {
    navigation.navigate("ManualDeskie");
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    /** This query will need to be updated incorporate a variable to pull a certain building's residents */
    fetch("https://still-falls-53764.herokuapp.com/people")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function searchResident(searchQuery) {
    if (searchQuery) {
      setFilteredResidents(data.filter((resident) => {
        const regex = new RegExp(`${searchQuery.trim()}`, "i"); /** regex that is used for searching */
        const residentString = resident.firstname + resident.lastname + resident.emailprefix + resident.residentroom; /** construct a string that can be searched */
        return residentString.search(regex) >= 0; /** search the string */
      }
      ));
    } else {
      setFilteredResidents([]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={globalStyles.container}>
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
                  <Text style={globalStyles.infoHeader}>Add a package:{"\n"}</Text>
                  <Text style={{fontWeight: 'bold'}}>1.</Text> Search for package recipient, select recipient, or manual entry{"\n\n"}
                  <Text style={{fontWeight: 'bold'}}>2.</Text> Select package type, size, color, then click "Submit"{"\n\n"}
                  <Text style={{fontWeight: 'bold'}}>3.</Text> Write ID number on package, and click "Confirm" when finished{"\n"}
                </Text>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => {setModalShow(true)}}>
            <IconAntDesign name="infocirlceo" size={34} color={'rgb(0,0,0)'}/>
          </TouchableOpacity>
        </View>
        <Text style={{ marginBottom: 10, fontSize: 16 }}>Search for package recipient:</Text>
        <View>
          <TextInput
            style={globalStyles.searchInput}
            placeholderTextColor={'rgb(242,242,242)'}
            containerStyle={globalStyles.dropDownContainer}
            placeholder="e.g. John Calvin"
            onChangeText={(query) => searchResident(query)}
          />
          <IconAntDesign name="search1" size={28} color={'rgb(0,0,0)'} style={globalStyles.inputIcon}/>
        </View>
        <FlatList
          style={{ marginTop: 5 }}
          data={filteredResidents}
          keyExtractor={item => item.emailprefix}
          renderItem={({ item }) => (
            <TouchableOpacity keyboardShouldPersistTaps={'always'} onPress={() => navigation.navigate('Deskie', item)}>
              <Text style={globalStyles.residentSearchContainer} >{item.firstname} {item.lastname} {item.residentroom} {item.residenthall}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={globalStyles.manualButton}
          onPress={pressContinue}
        >
          <Text style={globalStyles.buttonText}>Manually Enter Package</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}