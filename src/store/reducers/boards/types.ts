interface BoardsState {
  boards: IBoard[];
  tasks: ITask[];
  columns: IColumn[];
  boardDetails: IBoard | null;
  boardDetailsLoading: boolean;
  boardColumnsLoading: boolean;
}

interface GetBoardDetails {
  token: string;
  boardId: string;
}

export type { BoardsState, GetBoardDetails };
