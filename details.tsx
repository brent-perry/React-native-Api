import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Photo, StackParamList } from "./types";

export function Details() {
  const route = useRoute<RouteProp<StackParamList, "Detail">>();
  const navigation = useNavigation();
  const photo: Photo = route.params.photo;

  React.useEffect(() => {
    navigation.setOptions({ title: photo.title });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ padding: 10, fontSize: 20 }}>{photo.title}</Text>
      <Text style={{ textAlign: "center" }}>{photo.thumbnailUrl}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
