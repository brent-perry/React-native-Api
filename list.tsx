import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  Image
} from "react-native";
import { Card, List, Searchbar, Title, Paragraph } from "react-native-paper";
import { Photo } from "./types";

export function PhotoList() {
  const [isLoading, setLoading] = useState<boolean>();
  const [dataSource, setDataSource] = useState<Photo[]>([]);
  const [error, setError] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [searchedItems, setSearchedItems] = useState<Photo[]>([]);

  const navigation = useNavigation();

  function navigate(photo: Photo) {
    //handle the clicks
    // navigate to details component

    navigation.navigate("Detail", {
      photo,
    });
  }

  useEffect(() => {
    const filteredPhotos = dataSource.filter((photo) =>
      photo.title.includes(searchQuery.toLowerCase())
    );

    setSearchedItems(filteredPhotos);
  }, [dataSource, searchQuery]);

  function fetchPhotos() {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setDataSource(responseJson);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.toString());
      });
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
        <Button title="Retry" onPress={fetchPhotos} />
      </View>
    );
  } else {
    return (
      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(newText) => setSearchQuery(newText)}
          value={searchQuery}
          style={{ margin: 20 }}
        />
        <ScrollView>
          {searchedItems.map((photo) => {
            return (
              <TouchableOpacity
                key={photo.id}
                onPress={() => {
                  navigate(photo);
                }}
              >
                <Card style={{ marginVertical: 10 }}>
                  <Card.Title title={photo.title} />
                  <Card.Content>
                    <Image source={{ uri: photo.thumbnailUrl }} />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
