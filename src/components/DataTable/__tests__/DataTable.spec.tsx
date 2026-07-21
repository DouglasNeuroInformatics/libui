import { useState } from 'react';

import { faker } from '@faker-js/faker';
import type { ColumnDef } from '@tanstack/table-core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { range } from 'lodash-es';
import { describe, expect, it, vi } from 'vitest';

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

  describe('state preservation across re-renders', () => {
    // A parent that re-renders for its own reasons, passing columns and row actions inline the way
    // call sites normally do -- so both reach the table with a fresh identity on every render.
    const Wrapper = ({ rows = data }: { rows?: Payment[] }) => {
      const [, setTick] = useState(0);
      return (
        <div>
          <button onClick={() => setTick((value) => value + 1)}>Re-render</button>
          <DataTable columns={[...columns]} data={rows} rowActions={[{ label: 'View', onSelect: vi.fn() }]} />
        </div>
      );
    };

    const goToPage = (page: number) => fireEvent.click(screen.getByRole('button', { name: String(page) }));
    const reRenderParent = () => fireEvent.click(screen.getByText('Re-render'));
    const firstVisibleRow = () => screen.getAllByTestId('data-table-row')[0]!;

    it('should keep the current page when the parent re-renders', () => {
      render(<Wrapper />);
      goToPage(2);
      // With the default page size of 10, page two starts at the eleventh record.
      expect(firstVisibleRow()).toHaveTextContent(data[10]!.email);

      reRenderParent();

      expect(firstVisibleRow()).toHaveTextContent(data[10]!.email);
    });

    it('should keep the global filter when the parent re-renders', async () => {
      render(<Wrapper />);
      const searchBar = screen.getByTestId('data-table-search-bar').querySelector('input')!;
      fireEvent.change(searchBar, { target: { value: data[0]!.email } });
      await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(1));

      reRenderParent();

      await waitFor(() => expect(screen.getAllByTestId('data-table-row').length).toBe(1));
      expect(searchBar.value).toBe(data[0]!.email);
    });

    it('should clamp to the last page when new data no longer reaches the current one', () => {
      const { rerender } = render(<Wrapper />);
      goToPage(2);

      rerender(<Wrapper rows={data.slice(0, 3)} />);

      // Only one page of three rows is left, so page two no longer exists and we fall back to the
      // last page that does, rather than sitting on an empty one.
      expect(screen.getAllByTestId('data-table-row').length).toBe(3);
      expect(firstVisibleRow()).toHaveTextContent(data[0]!.email);
    });
  });
});
