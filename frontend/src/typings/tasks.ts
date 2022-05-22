type Nullable<T> = T | null;

export type Task = {
  id: number;
  title: string;
  description: string;
  onCreated: string;
  onUpdated: string;
};

export type TasksList = {
  tasks: TasksListInner;
};

export type TasksListInner = {
  list: Task[];
  total: number;
};

export type CreateTaskInput = {
  name: string;
  description: string;
};

export type TasksParams = {
  sortName?: Nullable<string>;
  sortDirection?: Nullable<string>;
  take?: Nullable<number>;
  skip?: Nullable<number>;
}

export type SortType = {
  key: string;
  sortOrder: string;
}