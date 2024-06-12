import {conexao} from './TodoListDB';

const db = conexao;

export function createTable(){
  db.transaction((tx)=> {
    tx.executeSql('CREATE TABLE IF NOT EXISTS todolists (' + 
                  'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
                  'tittle TEXT NOT NULL,'+
                  'description TEXT );',
                  [],
                  (_, error) => {
                    console.log(error)
                  });
  });
}

export async function addTodoList(todoList){
  return new Promise((resolve, reject)=>{
    db.transaction((tx)=>{
      const sql = 'INSERT INTO todolists (tittle, description) VALUES (?,?);';

      tx.executeSql(sql,
                    [todoList.tittle, todoList.description],
                    (_, {rowsAffected, insertId})=>{
                      if(rowsAffected > 0){
                        console.log('Tarefa gravada');
                        resolve(insertId);
                      }else{
                        reject('Erro ao registrar tarefa: ' + JSON.stringify(todoList));
                      }
                    }, (_, error)=> reject(error));
    });
  });
}

export async function listTodoList(){
  return new Promise((resolve, reject)=> {
    db.transaction((tx) => {
      const sql = 'SELECT * FROM todolists;';

      tx.executeSql(sql, [], (transaction, resultado)=>{
        resolve(resultado.rows._array);
      }, (_, error) => reject(error));
    });
  });
}

export async function deleteTodoList(id){
  return new Promise((resolve, reject) => {
    db.transaction((tx)=> {
      const sql = 'DELETE FROM todolists WHERE id = ?;';
      tx.executeSql(sql, [id],() => {
        resolve('Tarefa deletada ', id);
      },(_, error) => reject (error));
    });
  });
}

export async function updateTodoList(todolist){
  return new Promise((resolve, reject) => {
    db.transaction((tx)=> {
      const sql = 'UPDATE todolists SET tittle=?, description=? WHERE id=?';
      tx.executeSql(sql, 
      [todolist.tittle, todolist.description, todolist.id], () => {
        resolve('Tarefa alterada!');
      },(_, error) => reject (error));
    });
  });
}
