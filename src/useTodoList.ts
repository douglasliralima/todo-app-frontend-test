import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export const useTodoList = () => {
    const [newTodoText, setNewTodoText] = useState('');

    function handleNewTodoTextChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNewTodoText(event.target.value);
    }

    function handleAddTodoButtonClick() {
        if (newTodoText) {
            handleAddNewItem(newTodoText);
            setNewTodoText('');
        }
    }

    const [items, setItems] = useState<TodoItem[]>([]);

    const handleAddNewItem = (text: string) => {
        setItems((prevItems) => [...prevItems, { id: uuidv4(), text, completed: false }]);
    };

    const handleItemComplete = (id: string) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
        );
    };

    const handleItemDelete = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return {
        items,
        newTodoText,
        handleNewTodoTextChange,
        handleAddTodoButtonClick,
        handleItemComplete,
        handleItemDelete,
    };
};