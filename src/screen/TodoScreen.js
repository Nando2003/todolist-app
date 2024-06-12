import {StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList} from "react-native";
import { IconButton } from "react-native-paper";
import React, { useState } from "react";

const dummyData = [
  {
    id: "01",
    tittle: "Wash Car"
  },
  {
    id: "02",
    tittle: "Read a book"
  },
];

const TodoScreen = () => {

  const[todo, setTodo] = useState("");
  const[todoList, setTodoList] = useState([])

  const handleAddTodo = () => {
    setTodoList([...todoList, {id: Date.now().toString(), tittle: todo}]);
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: "#1e90ff", 
        borderRadius: 6, 
        paddingHorizontal: 6, 
        paddingVertical: 12,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        }}
      >
        
        <Text style={{ 
          color: "#fff", 
          fontSize: 20, 
          fontWeight: "800", 
          flex: 1,
          }}
        >
          {item.tittle}
        </Text>

        <IconButton icon="pencil" iconColor="#fff" />
        <IconButton icon="trash-can" iconColor="#fff" />
      </View>
    );
  };

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
        placeholder="Pesquisar"
        value={todo}
        onChangeText={(userText)=>setTodo(userText)}
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
        onPress={() => handleAddTodo()}
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

      <FlatList data={todoList} renderItem={renderTodos}/>
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});