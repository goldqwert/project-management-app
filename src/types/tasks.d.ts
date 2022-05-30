interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  order?: number;
  files?: Array;
}

// description: 'egeggeegge';
// files: [];
// id: '513ef4ec-1b4a-49c8-b45a-17d49fa05fcf';
// order: 1;
// title: 'egeggege';
// userId: '0fc20938-5a7e-4219-a812-3034ef20f2f1';

interface ICreateTask {
  boardId: string;
  columnId: string;
  title: string;
  description: string;
}
