export type Project = {
  id: number;
  name: string;
  code: string;
  description: string;
  accentColor: string;
  onCreated: string;
  onUpdated: string;
};

export type ProjectsList = {
  projects: Project[];
};
