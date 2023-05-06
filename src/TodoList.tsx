import React from 'react';
import { useTodoList } from './useTodoList';
import './TodoList.css';

export const TodoList: React.FC = () => {
    const {
        items,
        newTodoText,
        handleNewTodoTextChange,
        handleAddTodoButtonClick,
        handleItemComplete,
        handleItemDelete } = useTodoList();


    return (
        <div>
            <h1>To-Do List</h1>
            <div className='newItem' data-testid="todo-add-menu">
                <label htmlFor="item" data-testid="new-todo-label">New Item:</label>
                <input
                    type="text"
                    placeholder="New todo item"
                    value={newTodoText}
                    onChange={handleNewTodoTextChange}
                    data-testid="new-todo-input"
                />
                <button className='add' data-testid="new-todo-add-button" onClick={handleAddTodoButtonClick}>Add</button>
            </div>
            <ul>
                {items?.map((item) => (
                    <li key={item.id}>
                        <input
                            data-testid={`item-complete-checkbox-${item.id}`}
                            type="checkbox"
                            id={item.id.toString()}
                            checked={item.completed}
                            onChange={() => handleItemComplete(item.id)}
                        />
                        <label htmlFor={item.id.toString()}>{item.text}</label>
                        <button data-testid={`item-delete-${item.id}`} type="button" onClick={() => handleItemDelete(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};