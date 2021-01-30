/**
 * Mercury Project
 * Deskie Navigation File
 * Displays various routing options for Deskie to choose from
 */

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { globalStyles } from "../styles/global";


export default function DeskieNavigation({ navigation }) {

  /** navigation functions for when buttons are pressed */
  const pressDeskie = () => {
    navigation.navigate("ResidentSearch");
  };
  const pressPickUp = () => {
    navigation.navigate("PickUp");
  };
  const pressArchive = () => {
    navigation.navigate("Archive");
  };
  const pressResident = () => {
    navigation.navigate("Resident");
  };
  const pressProfile = () => {
    navigation.navigate("Profile");
  }
  const pressLogOut = () => {
    Alert.alert("Are you sure you want to log out?", ``,
    [
      { text: "No" },
      { text: "Yes", onPress: () => navigation.navigate("Home")},
    ])
  }

  return (
    <SafeAreaView>
      <View style={globalStyles.container}>
        {/* My Profile Button */}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={pressProfile}
        >
          <Text style={globalStyles.buttonText}>My Profile</Text>
        </TouchableOpacity>
        {/* Add Package Button */}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={pressDeskie}
        >
          <Text style={globalStyles.buttonText}>Add Package</Text>
        </TouchableOpacity>
        {/* Pick Up Packages Button */}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={pressPickUp}
        >
          <Text style={globalStyles.buttonText}>Pick Up Package</Text>
        </TouchableOpacity>
        {/* Package Archive Button */}
        <TouchableOpacity
          style={globalStyles.button}
          onPress={pressArchive}
        >
          <Text style={globalStyles.buttonText}>Package Archive</Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 100,
          }}
        />
        {/* My Packages Button */}
        <TouchableOpacity
          style={globalStyles.myPackageButton}
          onPress={pressResident}
        >
          <Text style={globalStyles.buttonText}>My Packages</Text>
        </TouchableOpacity>
        {/* Log Out Button */}
        <TouchableOpacity
          style={globalStyles.myPackageButton}
          onPress={pressLogOut}
        >
          <Text style={globalStyles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}