import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { boardsService, columnsService } from '../../../api';
import { getMessageFromError, openNotification } from '../../../helpers';

import { BoardsState, GetBoardDetails } from './types';

const initialState: BoardsState = {
  boards: [],
  tasks: [],
  columns: [],
  boardDetails: null,
  boardDetailsLoading: false,
  boardColumnsLoading: false,
};

const getBoardsAsync = createAsyncThunk('boards/get', async (token: string) => {
  try {
    return await boardsService.getBoards(token);
  } catch (error) {
    openNotification('error', getMessageFromError(error));
  }
});

const getBoardDetailsAsync = createAsyncThunk(
  'boards-details/get',
  async ({ token, boardId }: GetBoardDetails) => {
    try {
      return await boardsService.getBoardDetails(boardId, token);
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  }
);

const getBoardsColumnsAsync = createAsyncThunk(
  'boards-columns/get',
  async ({ token, boardId }: GetBoardDetails) => {
    try {
      return await columnsService.getColumns(token, boardId);
    } catch (error) {
      openNotification('error', getMessageFromError(error));
    }
  }
);

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
    setBoardDetails: (state, action) => {
      state.boardDetails = action.payload;
    },
    setColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
  extraReducers: {
    [getBoardsAsync.fulfilled.type]: (state, action: PayloadAction<IBoard[]>) => {
      state.boards = action.payload;
    },
    [getBoardsColumnsAsync.fulfilled.type]: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = action.payload;
      state.boardColumnsLoading = false;
    },
    [getBoardsColumnsAsync.pending.type]: (state) => {
      state.boardColumnsLoading = true;
    },
    [getBoardsColumnsAsync.rejected.type]: (state) => {
      state.boardColumnsLoading = false;
    },
    [getBoardDetailsAsync.fulfilled.type]: (state, action: PayloadAction<IBoard>) => {
      state.boardDetailsLoading = false;
      state.boardDetails = action.payload;
    },
    [getBoardDetailsAsync.pending.type]: (state, action: PayloadAction<IBoard>) => {
      state.boardDetailsLoading = true;
      state.boardDetails = action.payload;
    },
    [getBoardDetailsAsync.rejected.type]: (state) => {
      state.boardDetailsLoading = false;
    },
  },
});

const { createNewBoard, deleteBoard, setBoardDetails, setColumns } = authSlice.actions;
const boardsReducer = authSlice.reducer;

export {
  boardsReducer,
  createNewBoard,
  deleteBoard,
  setBoardDetails,
  setColumns,
  getBoardsAsync,
  getBoardDetailsAsync,
  getBoardsColumnsAsync,
};
