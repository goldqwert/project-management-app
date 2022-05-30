interface BoardTasksProps {
  columnId: string;
  boardId: string;
}

interface BoardColumnsTaskCreate {
  title: string;
  description: string;
}

export type { BoardTasksProps, BoardColumnsTaskCreate };
