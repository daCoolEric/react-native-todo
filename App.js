import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ActiveScreen from "./Screens/ActiveTodos.js";
import HomeScreen from "./Screens/HomeScreen.js";
import CompletedScreen from "./Screens/CompletedTodos.js";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIconStyle: { display: "none" },
            tabBarActiveTintColor: "#0ba2f4",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {
              fontSize: 20,
              fontWeight: 700,
            },
            tabBarStyle: {
              alignItems: "center",
              justifyContent: "center",
              // borderColor: "blue",
              // borderStyle: "solid",
              // borderWidth: 2,
              marginRight: 5,
            },
          })}
        >
          <Tab.Screen name="All" component={HomeScreen} />
          <Tab.Screen name="Active" component={ActiveScreen} />
          <Tab.Screen name="Completed" component={CompletedScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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
});
