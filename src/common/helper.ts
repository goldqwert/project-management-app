// TO DO FUNCTION getTokenFromCookie
import { getCookie } from 'typescript-cookie'

export const getTokenFromCookie = () => {
    return getCookie('jwt')
}

export const deteteItemInArray = (array: (BoardType | TaskType | ColumnType | UserType) [], id: string) => {
  return array.filter((items) => items.id !== id);
};

export const updateItemInArray = (array: (BoardType | TaskType) [], updatedItem: BoardType | TaskType) =>
  array.map((item) => (item.id === updatedItem.id ? updatedItem : item));

export  const updateItemsInArray = (tasks: TaskType[], newTasks: TaskType[]) =>
  tasks.map((t) => newTasks.find((task) => task.id === t.id) || t);