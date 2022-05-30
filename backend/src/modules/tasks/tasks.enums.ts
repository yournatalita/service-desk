export const TaskEnums = {
  STATUS_ARRAY: ['OPEN', 'FEEDBACK', 'TODO', 'IN_PROGRESS', 'TESTING', 'DONE', 'CANCELED'],
  STATUS_STATES: {
    open: ['OPEN', 'FEEDBACK', 'TODO', 'IN_PROGRESS', 'TESTING'] as StatusActive[],
    closed: ['DONE', 'CANCELED'] as StatusClosed[],
  },
  DEFAULT_STATUS: 'OPEN',
};

export enum TaskEnumDefaults {
  DEFAULT_STATUS = 'OPEN',
}

export type StatusActive = 'OPEN' | 'FEEDBACK' | 'TODO' | 'IN_PROGRESS' | 'TESTING';

export type StatusClosed = 'DONE' | 'CANCELED';

export type StatusType = StatusActive | StatusClosed;
