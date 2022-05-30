interface IColumn {
  id: string;
  title: string;
  tasks?: ITask[];
  order?: number;
}
