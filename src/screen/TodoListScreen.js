import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, Alert } from "react-native";
import { IconButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { createTable, listTodoList, deleteTodoList } from '../database/TodoListDAO';

const TodoListScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    createTable();
    loadData();
  }, [isFocused]);

  const loadData = async () => {
    const todos = await listTodoList();
    setTodoList(todos);
  };

  const handleItemPress = (item) => {
    Alert.alert(item.tittle, item.description);
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            await deleteTodoList(id);
            loadData();
          },
        },
      ],
      { cancelable: false }
    );
  };


  const renderTodos = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View
          style={{
            backgroundColor: "#1e90ff",
            borderRadius: 6,
            paddingHorizontal: 6,
            paddingVertical: 12,
            marginBottom: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "800",
              flex: 1,
            }}
          >
            {item.tittle}
          </Text>

          <IconButton 
            icon="pencil" 
            iconColor="white" 
            onPress={() => navigation.navigate('Atualizar Tarefa', { id: item.id, title: item.tittle, description: item.description })} 
          />
          
          <IconButton icon="trash-can" iconColor="white" onPress={() => handleDeleteItem(item.id)} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 16, marginTop: 24 }}>
      <FlatList 
        data={todoList} 
        renderItem={renderTodos}
        contentContainerStyle={{ paddingBottom: 80 }} // Adicione paddingBottom para o espaço do botão
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Adicionar Tarefa')}
      >
        <Text style={styles.textoBotao}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  botao: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1e90ff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
