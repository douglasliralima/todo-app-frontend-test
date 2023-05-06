import { render, fireEvent, screen } from '@testing-library/react';
import { TodoList } from './TodoList';
import { useTodoList } from './useTodoList';
import '@testing-library/jest-dom';

jest.mock('./useTodoList');

describe('TodoList', () => {

    it('should render the menu to add new todo properly', () => {
        (useTodoList as jest.Mock).mockReturnValue({
            items: [],
            newTodoText: "",
            handleNewTodoTextChange: jest.fn(),
            handleAddTodoButtonClick: jest.fn(),
            handleItemComplete: jest.fn(),
            handleItemDelete: jest.fn(),
        });

        render(<TodoList />);

        expect(screen.getByTestId('todo-add-menu')).toBeInTheDocument();

        // expect(screen.getByTestId('new-todo-label')).toBeInTheDocument();
        expect(screen.getByText('New Item:')).toBeInTheDocument();

        // expect(screen.getByTestId('new-todo-input')).toBeInTheDocument();

        // expect(screen.getByTestId('new-todo-add-button')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    it('should render a list of todo items', () => {
        (useTodoList as jest.Mock).mockReturnValue({
            items: [
                { id: 1, text: 'Buy milk', completed: false },
                { id: 2, text: 'Buy eggs', completed: true },
            ],
            newTodoText: "",
            handleNewTodoTextChange: jest.fn(),
            handleAddTodoButtonClick: jest.fn(),
            handleItemComplete: jest.fn(),
            handleItemDelete: jest.fn(),
        });

        render(<TodoList />);

        expect(screen.getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getByText('Buy milk')).toBeInTheDocument();
        expect(screen.getByText('Buy eggs')).toBeInTheDocument();
    });

    it('should add a new todo item', () => {
        const handleAddTodoButtonClick = jest.fn();
        (useTodoList as jest.Mock).mockReturnValue({
            items: [
                { id: 1, text: 'Buy milk', completed: false },
                { id: 2, text: 'Buy eggs', completed: true },
            ],
            newTodoText: "",
            handleNewTodoTextChange: jest.fn(),
            handleAddTodoButtonClick,
            handleItemComplete: jest.fn(),
            handleItemDelete: jest.fn(),
        });

        render(<TodoList />);

        const input = screen.getByTestId('new-todo-input');
        const button = screen.getByTestId('new-todo-add-button');

        fireEvent.change(input, { target: { value: 'Buy milk' } });
        fireEvent.click(button);

        expect(handleAddTodoButtonClick).toHaveBeenCalled();
    });

    it('should mark a todo item as completed', () => {
        const handleItemComplete = jest.fn();
        (useTodoList as jest.Mock).mockReturnValue({
            items: [{ id: 0, text: 'Buy milk', completed: false }],
            newTodoText: "",
            handleNewTodoTextChange: jest.fn(),
            handleItemComplete,
            handleItemDelete: jest.fn(),
        });

        render(<TodoList />);

        const checkbox = screen.getByTestId(`item-complete-checkbox-0`);
        fireEvent.click(checkbox);

        expect(handleItemComplete).toHaveBeenCalledWith(0);
    });

    it('should remove a todo item', () => {
        const handleItemDelete = jest.fn();
        (useTodoList as jest.Mock).mockReturnValue({
            items: [
                { id: 0, text: 'Buy milk', completed: false },
                { id: 1, text: 'Buy eggs', completed: true },
            ],
            newTodoText: "",
            handleNewTodoTextChange: jest.fn(),
            handleItemComplete: jest.fn(),
            handleItemDelete,
        });

        render(<TodoList />);

        const button = screen.getByTestId(`item-delete-1`);
        fireEvent.click(button);

        expect(handleItemDelete).toHaveBeenCalledWith(1);
    });
});