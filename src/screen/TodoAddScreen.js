import {StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList} from "react-native";
import { addTodoList } from '../database/TodoListDAO';
import TodoList from '../model/TodoListModel'
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';

const TodoAddScreen = () => {

  const navigation = useNavigation()
  const[id, setId] = useState();
  const[tittle, setTittle] = useState("");
  const[description, setDescription] = useState("");

  async function newTodoList() {
    if (tittle == '' || description == '') {
      alert('Todos os campos devem ser preenchidos');
      return;
    }
    const todoList = new TodoList(null, tittle, description);
    await addTodoList(todoList);
    limparDados();
    navigation.navigate('home');
  }

  function limparDados() {
    setTittle('');
    setDescription('');
  }

  return (
    <View style={{ marginHorizontal: 16, marginTop: 24 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
        placeholder="Titulo"
        onChangeText={(valor) => setTittle(valor)}
      />

      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
        placeholder="Descrição"
        onChangeText={(valor) => setDescription(valor)}
      />

      <TouchableOpacity 
        style={{ 
          backgroundColor: "#000", 
          borderRadius: 6, 
          paddingVertical: 8,
          marginVertical: 24,
          marginTop: 24,
          alignItems: "center"
        }}
        onPress={newTodoList}
      >
        <Text 
          style={{ 
            color: "#fff", 
            fontWeight: "bold", 
            fontSize: 20
          }}
        >
          Adicionar
          
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default TodoAddScreen;

const styles = StyleSheet.create({});
