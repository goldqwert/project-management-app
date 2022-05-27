import { LOCAL_SERVER, REMOTE_SERVER, DEFAULT_COLUMNS } from '../common/constants'
import { getTokenFromCookie } from '../common/helper'

const SERVER_URL = process.env.NODE_ENV === 'production' ? REMOTE_SERVER : LOCAL_SERVER

class HttpService {
    static async getUsers(): Promise<Omit<UserType, 'password'>[]> {
        try {
            const response = await fetch(`${SERVER_URL}users`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Users from server')
        }
    }

    static async getUser(id: string): Promise<Omit<UserType, 'password'>> {
        try {
            const response = await fetch(`${SERVER_URL}users/${id}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get User from server')
        }
    }

    static async deleteUser(id: string): Promise<string> {
        try {
            const response = await fetch(`${SERVER_URL}users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Delete User by id from server')
        }
    }

    static async updateUser(
      user: UserType
  ): Promise<Omit<UserType, 'password'>> {
      try {
          const { id, name, login, password } = user
          const response = await fetch(`${SERVER_URL}users/${id}`, {
              method: 'PUT',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${getTokenFromCookie()}`,
              },
              body: JSON.stringify({ name, login,password }),
          })
          return response.json()
      } catch (error) {
          throw new Error('Error fetching Updated User from server')
      }
  }

  static async signin(login:string,password:string): Promise<Token> {
    try {
        const response = await fetch(`${SERVER_URL}signin`, {
            method: 'POST',
            body: JSON.stringify({login,password}),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
        })
        return response.json()
    } catch (error) {
        throw new Error('Error fetching Post signin')
    }
}

static async signup(user:Omit<UserType, 'id'>): Promise<Omit<UserType, 'password'>> {
  try {
      const response = await fetch(`${SERVER_URL}signup`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
      })
      return response.json()
  } catch (error) {
      throw new Error('Error fetching Post signup')
  }
}

    static async getBoards(): Promise<Omit<BoardType, 'columns'>[]> {
        try {
            const response = await fetch(`${SERVER_URL}boards`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Boards from server')
        }
    }

    static async getBoard(id: string): Promise<BoardType> {
        try {
            const response = await fetch(`${SERVER_URL}boards/${id}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Board by id from server')
        }
    }

    static async updateBoard(
        board: Omit<BoardType, 'columns'>
    ): Promise<Omit<BoardType, 'columns'>> {
        try {
            const { title, description } = board
            const response = await fetch(`${SERVER_URL}boards/${board.id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: JSON.stringify({ title, description }),
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Updated Board from server')
        }
    }

    static async createBoard(board: Omit<BoardType, 'id | columns'>): Promise<Omit<BoardType, 'columns'>> {
        try {
            const { title, description } = board
            const boardResponse = await fetch(`${SERVER_URL}boards`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: JSON.stringify({ title, description }),
            })
            const createdBoard: Omit<BoardType, 'columns'> = await boardResponse.json()
            const createdColumns = await Promise.all(
                DEFAULT_COLUMNS.map(async (column) =>
                    fetch(`${SERVER_URL}/${createdBoard.id}/columns`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${getTokenFromCookie()}`,
                        },
                        body: JSON.stringify(column),
                    })
                )
            )
            // const columns = await Promise.all(
            //     createdColumns.map(async (c): Promise<Omit<ColumnType, 'tasks'>> => c.json())
            // )
            return createdBoard
        } catch (error) {
            throw new Error('Error fetching Posted Board from server')
        }
    }

    static async deleteBoard(boardId: string): Promise<string> {
        try {
            const response = await fetch(`${SERVER_URL}boards/${boardId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Delete Board by id from server')
        }
    }

    static async getColumns(boardId: string): Promise<Omit<ColumnType, 'tasks'>[]> {
        try {
            const response = await fetch(`${SERVER_URL}boards/${boardId}/columns`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Columns from server')
        }
    }

    static async getColumn(
        boardId: string,
        columnId: string
    ): Promise<ColumnType[]> {
        try {
            const response = await fetch(`${SERVER_URL}boards/${boardId}/columns/${columnId}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Column from server')
        }
    }

    static async createColumn(
        boardId: string,
        column: Omit<ColumnType, 'id | tasks | order'>
    ): Promise<Omit<ColumnType, 'tasks'>> {
        try {
            const response = await fetch(`${SERVER_URL}boards/${boardId}/columns`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: JSON.stringify(column),
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Posted Column from server')
        }
    }

    static async updateColumn(
        boardId: string,
        column: Omit<ColumnType, 'tasks'>
    ): Promise<Omit<ColumnType, 'tasks'>> {
        try {
            const { id, title, order } = column
            const response = await fetch(`${SERVER_URL}boards/${boardId}/columns/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: JSON.stringify({ title, order }),
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Put Column from server')
        }
    }

    static async deleteColumn(boardId: string, columnId: string): Promise<string> {
        try {
            const response = await fetch(`${SERVER_URL}boards/${boardId}/columns/${columnId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Delete Column by id from server')
        }
    }

    static async getTasks(boardId: string, columnId: string): Promise<TaskType[]> {
        try {
            const response = await fetch(
                `${SERVER_URL}boards/${boardId}/columns/${columnId}/tasks`,
                {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
                }
            )
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Tasks from Board from server')
        }
    }

    static async getTask(boardId: string, columnId: string, taskId: string): Promise<TaskType> {
        try {
            const response = await fetch(
                `${SERVER_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
                {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
                }
            )
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Get Task by id from server')
        }
    }

    static async createTask(task: Omit<TaskType, 'id | files | order'>): Promise<Pick<TaskType,  'id' | 'title' | 'description' | 'userId'>> {
        try {
            const { title, description, userId, boardId, columnId } = task
            const response = await fetch(
                `${SERVER_URL}boards/${boardId}/columns/${columnId}/tasks`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getTokenFromCookie()}`,
                    },
                    body: JSON.stringify({ title, description, userId }),
                }
            )
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Posted Task from server')
        }
    }

    static async updateTask(task: Omit<TaskType, 'files'>): Promise<Omit<TaskType, 'files'>> {
        try {
            const { id, title, order, description, userId, boardId, columnId } = task
            const response = await fetch(
                `${SERVER_URL}boards/${boardId}/columns/${columnId}/tasks/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getTokenFromCookie()}`,
                    },
                    body: JSON.stringify({
                        title,
                        order,
                        description,
                        userId,
                        boardId,
                        columnId,
                    }),
                }
            )
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Updated Task from server')
        }
    }

    static async deleteTask(boardId: string, columnId: string, taskId: string): Promise<string> {
        try {
            const response = await fetch(
                `${SERVER_URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
                {
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
                }
            )
            return response.json()
        } catch (error) {
            throw new Error('Error fetching Delete Task by id from server')
        }
    }

    static async postFile(taskId: string, file: string | Blob): Promise<string> {
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('taskId', taskId)
            const response = await fetch(`${SERVER_URL}file`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getTokenFromCookie()}`,
                },
                body: formData,
            })
            return response.json()
        } catch (error) {
            throw new Error('Error during posted file')
        }
    }

    static async getFile(taskId: string, filename: string): Promise<Blob> {
        try {
            const response = await fetch(`${SERVER_URL}file/${taskId}/${filename}`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${getTokenFromCookie()}` },
            })
            return response.blob()
        } catch (error) {
            throw new Error('Error during download file')
        }
    }
}

export default HttpService
