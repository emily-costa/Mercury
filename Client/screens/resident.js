/**
 * Mercury Project
 * Resident File
 * Displays packages ready to be picked up, deskie hours, History button option
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Alert,
  Modal
} from "react-native";
import { globalStyles } from "../styles/global";
import moment from "moment";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function Resident({ route, navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  /** create a moment object of the current time */
  const time = moment();
  const display = time.format("dddd");
  const day = time.format("e");
  const dayHour = time.format("kk");
  let statusBool = 0;
  let status = "";
  let deskHours = "";

  useEffect(() => {
    fetch("https://still-falls-53764.herokuapp.com/packages/SE/Archived?recipient=ajf34")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  /** switch statement to display the specific day's desk hours */
  switch(day) {
    /** Sun */
    case '0':
      deskHours = 'Sorry, no deskie hours today!';
      break;
    /** Mon, Wed, Thur, Friday */
    case '1':
    case '3':
    case '4':
    case '5':
      deskHours = '4-6pm, 9-10pm';
      if ((dayHour >= 16 & dayHour < 18) || (dayHour >= 21 & dayHour < 22)) {
        statusBool = 1;
      }
      break;
    /** Tue */
    case '2':
      deskHours = '4-6pm';
      if (dayHour >= 16 & dayHour < 18) {
        statusBool = 1;
      }
      break;
    /** Sat */
    case '6':
      deskHours = '9-10pm';
      if (dayHour >= 21 & dayHour < 22) {
        statusBool = 1;
      }
      break;
  }

  /** Decide whether the desk is open or not */
  Boolean(statusBool)? status="The desk is open!" : status="The desk is closed!";

  const pressPersonalArchive = () => {
    navigation.navigate("PersonalArchive");
  };

  const pressLogOut = () => {
    Alert.alert("Are you sure you want to log out?", ``,
    [
      { text: "No" },
      { text: "Yes", onPress: () => navigation.navigate("Home")},
    ])
  }

  /** display new packages and package history */
  return (
    <KeyboardAvoidingView>
      <View style={globalStyles.residentContainer}>
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
                <Text style={globalStyles.infoHeadText}>Hello Resident</Text>
                <Text style={globalStyles.infoText}>
                  <Text style={globalStyles.infoHeader}>View packages ready for pickup:{"\n"}</Text>
                  <Text style={{fontWeight: 'bold'}}>1.</Text> Packages will display under "My Current Packages" {"\n"}
                </Text>
                <Text style={globalStyles.infoText}>
                  <Text style={globalStyles.infoHeader}>View package history:{"\n"}</Text>
                  <Text style={{fontWeight: 'bold'}}>1.</Text> Click on "Package History"{"\n"}
                  <Text style={{fontWeight: 'bold'}}>2.</Text> Click package to see details {"\n"}
                </Text>
                <Text style={globalStyles.infoText}>
                  <Text style={globalStyles.infoHeader}>View the deskie hours:{"\n"}</Text>
                  <Text style={{fontWeight: 'bold'}}>1.</Text> Look under current packages to see that day's deskie hours {"\n"}
                </Text>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => {setModalShow(true)}}>
            <IconAntDesign name="infocirlceo" size={34} color={'rgb(0,0,0)'}/>
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.title}>My Current Packages</Text>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={globalStyles.dataContainer} onPress={() => Alert.alert('Package Details',
            `Size: ${item.size}\nColor: ${item.color}\nType: ${item.type}`,
            [
              { text: 'OK' },
            ])}>
              <View style={globalStyles.buttonContainer}>
                <Text style={globalStyles.sampleDataContainer}>ID: {item.id}</Text>
                <IconAntDesign name="ellipsis1" size={28} color={'rgb(0,0,0)'} style={globalStyles.packageInfoIcon}/>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text style={globalStyles.title}>{"\n"}{status}</Text>
        <Text style={globalStyles.residentTitle}>{display}'s Hours: {deskHours}</Text>
        <TouchableOpacity style={globalStyles.myPackageButton} onPress={pressPersonalArchive}>
          <Text style={globalStyles.buttonText}>Package History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.myPackageButton2} onPress={pressLogOut}>
          <Text style={globalStyles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}