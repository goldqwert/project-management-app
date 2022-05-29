import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import {deteteItemInArray,updateItemInArray,updateItemsInArray} from '../../common/helper'

export interface IContentState {
  boards: BoardType[];
  columns: ColumnType[];
  tasks: TaskType[];
  currentBoard: BoardType | null,
  error: null | string
}

export const initialState: IContentState = {
  boards: [],
  columns: [],
  tasks: [],
  currentBoard: null,
  error: null
};


const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
      setBoards(state: IContentState, action: PayloadAction<BoardType[]>): void {
        state.boards = action.payload;
      },
      setBoard(state: IContentState, action: PayloadAction<BoardType>): void {
        state.currentBoard = action.payload;
      },
      createBoard(state: IContentState, action: PayloadAction<BoardType>): void {
        state.boards = [...state.boards, action.payload]
      },
      updateBoard(state: IContentState, action: PayloadAction<BoardType>): void {
        state.boards = updateItemInArray(state.boards, action.payload) as BoardType[]
      },
      deleteBoard(state: IContentState, action: PayloadAction<string>): void {
        state.boards = deteteItemInArray(state.boards, action.payload) as BoardType[]
      },
      setColumns(state: IContentState, action: PayloadAction<ColumnType[]>): void {
        state.columns = action.payload;
      },
      createColumn(state: IContentState, action: PayloadAction<ColumnType>): void {
        state.columns = [...state.columns, action.payload]
      },
      updateColumn(state: IContentState, action: PayloadAction<ColumnType>): void {
        state.columns = [...state.columns, action.payload]
      },
      deleteColumn(state: IContentState, action: PayloadAction<string>): void {
        state.columns = deteteItemInArray(state.boards, action.payload)  as ColumnType[]
      },
      setTasks(state: IContentState, action: PayloadAction<TaskType[]>): void {
        state.tasks = action.payload;
      },
      createTask(state: IContentState, action: PayloadAction<TaskType>): void {
        state.tasks = [...state.tasks, action.payload]
      },
      updateTask(state: IContentState, action: PayloadAction<Omit<TaskType, 'files'>>): void {
        state.columns = updateItemInArray(state.tasks, action.payload) as TaskType[]
      },
      deleteTask(state: IContentState, action: PayloadAction<string>): void {
        state.columns = deteteItemInArray(state.boards, action.payload)  as TaskType[]
      },
      showError(state: IContentState, action: PayloadAction<string | null>) {
        state.error = action.payload
    },

    },
})

  
export const {
  setBoards,
  setBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  setColumns,
  createColumn,
  updateColumn,
  deleteColumn,
  setTasks,
  createTask,
  updateTask,
  deleteTask,
  showError
} = contentSlice.actions
export default contentSlice.reducer
