import { faker } from '@faker-js/faker';
import type { ColumnDef } from '@tanstack/table-core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { range } from 'lodash-es';
import { describe, expect, it } from 'vitest';

import { DataTable } from '../DataTable.tsx';

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
  it('should search', async () => {
    render(<DataTable columns={columns} data={data} />);
    const searchBar = screen.getByTestId('data-table-search-bar').querySelector('input')!;
    fireEvent.change(searchBar, { target: { value: data[0]!.email } });
    await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(1));
    fireEvent.change(searchBar, { target: { value: '' } });
    await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(10));
  });
});
