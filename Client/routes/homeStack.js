/**
 * Mercury Project
 * homeStack File to travel from Home Screen to Deskie and Resident
 */

import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Deskie from "../screens/deskie";
import Resident from "../screens/resident";
import DeskieNavigation from "../screens/deskieNavigation";
import PickUp from "../screens/pickUp";
import Archive from "../screens/archive";
import PersonalArchive from "../screens/personalArchive";
import Profile from "../screens/profile";
import ResidentSearch from "../screens/residentSearch";
import ManualDeskie from "../screens/manualDeskie";
import { globalStyles } from "../styles/global";

/** The different screens we can add and pop from the stack */
const screens = {
  Home: {
    screen: Home
  },
  DeskieNavigation: {
    screen: DeskieNavigation
  },
  Deskie: {
    screen: Deskie
  },
  PickUp: {
    screen: PickUp
  },
  Archive: {
    screen: Archive
  },
  Resident: {
    screen: Resident
  },
  PersonalArchive: {
    screen: PersonalArchive
  },
  Profile: {
    screen: Profile
  },
  ResidentSearch: {
    screen: ResidentSearch
  },
  ManualDeskie: {
    screen: ManualDeskie
  },
};

const Stack = createStackNavigator()

/** function to create screen stack */
export default function HomeStack (navigation) {

  const [profileModalShow, setProfileModalShow] = useState(false);

  return (

    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen
        /** go to Home screen */
        name="Home"
        component={Home}
        /** title for the Home screen */
        options={{
          title: "Mercury",
          headerTitleStyle: globalStyles.title,
        }}
      />
      <Stack.Screen
        /** go to Deskie Navigation screen */
        name="DeskieNavigation"
        component={DeskieNavigation}
        /** title for the Deskie Navigation screen */
        options={{
          title: "Deskie Navigation",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        /** go to Deskie screen */
        name="Deskie"
        component={Deskie}
        /** title for the Deskie screen */
        options={{
          title: "Deskie",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: 'black'
        }}
      />
      <Stack.Screen
        /** go to Manual Deskie  screen */
        name="ManualDeskie"
        component={ManualDeskie}
        /** title for the Manual Deskie screen */
        options={{
          title: "Deskie",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        /* go to Resident Search screen */
        name="ResidentSearch"
        component={ResidentSearch}
        /* title for the ResidentSearch screen */
        options={{
          title: "Resident Search",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        /* go to Deskie screen */
        name="PickUp"
        component={PickUp}
        /** title for the Pick Up screen */
        options={{
          title: "Pick Up",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        /** go to Archive screen */
        name="Archive"
        component={Archive}
        /** title for the Archive screen */
        options={{
          title: "Archive",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        /** go to Resident screen */
        name="Resident"
        component={Resident}
        /** title for the Resident screen */
        options={{
          title: "Resident",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        /** go to Personal Archive screen */
        name="PersonalArchive"
        component={PersonalArchive}
        /** title for the Personal Archive screen */
        options={{
          title: "My Archive",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        /** go to Profile screen */
        name="Profile"
        component={Profile}
        /** title for the Profile screen */
        options={{
          title: "User Profile",
          headerTitleStyle: globalStyles.title,
          headerBackTitle: " ",
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
}
