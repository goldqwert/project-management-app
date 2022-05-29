import { AppDispatch } from '../../types/types'
import { showError, deleteBoard, createBoard,updateBoard,setBoard,setBoards,createColumn,createTask,setColumns,setTasks,deleteColumn,deleteTask,updateColumn,updateTask,} from '../slices/ContentSlice'
import HttpService from '../../services/http-service'

export const getBoardsAction = () => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.getBoards()
          if (!response) {
              throw new Error('Boards not get')
          }
          dispatch(setBoards(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Getting boards data failed!'))
      }
  }
}

export const getBoardAction = (id: string) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.getBoard(id)
          if (!response) {
              throw new Error('Board not get')
          }
          dispatch(setBoard(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Getting board data failed!'))
      }
  }
}

export const createBoardAction = (boardFormData: Omit<BoardType, 'id | columns'>) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.createBoard(boardFormData)
          if (!response) {
              throw new Error('Board not posted')
          }
          dispatch(createBoard(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Creating board data failed!'))
      }
  }
}

export const updateBoardAction = (board: Omit<BoardType, 'columns'>) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.createBoard(board)
          if (!response) {
              throw new Error('Board not update')
          }
          dispatch(updateBoard(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Updating board data failed!'))
      }
  }
}

export const deleteBoardAction = (boardId:string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(showError(null))
        const fetchingDeleteRequest = async () => {
            const response = await HttpService.deleteBoard(boardId)
            if (response !=='') {
                throw new Error('Error delete data!')
            }
            dispatch(deleteBoard(boardId));
        }
        try {
            await fetchingDeleteRequest()
        } catch (e) {
            dispatch(showError('Fetching delete data failed!'))
        }
    }
}


export const getColumnsAction = (boardId: string) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.getColumns(boardId)
          if (!response) {
              throw new Error('Columns not get')
          }
          dispatch(setColumns(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Getting columns data failed!'))
      }
  }
}

export const createColumnAction = (boardId: string,
  column: Omit<ColumnType, 'id | tasks | order'>) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.createColumn(boardId,column)
          if (!response) {
              throw new Error('column not posted')
          }
          dispatch(createColumn(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Creating column data failed!'))
      }
  }
}

export const updateColumnAction = (boardId: string,
  column: Omit<ColumnType, 'tasks'>) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.updateColumn(boardId,column)
          if (!response) {
              throw new Error('Column not update')
          }
          dispatch(updateColumn(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Updating column data failed!'))
      }
  }
}

export const deleteColumnAction = (boardId: string, columnId: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(showError(null))
        const fetchingDeleteRequest = async () => {
            const response = await HttpService.deleteColumn(boardId,columnId)
            if (response !=='') {
                throw new Error('Error delete column!')
            }
            dispatch(deleteColumn(columnId));
        }
        try {
            await fetchingDeleteRequest()
        } catch (e) {
            dispatch(showError('delete column failed!'))
        }
    }
}

export const getTasksAction = (boardId: string, columnId: string) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.getTasks(boardId, columnId)
          if (!response) {
              throw new Error('Tasks not get')
          }
          dispatch(setTasks(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Getting tasks data failed!'))
      }
  }
}

export const createTaskAction = (task: Omit<TaskType, 'id | files | order'>) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.createTask(task)
          if (!response) {
              throw new Error('task not posted')
          }
          dispatch(createTask({...task,...response}));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Creating task data failed!'))
      }
  }
}

export const updateTaskAction = (task: Omit<TaskType, 'files'>) => {
  return async (dispatch: AppDispatch) => {
      const action = async () => {
          dispatch(showError(null))
          const response = await HttpService.updateTask(task)
          if (!response) {
              throw new Error('task not update')
          }
          dispatch(updateTask(response));
      }
      try {
          await action()
      } catch (e) {
          dispatch(showError('Updating column data failed!'))
      }
  }
}

export const deleteTaskAction = (boardId: string, columnId: string, taskId: string) => {
    return async (dispatch: AppDispatch) => {
        dispatch(showError(null))
        const fetchingDeleteRequest = async () => {
            const response = await HttpService.deleteTask(boardId, columnId, taskId)
            if (response !=='') {
                throw new Error('Error delete task!')
            }
            dispatch(deleteTask(taskId));
        }
        try {
            await fetchingDeleteRequest()
        } catch (e) {
            dispatch(showError('delete task failed!'))
        }
    }
}