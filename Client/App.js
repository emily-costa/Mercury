/**
 * Mercury Project
 * App File
 */

import React, { useState } from "react";
import "react-native-gesture-handler";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./routes/homeStack";

/** function imports fonts, registers the one we want to load */
const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

export default function App() {
  /** keeping track that the fonts are loaded */
  const [fontsLoaded, setFontsLoaded] = useState(false);
  /** If and else statement to check that fonts are loaded, if false then load them */
  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading
        /** triggers asynchronous action to load fonts */
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
}