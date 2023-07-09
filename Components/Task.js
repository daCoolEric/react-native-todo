import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const done = require("../assets/ok.png");
const inProgress = require("../assets/radio-button.png");

export default function Task(props) {
  const [taskStatus, setTaskStatus] = useState(inProgress);
  const [textStyle, setTextStyle] = useState(true);

  const updateTask = async (id) => {
    try {
      // setTodoList(todoList.filter((task) => task.id !== id));
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { completed: textStyle });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };
  const changeStatus = () => {
    switch (taskStatus) {
      case done:
        setTaskStatus(inProgress);
        setTextStyle(true);
        updateTask(props.id);
        break;
      case inProgress:
        setTaskStatus(done);
        setTextStyle(false);
        updateTask(props.id);
        break;

      default:
        null;
        break;
    }
  };

  return (
    <View className="task" style={styles.container}>
      <View style={styles.radioButtonContainer}>
        <Pressable style={styles.radioButton} onPress={changeStatus}>
          <Image style={styles.checkedButton} source={taskStatus} />
        </Pressable>
      </View>
      <View style={styles.textContainer}>
        <Text style={textStyle ? styles.taskInProgress : styles.taskCompleted}>
          {props.taskName}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.closeButtonContainer}
        onPress={() => props.deleteTask(props.id)}
      >
        <Text style={{ color: "#e2585e", fontSize: 25, fontWeight: 700 }}>
          X
        </Text>
      </TouchableOpacity>

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
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "#bebebe",
    fontSize: 18,
    fontStyle: "italic",
  },
  taskInProgress: {
    textDecorationLine: "none",
    color: "#0ba2f4",
    fontSize: 22,
  },
  closeButtonContainer: {
    flex: 1,
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    //   borderColor: "yellow",
    //   borderStyle: "solid",
    //   borderWidth: 2,
  },
});
