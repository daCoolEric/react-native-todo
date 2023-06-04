import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MenuButton = (props) => {
  return (
    <View style={styles.button}>
      <Text style={[styles.textStyle, { color: props.color }]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});

export default MenuButton;
