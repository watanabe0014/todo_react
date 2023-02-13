import React, { useState } from "react";
import "./styles.css";

export const App = () =>{
    const [todoText, setTodoText] = useState(``);
    const [incompleteTodos, setIncompleteTodos] = useState([]);
    const [completeTodos, setCompleteTodos] = useState([]);
    const onDChangeTodoText = (e) => setTodoText(e.target.value);

    const onClickAdd = () => {
        if(todoText === ``) return;
        const newTodos = [...incompleteTodos, todoText];
        setIncompleteTodos(newTodos);
        setTodoText(``);
    };

    const onClickDelete = (index) => {
        const newTodos = [...incompleteTodos];
        newTodos.splice(index, 1);
        setIncompleteTodos(newTodos);
    };

    const onClickComplete = (todo,index) =>{
        const newTodos = [...completeTodos];
        newTodos.push(todo);
        setCompleteTodos(newTodos);
        onClickDelete(index);
    };

    const onClickReturn = (index)=>{
        const newTodos = [...completeTodos];
        newTodos.splice(index, 1);

        const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
        setCompleteTodos(newTodos);
        setIncompleteTodos(newIncompleteTodos);
    };


    return (
        <>
    <div className="inputarea">
        <input placeholder="TODOを入力" value={todoText} onChange={onDChangeTodoText}></input>
        <button onClick={onClickAdd}>追加</button>
    </div>
    <div className="incomplete">
        <p className="title">未完了のTODO</p>
        <ul>
            {incompleteTodos.map((todo, index) =>{
                return (
                    <div  key={todo} className="list-row">
                    <li>{todo}</li>
                    <button onClick={() => {onClickComplete(todo)}}>完了</button>
                    <button onClick={() => {onClickDelete(index)}}>削除</button>
                </div>
                );
            })}
        </ul>
        </div>
        <div className="complete">
        <p className="title">完了のTODO</p>
        <ul>
            {completeTodos.map((todo, index)=>{
                return (
                <div key={todo} className="list-row">
                    <li>{todo}</li>
                    <button onClick={()=>{onClickReturn(index)}}>戻す</button>
                </div>
                );
            })}
        </ul>
        </div>
    </>
    );
};