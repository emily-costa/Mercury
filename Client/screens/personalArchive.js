/*
 * Mercury Project
 * Personal Archive File
 * Displays personal resident archive
 */

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { globalStyles } from "../styles/global";
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function PersonalArchive({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://still-falls-53764.herokuapp.com/packages/SE/Archived?recipient=ajf34")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <KeyboardAvoidingView>
      <View style={{backgroundColor: "white", height: "100%"}}>
        <View>
          <Text style={globalStyles.title}>PERSONAL ARCHIVE</Text>
            <FlatList
              style={{ marginTop: 5 }}
              data={data}
              keyExtractor={({ id }, index) => id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity keyboardShouldPersistTaps={"always"} style={globalStyles.dataContainer} onPress={() => Alert.alert("Package Details",
                `Size: ${item.size}\nColor: ${item.color}\nType: ${item.type}\nStatus: ${item.status}`,
                [
                  { text: "OK" },
                ])}>
                <View style={globalStyles.buttonContainer}>
                  <Text style={globalStyles.sampleDataContainer}>ID: {item.id}</Text>
                  <IconAntDesign name="ellipsis1" size={28} color={"rgb(0,0,0)"} style={globalStyles.packageInfoIcon}/>
                </View>
              </TouchableOpacity>
              )}
            />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}