/**
 * Mercury Project
 * Home Screen File
 * Displays Login input fields
 */

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, SafeAreaView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { globalStyles } from "../styles/global";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function Home({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setWarningState] = useState(false);

  /** checks to see if deskie or resident -- used for usability tests */
  const pressUser = () => {
    if (email.includes("deskie")){
      navigation.navigate("DeskieNavigation")
    } else {
      navigation.navigate("Resident");
    }
  };

  const emailEndEdit = (e) => {
    !email.endsWith("@calvin.edu") && !email.endsWith("@students.calvin.edu")
      ? setWarningState(true)
      : setWarningState(false);
  };

  const warning = (
    <Text style={globalStyles.warning}>
      Email must end in '@students.calvin.edu' or '@calvin.edu'
    </Text>
  );

  return (
    /** Create login text inputs */
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView>
    <View style={globalStyles.container}>
      <Image style={globalStyles.image} source={require("./mercury.png")} />
      <View style={globalStyles.inputContainer}>
        <IconAntDesign name="user" size={28} color={'rgb(255,255,255)'} style={globalStyles.inputIcon}/>
        <TextInput
          style={globalStyles.logInInput}
          placeholder="e.g. mpm6"
          placeholderTextColor="#f2f2f2"
          autoCapitalize = 'none'
          onChangeText={(emailentry) => {
            setEmail(emailentry);
          }}
          onBlur={emailEndEdit}
        />
        {showWarning ? warning : null}
      </View>
      <View style={globalStyles.inputContainer}>
      <IconAntDesign name="lock" size={28} color={'rgb(255,255,255)'} style={globalStyles.inputIcon}/>
        <TextInput
          secureTextEntry={true}
          style={globalStyles.logInInput}
          placeholder="Password"
          placeholderTextColor="#f2f2f2"
          autoCapitalize = 'none'
          onChangeText={(passwordentry) => setPassword(passwordentry)}
        />
      </View>
      <TouchableOpacity style={globalStyles.logInButton} onPress={pressUser}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}