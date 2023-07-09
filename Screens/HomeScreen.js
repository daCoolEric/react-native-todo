import { StatusBar } from "expo-status-bar";
import { useState, useReducer, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newTask, setNewTask } from "../Reducers/newTaskSlice";
import { setTodoList, deleteTodo } from "../Reducers/todoListSlice";
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
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import Task from "../Components/Task";
import TaskModal from "../Components/TaskModal";
import MenuButton from "../Components/MenuButton";

const image = require("../assets/day.png");
const dayTheme = require("../assets/sun.png");
const nightTheme = require("../assets/moon.png");

export default function HomeScreen() {
  const todoList = useSelector((state) => state.todoList.todos);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [theme, setTheme] = useState(dayTheme);
  const [newTask, setNewTask] = useState("");

  const clear = () => {
    ref.current.value = "";
  };

  const getTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      const task = {
        id: doc.id,
        taskName: doc.data().taskName,
        completed: doc.data().completed,
      };
      dispatch(setTodoList(task.taskName !== "" ? task : todoList));
    });

    // return dispatch(setTodoList(returnData));
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleChange = (value) => {
    setNewTask(value);
  };

  //   The piece of code add a new document to database
  const addTask = async () => {
    try {
      const dbTask = {
        taskName: newTask,
        completed: false,
      };
      const stateTask = {
        id: Date.now(),
        taskName: newTask,
        completed: false,
      };
      setNewTask("");
      {
        stateTask.taskName !== "" ? dispatch(setTodoList(stateTask)) : null;
      }

      dbTask.taskName !== ""
        ? await addDoc(collection(db, "todos"), {
            taskName: dbTask.taskName,
            completed: dbTask.completed,
          })
        : null;

      console.log(todoList);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteTask = async (id) => {
    try {
      dispatch(deleteTodo(id));
      const todoDoc = doc(db, "todos", id);
      await deleteDoc(todoDoc);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

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
              ref={ref}
              style={styles.text}
              value={newTask}
              placeholder="Add a task"
              name="todo"
              onChangeText={handleChange}
            />
          </View>

          <View style={styles.buttonContainer}>
            {/* <Button title="Add" color="white" fontSize={30} onPress={addTask} /> */}
            <Pressable onPress={addTask}>
              <Text style={styles.button}>Add</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.displayArea}>
          {todoList !== [] ? (
            <FlatList
              data={todoList}
              style={styles.flatlist}
              renderItem={({ item }) => (
                <Task
                  taskName={item.taskName}
                  id={item.id}
                  completed={item.completed}
                  deleteTask={() => deleteTask(item.id)}
                  completeTask={completeTask}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : null}
        </View>
        {/* <View style={styles.notificationBar}>
          <Pressable
            onPress={() => {
              dispatch({ type: "All" });
            }}
          >
            <MenuButton title="All" color={state.AllButtonStyle} />
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch({ type: "Active" });
            }}
          >
            <MenuButton title="Active" color={state.ActiveButtonStyle} />
          </Pressable>
          <Pressable
            onPress={() => {
              dispatch({ type: "Completed" });
            }}
          >
            <MenuButton title="Completed" color={state.CompletedButtonStyle} />
          </Pressable>
        </View> */}
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
    backgroundColor: "#0ba2f4",
    borderRadius: 10,
  },
  button: {
    color: "white",
    fontWeight: 700,
    fontSize: 20,
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
