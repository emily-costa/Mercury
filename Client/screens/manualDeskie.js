/**
 * Mercury Project
 * Deskie File
 * Displays package entry form
 */

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert, TouchableOpacity, SafeAreaView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { globalStyles } from '../styles/global';
import moment from "moment";

export default function ManualDeskie({ route, navigation }) {

  const [name, setName] = useState('')
  const [date, setDate] = useState('');
  const [room, setRoom] = useState('');
  const [selectedDorm, setSelectedDorm] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const time = moment().format('MMMM Do YYYY, h:mm');

  /** right now the packages get stored here, eventually they will be stored in the database */
  const packageLog = [];

  /** generate a package number for the package and add it to the log */
  function logPackage() {
    const packageNumber = generatePackageNum();
    const packageToLog = { packageNumber, date, name, room, selectedDorm, selectedType, selectedSize, selectedColor };
    packageLog.push(packageToLog);
    console.log(packageLog); /** this is here until the DB is set up so we can view the log */
    Alert.alert('Package Number', "The package you just logged is: " + packageNumber, [{text: 'OK', onPress: () => console.log('alert closed')}]);
  }

  /** generate random package ID number and check to make sure it is not being used */
  function generatePackageNum() {
    let i = 0;
    let numGen;
    /**
     * this loop generates random numbers 1-1000 until it finds one that is not being used
     * TODO: this algorithm could be optimized; make separate random number generator function
     * changelog: no more package 0
     */
    while (i < 1000) {
      numGen = (Math.floor(Math.random() * 1000) + 1);
      if (!packageMatch(numGen)) {
        return numGen;
      } else {
        i++;
      }
    }
    return -1; /* If the function tries 1000 random numbers that all match, give up */
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
      <ScrollView>
        <View style={globalStyles.container}>
          <Text style={globalStyles.title}>Package Entry</Text>
          <Text style={{margin:10, fontSize:16}}>Full Name:</Text>
          <TextInput
            style={globalStyles.textInput}
            containerStyle={globalStyles.dropDownContainer}
            placeholder="e.g. John Calvin"
            onChangeText={(userName) => setName(userName)}
          />
          <Text style={{margin:10, fontSize:16}}>Date Delivered:</Text>
          <Text style={globalStyles.textInput} containerStyle={{alignContent: "center"}}>{time}</Text>
          <Text style={{margin:10, fontSize:16}}>Recipient Room #:</Text>
          <TextInput
            keyboardType="number-pad"
            style={globalStyles.textInput}
            placeholder="###"
            onChangeText={(userName) => setRoom(userName)}
          />
          <Text style={{margin:10, fontSize:16}}>Package Type:</Text>
          <DropDownPicker
            zIndex = {4}
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
            onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
            items={[
              { label: "Envelope", value: "envelope" },
              { label: "Box", value: "box" },
              { label: "Bag", value: "bag" },
              { label: "Other", value: "other"},
            ]}
          />
          <Text style={{margin:10, fontSize:16}}>Package Size:</Text>
          <DropDownPicker
            zIndex = {3}
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
            items={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" },
              { label: "Other", value: "other" },
            ]}
          />
          <Text style={{margin:10, fontSize:16}}>Package Color:</Text>
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
            onValueChange={(itemValue, itemIndex) => setSelectedColor(itemValue)}
            zIndex = {2}
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
      </ScrollView>
    </SafeAreaView>
  );
}