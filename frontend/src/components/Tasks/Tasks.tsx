import React from 'react';
import styled from 'styled-components';

import { DynamicTableStateless, Button, EmptyState } from '@ui';

import { Filter } from './components';
import { useTable } from './hooks/useTable';
import { SortOrderType } from '@atlaskit/dynamic-table/types';

const TOTAL_ON_PAGE = 20;

export const Tasks: React.FC = () => {
  const {
    loading,
    error,
    data,
    rows,
    head,
    page,
    sortName,
    sortDirection,
    events: { onChangePage, onSort },
  } = useTable({
    itemsOnPage: TOTAL_ON_PAGE,
  });

  return (
    <WrapperTable>
      <Filter />
      <DynamicTableStateless
        head={head}
        rows={rows}
        rowsPerPage={TOTAL_ON_PAGE}
        page={page}
        sortKey={sortName}
        sortOrder={sortDirection as SortOrderType}
        totalRows={data?.tasks.total}
        loadingSpinnerSize={'small'}
        emptyView={
          !error ? (
            <EmptyState
              header="Welcome to Issues!"
              description="Issues are used to track todos, bugs, feature requests, and more."
              primaryAction={<Button appearance="primary">Create issue</Button>}
            />
          ) : (
            <EmptyState header="Error" description={error.message} />
          )
        }
        isLoading={loading}
        onSetPage={(num) => onChangePage(num)}
        onSort={(data) => onSort(data)}
      />
    </WrapperTable>
  );
};

const WrapperTable = styled.div`
  display: block;
  width: 100%;
`;
