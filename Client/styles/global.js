/** Global Style Sheet file for Mercury App */

import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    marginBottom: 100,
    backgroundColor: "white",
    height: "100%",
  },
  newcontainer: {
    padding: 10,
    alignItems: "center",
    marginBottom: 0,
    backgroundColor: "white",
  },
  residentContainer: {
    backgroundColor: "white",
    paddingRight: 10,
    paddingTop: 10,
  },
  hours: {
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 40,
  },
  inputContainer: {
    margin: 5,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    opacity: 0.7,
  },
  buttonText: {
    color: "rgb(255,255,255)",
    fontSize: 20,
    textAlign: "center",
  },
  /** style all buttons */
  button: {
    width: WIDTH - 60,
    height: 55,
    borderRadius: 25,
    backgroundColor: "rgb(102,0,0)",
    justifyContent: "center",
    marginTop: 25,
  },
  logInButton: {
    width: WIDTH - 60,
    height: 55,
    borderRadius: 25,
    backgroundColor: "rgb(102,0,0)",
    justifyContent: "center",
    marginTop: 30,
  },
    manualButton: {
    width: WIDTH - 60,
    height: 55,
    borderRadius: 25,
    backgroundColor: "rgb(102,0,0)",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 30,
  },
  /** style specific button */
  myPackageButton: {
    width: WIDTH - 60,
    height: 55,
    borderRadius: 25,
    backgroundColor: "rgb(102,0,0)",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 5,
  },
  myPackageButton2: {
    width: WIDTH - 60,
    height: 55,
    borderRadius: 25,
    backgroundColor: "rgb(102,0,0)",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 25,
    marginBottom: 400,
  },
  sub: {
    marginTop: 60,
  },
  /** style drop down */
  dropdown: {
    borderWidth: 2,
    borderColor: "gray",
  },
  /** style the drop down container */
  dropDownContainer: {
    height: 55,
    width: WIDTH - 100,
    marginTop: 1,
  },
  warning: {
    padding: 2,
    fontSize: 10,
    color: "red",
    display: "none",
  },
  /** style the text input for login screen */
  logInInput: {
    width: WIDTH - 60,
    height: 55,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: "silver",
    color: "rgb(255,255,255)",
    marginHorizontal: 25,
  },
  searchInput: {
    width: WIDTH - 60,
    borderWidth: 2,
    borderColor:"rgb(150,150,150)",
    height: 55,
    borderRadius: 25,
    fontSize: 20,
    paddingLeft: 45,
    backgroundColor: "silver",
    color: "rgb(0,0,0)",
    marginHorizontal: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "maroon",
    textAlign: "center",
  },
  profileTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "maroon",
    textAlign: "center",
    marginBottom: 10,
  },
  residentTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "maroon",
    textAlign: "center",
    marginBottom: 20,
  },
  /** style icons on login page */
  inputIcon: {
    position: "absolute",
    top: 13,
    left: 38,
    zIndex: 999,
    //transform: [{rotateY: '180deg'}],
  },
  instructionIcon: {
    position: "absolute",
    top: "11%",
    left: "90%",
    zIndex: 999,
    //transform: [{rotateY: '180deg'}],
  },
  packageInfoIcon: {
    position: "absolute",
    right: 5,
    zIndex: 999,
    transform: [{ rotate: "90deg"}],
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  /** Format the input sections of Deskie.js package entry */
  textInput: {
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "white",
    height: 55,
    width: WIDTH - 100,
    marginTop: 0,
    padding: 13,
    fontSize: 20,
    borderRadius: 5,
    alignContent: "center",
  },
  sampleDataContainer: {
    backgroundColor: "rgb(255,245,230)",
    borderColor: "burlywood",
    color: "black",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 4,
    padding: 20,
    textAlign: "center",
    fontSize: 22,
    width: WIDTH - 90,
  },
  residentSearchContainer: {
    padding: 10,
    backgroundColor: "rgb(255,245,230)",
    borderColor: "burlywood",
    color: "black",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 4,
    padding: 20,
    margin: 5,
    textAlign: "center",
    fontSize: 22,
    width: WIDTH - 90,
  },
  dataContainer: {
    margin: 5,
    alignItems: "center",
  },
  cardContent: {
    fontSize: 20,
    padding: 10,
  },
  iconRight: {
    justifyContent: "flex-start",
    alignSelf: "flex-end"
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .7)",
  },
  infoHeadText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  infoText: {
    fontSize: 18,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 22,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(102,0,0)",
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalContainer: {
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "lightgray",
    margin: 100,
    top: 35,
    width: WIDTH - 50,
    height: HEIGHT - 200,
  },
  clickable: {
    borderRadius: 20,
    padding: 10,
  },
  clickableText: {
    textAlign: "center"
  },
  modal: {
    backgroundColor: "blue",
  },
  indent: {
    paddingLeft: 30,
  },
});
