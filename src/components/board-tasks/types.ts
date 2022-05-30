interface BoardTasksProps {
  columnId: string;
  boardId: string;
}

interface BoardColumnsTaskCreate {
  title: string;
  description: string;
}

interface EditTask {
  id: string;
  title: string;
  description: string;
  order: number;
}

export type { BoardTasksProps, BoardColumnsTaskCreate, EditTask };
