import { TasksListInner } from './tasks';

export type Project = {
  id: number;
  name: string;
  code: string;
  description: string;
  accentColor: string;
  onCreated: string;
  onUpdated: string;
  tasks: TasksListInner;
};

export type ProjectsList = {
  projects: Project[];
};
