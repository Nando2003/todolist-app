import * as SQLite from 'expo-sqlite';

const db_name = 'TodoList.db';

const openConection = () => {
  const db = SQLite.openDatabase(db_name);
  return db;
}

export const conexao = openConection();