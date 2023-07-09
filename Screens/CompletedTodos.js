import { StatusBar } from "expo-status-bar";
import { useState, useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import Task from "../Components/Task";
import TaskModal from "../Components/TaskModal";
import MenuButton from "../Components/MenuButton";

const image = require("../assets/day.png");
const dayTheme = require("../assets/sun.png");
const nightTheme = require("../assets/moon.png");

const initialState = {
  AllButtonStyle: "#9394a5",
  ActiveButtonStyle: "#9394a5",
  CompletedButtonStyle: "#9394a5",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "All":
      return {
        AllButtonStyle: "#2596be",
        ActiveButtonStyle: "#9394a5",
        CompletedButtonStyle: "#9394a5",
      };
    case "Active":
      return {
        AllButtonStyle: "#9394a5",
        ActiveButtonStyle: "#2596be",
        CompletedButtonStyle: "#9394a5",
      };
    case "Completed":
      return {
        AllButtonStyle: "#9394a5",
        ActiveButtonStyle: "#9394a5",
        CompletedButtonStyle: "#2596be",
      };
    default:
      return state;
  }
};

export default function CompletedScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = useState(dayTheme);
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const getTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const returnData = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      returnData.push({
        id: doc.id,
        taskName: doc.data().taskName,
        completed: doc.data().completed,
      });
    });
    return setTodoList(returnData);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (value) => {
    setNewTask(value);
  };

  const addTask = async () => {
    try {
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        completed: false,
      };
      setTodoList(task.taskName !== "" ? [...todoList, task] : todoList);
      const todo = await addDoc(collection(db, "todos"), {
        id: task.id,
        taskName: task.taskName,
        completed: task.completed,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // const deleteTask = async (id) => {
  //   try {
  //     setTodoList(todoList.filter((task) => task.id !== id));
  //     const todoDoc = doc(db, "todos", id);
  //     await deleteDoc(todoDoc);
  //   } catch (e) {
  //     console.error("Error deleting document: ", e);
  //   }
  // };

  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>T O D O</Text>
          <Pressable
            onPress={() =>
              theme == dayTheme
                ? setTheme(nightTheme)
                : theme == nightTheme
                ? setTheme(dayTheme)
                : null
            }
          >
            <Image style={styles.themeChooser} source={theme} />
          </Pressable>
        </View>
        <View style={styles.textBoxContainer}>
          <View style={styles.textBox}>
            <TextInput
              style={styles.text}
              placeholder="Add a task"
              name="todo"
              onChangeText={handleChange}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Add" color="white" onPress={addTask} />
          </View>
        </View>

        <View style={styles.displayArea}>
          <FlatList
            data={todoList}
            style={styles.flatlist}
            renderItem={({ item }) => (
              <Task
                taskName={item.taskName}
                id={item.id}
                completed={item.completed}
                // deleteTask={() => deleteTask(item.id)}
                completeTask={completeTask}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#E9E9F0",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "30%",
    backgroundColor: "#E9E9F0",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 0.4,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: 700,
  },
  themeChooser: {
    width: 50,
    height: 50,
  },
  textBoxContainer: {
    flex: 0.2,
    width: "90%",
    height: 80,
    backgroundColor: "#fff",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 2,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textBox: {
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 2,

    width: "80%",
    height: 60,
    paddingLeft: 16,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 25,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: 59,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  displayArea: {
    flex: 2,
    width: "90%",

    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 2,
  },
  notificationBar: {
    flex: 0.25,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // borderColor: "blue",
    // borderStyle: "solid",
    // borderWidth: 2,
  },
  flatlist: {
    flex: 1,
    width: "100%",
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 2,
  },
});
