import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { SortType, TasksList, TasksParams } from '@@types';
import { GET_TASKS } from '@api/queries';
import { formatRelativeDate } from '@utils';
import { Title } from '../components';

type UseTableProps = {
  itemsOnPage: number;
};

export const useTable = ({ itemsOnPage }: UseTableProps) => {
  const [params, setParams] = useSearchParams();
  const { loading, error, data } = useQuery<TasksList>(GET_TASKS, {
    variables: {
      filter: {
        sortDirection: params.get('sort')?.split('-')[1] || undefined,
        sortName: params.get('sort')?.split('-')[0] || undefined,
        take: itemsOnPage,
        skip: Number(params.get('page')) < 2 ? 0 : (Number(params.get('page')) - 1) * itemsOnPage,
      } as TasksParams,
    },
  });

  const rows =
    data &&
    data.tasks.list.map(({ id, title, onCreated, onUpdated }) => ({
      key: `row-${id}`,
      cells: [
        {
          key: `title-${id}`,
          content: <Title id={id} title={title} />,
        },
        {
          key: `onCreated-${id}`,
          content: formatRelativeDate(onCreated),
        },
        {
          key: `onUpdated-${id}`,
          content: formatRelativeDate(onUpdated),
        },
      ],
    }));

  const head = {
    cells: [
      {
        key: 'id',
        content: 'Title',
        isSortable: true,
        width: 70,
      },
      {
        key: 'onCreated',
        content: 'Created',
        shouldTruncate: true,
        isSortable: true,
        width: 15,
      },
      {
        key: 'onUpdated',
        content: 'Updated',
        shouldTruncate: true,
        isSortable: true,
        width: 15,
      },
    ],
  };

  React.useEffect(() => {}, [params]);

  const getCurrentURLParams = () => {
    return {
      page: (params.get('page') && `${params.get('page')}`) || '',
      sort: (params.get('sort') && `${params.get('sort')}`) || '',
    };
  };

  const onChangePage = (newPage: number) => {
    setParams({
      ...getCurrentURLParams(),
      page: `${newPage}`,
    });
  };

  const onSort = (data: SortType) => {
    setParams({
      ...getCurrentURLParams(),
      page: '1',
      sort: `${data.key}-${data.sortOrder}`,
    });
  };

  return {
    loading,
    error,
    data,
    rows,
    head,
    page: params.get('page') ? Number(params.get('page')) : undefined,
    sortName: params.get('sort')?.split('-')[0] || undefined,
    sortDirection: params.get('sort')?.split('-')[1] || undefined,
    events: {
      onChangePage,
      onSort,
    },
  };
};
