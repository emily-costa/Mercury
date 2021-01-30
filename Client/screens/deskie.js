/**
 * Mercury Project
 * Deskie File
 * Displays package entry form
 */

import React, { useState, useEffect } from "react";
import { View, Text, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { globalStyles } from "../styles/global";
import moment from "moment";

export default function Deskie({ route, navigation }) {

  const [selectedResident, setSelectedResident] = useState({});
  const [number, setNumber] = useState(-1);
  const [numberIsSet, setNumberIsSet] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const time = moment().format('MMMM Do YYYY, h:mm');

  useEffect(() => {
    setSelectedResident(route.params);
    if (!numberIsSet) {
      setNumber(generatePackageNum());
      setNumberIsSet(true);
    }
  })

  const packageLog = []; /** right now the packages get stored here, eventually they will be stored in the database */

  /** pops one screen to stack */
  const pressBack = () => {
    navigation.goBack();
  };

  /**
   * Process post request to data service.
   *
   * @returns {json} Package information sent back from the data service, including a packages ID number.
   */
  const postPackage = async () => {
    try {
      const response = await fetch('https://still-falls-53764.herokuapp.com/package/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "recipient": selectedResident.emailprefix,
          "desk": "SE",
          "status": "Entered",
          "entereddeskie": "bjd47",
          "size": selectedSize,
          "color": selectedColor,
          "type": selectedType
        })
      })
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Log package on data service and alert user.
   *
   * Precondition: Values exist for selectedResident and optionally size, color, and type
   * Postcondition: Package data added to database, alert presented to user
   */
  const logPackage = () => {
    postPackage()
      .then((loggedPackage) => {
        Alert.alert('Package Logged',
          `Number to write: ${loggedPackage.deskid}\nRecipient: ${selectedResident.firstname} ${selectedResident.lastname} (${selectedResident.emailprefix}) ${selectedResident.residentroom} ${selectedResident.residenthall}\n${selectedSize} ${selectedColor} ${selectedType}`,
          [
            { text: 'Edit' },
            { text: 'Confirm', onPress: () => navigation.navigate('ResidentSearch') }
          ]);
      })
  }

  /** generate random package ID number and check to make sure it is not being used */
  function generatePackageNum() {
    let i = 0;
    let numGen;
    /** this loop generates random numbers 1-1000 until it finds one that is not being used */
    /** TODO: this algorithm could be optimized; make separate random number generator function */
    /** changelog: no more package 0 */
    while (i < 1000) {
      numGen = (Math.floor(Math.random() * 1000) + 1);
      if (!packageMatch(numGen)) {
        return numGen;
      } else {
        i++;
      }
    }
    return -1; /** If the function tries 1000 random numbers that all match, give up */
  }

  /** checks if a given package ID number exists in the log */
  function packageMatch(num) {
    let aPackage;
    for (aPackage in packageLog) {
      if (num === aPackage.packageNumber) {
        return true;
      }
    }
    return false;
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.container}>
        <Text style={{ fontSize: 20 }}>Logging package for {selectedResident.firstname} {selectedResident.lastname}</Text>
        <Text style={{ margin: 10, fontSize: 16 }}>Package Type:</Text>
        <DropDownPicker
          zIndex={4}
          placeholder="Select..."
          style={globalStyles.dropdown}
          containerStyle={globalStyles.dropDownContainer}
          labelStyle={{
            fontSize: 20,
            color: "gray"
          }}
          itemStyle={{
            justifyContent: "center"
          }}
          selectedLabelStyle={{
            color: "black",
            textAlign: "center"
          }}
          onChangeItem={(itemValue, itemIndex) => setSelectedType(itemValue.label)}
          items={[
            { label: "Envelope", value: "envelope" },
            { label: "Box", value: "box" },
            { label: "Bag", value: "bag" },
            { label: "Other", value: "other" },
          ]}
        />

        <Text style={{ margin: 10, fontSize: 16 }}>Package Size:</Text>
        <DropDownPicker
          zIndex={3}
          placeholder="Select..."
          style={globalStyles.dropdown}
          containerStyle={globalStyles.dropDownContainer}
          labelStyle={{
            fontSize: 20,
            color: "gray"
          }}
          itemStyle={{
            justifyContent: "center"
          }}
          selectedLabelStyle={{
            color: "black",
            textAlign: "center"
          }}
          onChangeItem={(itemValue, itemIndex) => setSelectedSize(itemValue.label)}
          items={[
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
            { label: "Other", value: "other" },
          ]}
        />
        <Text style={{ margin: 10, fontSize: 16 }}>Package Color:</Text>
        <DropDownPicker
          placeholder="Select..."
          style={globalStyles.dropdown}
          containerStyle={globalStyles.dropDownContainer}
          labelStyle={{
            fontSize: 20,
            color: "gray"
          }}
          itemStyle={{
            justifyContent: "center"
          }}
          selectedLabelStyle={{
            color: "black",
            textAlign: "center"
          }}
          onChangeItem={(itemValue, itemIndex) => setSelectedColor(itemValue.label)}
          zIndex={2}
          items={[
            { label: "Yellow", value: "yellow" },
            { label: "Brown", value: "brown" },
            { label: "White", value: "white" },
            { label: "Other", value: "other" },
          ]}
        />
        <TouchableOpacity
          style={globalStyles.button}
          onPress={logPackage}
        >
          <Text style={globalStyles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}