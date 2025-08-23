import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function MainScreen() {
  const [input, setInput] = useState<string>("");
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadNumbers = async () => {
      const data = await AsyncStorage.getItem("numbers");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            setNumbers(parsed);
          }
        } catch {
          setNumbers([]);
        }
      }
    };
    loadNumbers();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("numbers", JSON.stringify(numbers));
  }, [numbers]);

  const handlePress = () => {
    setError("");
    if (input.trim() === "") {
      setError("Syötä luku!");
      return;
    }
    const num = Number(input);
    if (!isNaN(num)) {
      setNumbers((prev) => [...prev, num]);
      setInput("");
    } else {
      setError("Syötä kelvollinen luku!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Syötä luku:</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Kirjoita luku"
        keyboardType="numeric"
      />
      <Button title="Lisää" onPress={handlePress} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Tallennetut luvut:</Text>
      <FlatList
        data={numbers}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 8,
    marginBottom: 8,
  },
});