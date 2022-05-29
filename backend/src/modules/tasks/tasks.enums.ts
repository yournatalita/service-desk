export const TaskEnums = {
  STATUS_ARRAY: ['OPEN', 'FEEDBACK', 'TODO', 'IN_PROGRESS', 'TESTING', 'DONE', 'CANCELED'],
  STATUS_STATES: {
    open: ['OPEN', 'FEEDBACK', 'TODO', 'IN_PROGRESS', 'TESTING'],
    closed: ['DONE', 'CANCELED'],
  },
};

export type StatusType =
  | 'OPEN'
  | 'FEEDBACK'
  | 'TODO'
  | 'IN_PROGRESS'
  | 'TESTING'
  | 'DONE'
  | 'CANCELED';
