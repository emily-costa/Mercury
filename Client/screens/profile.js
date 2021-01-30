/**
 * Mercury Project
 * Profile File
 * Displays User Profile
 */

import React, { useState } from "react";
import { View, Text, SafeAreaView, Modal, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import DropDownPicker from 'react-native-dropdown-picker';
import IconAntDesign from "react-native-vector-icons/AntDesign";

export default function Profile({ navigation }) {

  const [modalShow, setModalShow] = useState(false);

  return (
    <SafeAreaView>
      <View style={globalStyles.container}>
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
                  <Text style={globalStyles.infoHeader}>Change the building you're working in:{"\n"}</Text>
                  <Text style={{fontWeight: 'bold'}}>1.</Text> Click on dropdown and select dorm{"\n"}
                </Text>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => {setModalShow(true)}}>
            <IconAntDesign name="infocirlceo" size={34} color={'rgb(0,0,0)'}/>
          </TouchableOpacity>
        </View>
        <Text style={globalStyles.profileTitle}> Dorm: </Text>
        <DropDownPicker
          placeholder="Select..."
          style={globalStyles.dropdown}
          containerStyle={globalStyles.dropDownContainer}
          labelStyle={{
            fontSize: 20,
            color: 'gray'
          }}
          itemStyle={{
            justifyContent: 'center'
          }}
          selectedLabelStyle={{
            color: 'black',
            textAlign: 'center'
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedColor(itemValue)}
          zIndex={2}
          items={[
            { label: "BB", value: "bb" },
            { label: "BHT", value: "bht" },
            { label: "BV", value: "bv" },
            { label: "KHVR", value: "khvr" },
            { label: "KE Apartments", value: "ke" },
            { label: "NVW", value: "nvw" },
            { label: "RVD", value: "rvd" },
            { label: "SE", value: "se" },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}