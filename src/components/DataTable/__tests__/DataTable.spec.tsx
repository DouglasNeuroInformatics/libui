import { useState } from 'react';

import { faker } from '@faker-js/faker';
import type { ColumnDef } from '@tanstack/table-core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';

import { DataTable } from '../DataTable.tsx';

import type { DataTableSearchChangeHandler } from '../types.ts';

type PaymentStatus = 'failed' | 'pending' | 'processing' | 'success';

type Payment = {
  amount: number;
  email: string;
  id: string;
  status: PaymentStatus;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    enableSorting: false,
    filterFn: (row, id, filter: PaymentStatus[]) => {
      return filter.includes(row.getValue(id));
    },
    header: 'Status'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  }
];

const statuses: readonly PaymentStatus[] = Object.freeze(['failed', 'pending', 'processing', 'success']);

const data: Payment[] = range(20).map((i) => ({
  amount: faker.number.int({ max: 100, min: 0 }),
  email: faker.internet.email(),
  id: String(i + 1),
  status: faker.helpers.arrayElement(statuses)
}));

describe('DataTable', () => {
  it('should render with 10 visible rows', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByTestId('data-table')).toBeInTheDocument();
    expect(screen.getAllByTestId('data-table-row').length).toBe(10);
  });
  it('should apply custom styles to the root element', () => {
    render(
      <DataTable columns={columns} data={data} rootStyle={{ '--data-table-accent': 'red', backgroundColor: 'blue' }} />
    );
    const root = screen.getByTestId('data-table');
    expect(root).toHaveStyle({ backgroundColor: 'blue' });
    expect(root.style.getPropertyValue('--data-table-accent')).toBe('red');
  });
  it('should search', async () => {
    render(<DataTable columns={columns} data={data} />);
    const searchBar = screen.getByTestId('data-table-search-bar').querySelector('input')!;
    fireEvent.change(searchBar, { target: { value: data[0]!.email } });
    await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(1));
    fireEvent.change(searchBar, { target: { value: '' } });
    await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(10));
  });
});

describe('DataTable pagination', () => {
  // Deterministic, so a row can be identified by the page it belongs to
  const paginatedData: Payment[] = range(25).map((i) => ({
    amount: i,
    email: `user-${i + 1}@example.com`,
    id: String(i + 1),
    status: 'pending'
  }));

  const firstRow = () => screen.getAllByTestId('data-table-row')[0]!;

  const goToSecondPage = async () => {
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    await waitFor(() => expect(firstRow()).toHaveTextContent('user-11@example.com'));
  };

  /**
   * Records the clicked row, the way a consumer would in order to highlight it. The point is that
   * this is an ordinary `setState` in the component that owns the table: it re-renders the
   * consumer, but changes nothing about the table's contents.
   */
  const ClickToSelect = ({ onSearchChange }: { onSearchChange?: DataTableSearchChangeHandler<Payment> }) => {
    const [clickedRowId, setClickedRowId] = useState<null | string>(null);
    return (
      <div>
        <span data-testid="clicked-row-id">{clickedRowId ?? 'none'}</span>
        <DataTable
          columns={columns}
          data={paginatedData}
          onRowClick={(payment) => setClickedRowId(payment.id)}
          onSearchChange={onSearchChange}
        />
      </div>
    );
  };

  it('should stay on the current page when a row click re-renders the consumer', async () => {
    render(<ClickToSelect />);
    await goToSecondPage();

    fireEvent.click(firstRow());
    await waitFor(() => expect(screen.getByTestId('clicked-row-id')).toHaveTextContent('11'));

    expect(firstRow()).toHaveTextContent('user-11@example.com');
  });

  // `DataTableControls` runs `onSearchChange` from an effect keyed on the handler itself, so an
  // inline handler -- the normal way to write one -- re-runs it on every consumer render, not only
  // when the search value changes. A handler that writes filter state then hands Tanstack a new
  // `columnFilters` identity, whose `autoResetPageIndex` returns the table to the first page.
  it('should stay on the current page when an inline onSearchChange writes filter state', async () => {
    render(
      <ClickToSelect
        onSearchChange={(_, table) => {
          table.getColumn('status')!.setFilterValue(() => [...statuses]);
        }}
      />
    );
    await goToSecondPage();

    fireEvent.click(firstRow());
    await waitFor(() => expect(screen.getByTestId('clicked-row-id')).toHaveTextContent('11'));

    expect(firstRow()).toHaveTextContent('user-11@example.com');
  });

  // Same reset, seen from the search box: the filter is dropped from the table state while the
  // search input keeps its text, so the controls end up contradicting the rows
  it('should keep the search applied when a row click re-renders the consumer', async () => {
    render(<ClickToSelect />);
    const searchBar = screen.getByTestId('data-table-search-bar').querySelector('input')!;
    fireEvent.change(searchBar, { target: { value: 'user-11@example.com' } });
    await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(1));

    fireEvent.click(firstRow());
    await waitFor(() => expect(screen.getByTestId('clicked-row-id')).toHaveTextContent('11'));

    expect(searchBar).toHaveValue('user-11@example.com');
    expect(screen.getAllByTestId('data-table-row').length).toBe(1);
  });
});
