import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PhotoList } from "./list";

import { Details } from "./details";
import { StackParamList } from "./types";

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={PhotoList} />
        <Stack.Screen
          name="Detail"
          component={Details}
          options={{ headerTitle: () => <MyHeader /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyHeader() {
  return (
    <Text
      style={{ fontSize: 40, backgroundColor: "grey", fontStyle: "italic" }}
    >
      My Own Custom Header
    </Text>
  );
}
