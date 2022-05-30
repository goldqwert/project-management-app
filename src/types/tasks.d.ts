interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  order?: number;
  files?: Array;
}

interface ICreateTask {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
}
