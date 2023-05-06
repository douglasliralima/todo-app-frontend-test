import React from "react";
import { renderHook, act } from "@testing-library/react";
import { useTodoList } from './useTodoList';

describe('useTodoList', () => {
  it('should add a new todo item, if we provide a new todo text', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.handleNewTodoTextChange({ target: { value: 'Buy milk' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleAddTodoButtonClick()
    });


    expect(result.current.items).toEqual([
      { id: expect.any(String), text: 'Buy milk', completed: false },
    ]);
  });

  it('should not add a new todo item, if try to add a empty value', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.handleAddTodoButtonClick()
    });

    expect(result.current.items).toEqual([]);
  });

  it('should mark a todo item as completed', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.handleNewTodoTextChange({ target: { value: 'Buy milk' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleAddTodoButtonClick()
    });

    act(() => {
      result.current.handleNewTodoTextChange({ target: { value: 'Buy Eggs' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleAddTodoButtonClick()
    });

    act(() => {
      result.current.handleItemComplete(result.current.items[0].id);
    });

    expect(result.current.items[0].completed).toBe(true);
  });

  it('should remove a todo item', () => {
    const { result } = renderHook(() => useTodoList());

    act(() => {
      result.current.handleNewTodoTextChange({ target: { value: 'Buy eggs' } } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleAddTodoButtonClick()
    });

    expect(result.current.items).toEqual([
      { id: expect.any(String), text: 'Buy eggs', completed: false },
    ]);

    act(() => {
      result.current.handleItemDelete(result.current.items[0].id);
    });

    expect(result.current.items).toEqual([]);
  });
});