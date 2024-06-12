import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { updateTodoList } from "../database/TodoListDAO";

const TodoUpdateScreen = ({ route, navigation }) => {
  const { id, title, description } = route.params;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleUpdateTodo = async () => {
    if (!newTitle || !newDescription) {
      alert('Todos os campos devem ser preenchidos');
      return;
    }

    const updatedTodo = { id, tittle: newTitle, description: newDescription };
    await updateTodoList(updatedTodo);
    navigation.goBack();
  };

  return (
    <View style={{ marginHorizontal: 16, marginTop: 24 }}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={newTitle}
        onChangeText={setNewTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={newDescription}
        onChangeText={setNewDescription}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleUpdateTodo}
      >
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoUpdateScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1e90ff",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
