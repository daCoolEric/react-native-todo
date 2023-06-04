import React from "react";
import { StyleSheet, View, Text, Button, Pressable, Image } from "react-native";

const image = require("../assets/ok.png");

export default function Task(props) {
  return (
    <View className="task" style={styles.container}>
      <View style={styles.radioButtonContainer}>
        <Pressable style={styles.radioButton}>
          <Image style={styles.checkedButton} source={image} />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <Text>{props.taskName}</Text>
      </View>
      <View style={styles.closeButtonContainer}>
        <Button onPress={() => props.deleteTask(props.id)} title="X" />
      </View>

      {/* <Button onPress={() => props.completeTask(props.id)} title="Complete" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 2,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 10,
    marginBottom: 10,
  },
  radioButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c9c9d1",
    borderStyle: "solid",
    borderWidth: 2.5,
    borderRadius: "50%",
  },
  checkedButton: {
    width: 40,
    height: 40,
  },
  radioButtonContainer: {
    flex: 1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "yellow",
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderRadius: "80%",
  },

  textContainer: {
    flex: 4,
  },
  closeButtonContainer: {
    flex: 1,
  },
});
