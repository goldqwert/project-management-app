interface IBoard {
  id?: string;
  title: string;
  description: string;
  columns?: ColumnType[]
}

interface IColumn {
  id: string
  title: string
  order: number
  tasks?: TaskType[]
}

interface ITask {
  id: string
  title: string
  order: number
  description: string
  userId: string
  boardId: string
  columnId: string
  files: FileType[]
}

interface FileType {
  filename: string
  fileSize: number
}