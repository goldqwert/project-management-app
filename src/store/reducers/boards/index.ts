import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { boardsService } from '../../../api';
import { getMessageFromError, openNotification } from '../../../helpers';

import { BoardsState } from './types';

const initialState: BoardsState = { boards: [] };

const getBoardsAsync = createAsyncThunk('boards/get', async (token: string) => {
  try {
    const boards = await boardsService.getBoards(token);
    return boards;
  } catch (error) {
    openNotification('error', getMessageFromError(error));
  }
});

const authSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    createNewBoard: (state, action) => {
      state.boards = [...state.boards, action.payload];
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    },
  },
  extraReducers: {
    [getBoardsAsync.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
  },
});

const { createNewBoard, deleteBoard } = authSlice.actions;
const boardsReducer = authSlice.reducer;

export { boardsReducer, createNewBoard, getBoardsAsync, deleteBoard };
