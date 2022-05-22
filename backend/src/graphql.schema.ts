
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateProjectInput {
    name: string;
    code: string;
}

export class EditProjectInput {
    name?: Nullable<string>;
    code?: Nullable<string>;
}

export class CreateTaskInput {
    title: string;
    description: string;
}

export class FilterTask {
    id?: Nullable<number>;
    sortName?: Nullable<string>;
    sortDirection?: Nullable<string>;
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export class EditTaskInput {
    id: number;
    title: string;
    description: string;
}

export abstract class IQuery {
    abstract projects(): Nullable<Nullable<Project>[]> | Promise<Nullable<Nullable<Project>[]>>;

    abstract project(id: number): Nullable<Task> | Promise<Nullable<Task>>;

    abstract tasks(filter?: Nullable<FilterTask>): Nullable<TasksList> | Promise<Nullable<TasksList>>;

    abstract task(id: number): Nullable<Task> | Promise<Nullable<Task>>;
}

export abstract class IMutation {
    abstract createProject(createProjectInput?: Nullable<CreateProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;

    abstract editProject(editProjectInput?: Nullable<EditProjectInput>): Nullable<Project> | Promise<Nullable<Project>>;

    abstract createTask(createTaskInput?: Nullable<CreateTaskInput>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract editTask(editTaskInput?: Nullable<EditTaskInput>): Nullable<Task> | Promise<Nullable<Task>>;
}

export abstract class ISubscription {
    abstract projectCreated(): Nullable<Project> | Promise<Nullable<Project>>;

    abstract projectEdited(): Nullable<Project> | Promise<Nullable<Project>>;

    abstract taskCreated(): Nullable<Task> | Promise<Nullable<Task>>;

    abstract taskEdited(): Nullable<Task> | Promise<Nullable<Task>>;
}

export class Project {
    id: number;
    name: string;
    code: string;
    description?: Nullable<string>;
    accentColor?: Nullable<string>;
    onCreated: DateTime;
    onUpdated: DateTime;
}

export class Task {
    id: number;
    title: string;
    description: string;
    onCreated: DateTime;
    onUpdated: DateTime;
}

export class TasksList {
    list?: Nullable<Nullable<Task>[]>;
    total?: Nullable<number>;
}

export type DateTime = any;
type Nullable<T> = T | null;
