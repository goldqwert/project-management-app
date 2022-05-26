type UserType = {
  id: string;
  name: string;
  login: string;
  password: string;
};

type BoardType = {
  id: string;
  title: string;
  description: string;
  columns?: ColumnType[];
};

type ColumnType = {
  id: string;
  title: string;
  order: number;
  tasks?: TaskType[];
};

type TaskType = {
  id: string;
  title: string;
  done: boolean;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: FileType[];
};

type FileType = {
  filename: string;
  fileSize: number;
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
const dispatchStore = store.dispatch;

interface InitialSignInState {
  login: string;
  password: string;
  getLoginData: {
    login: string;
    password: string;
  };
  isAuth: boolean;
  token: string | null;
  error?: null | string;
}

interface InitialSignUpState {
  name?: string;
  login: string;
  password: string;
  confirmPassword?: string;
  userData?: {
    id: string;
    name: string;
    login: string;
  };
  error?: null | string;
}
