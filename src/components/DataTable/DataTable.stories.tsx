import { useState } from 'react';

import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/table-core';
import { range } from 'lodash-es';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '../Button';
import { DropdownMenu } from '../DropdownMenu';
import { DataTable } from './DataTable';
import { useDataTableHandle } from './hooks';

type PaymentStatus = 'failed' | 'pending' | 'processing' | 'success';

type Payment = {
  amount: number;
  email: string;
  id: string;
  status: PaymentStatus;
};

type Story = StoryObj<typeof DataTable<Payment>>;

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

const createData = (n: number): Payment[] => {
  return range(n).map((i) => ({
    amount: faker.number.int({ max: 100, min: 0 }),
    email: faker.internet.email(),
    id: String(i + 1),
    status: faker.helpers.arrayElement(statuses)
  }));
};

const Toggles = () => {
  const table = useDataTableHandle('table', true);
  const columns = table.getAllColumns();
  const statusColumn = columns.find((column) => column.id === 'status')!;

  const filterValue = statusColumn.getFilterValue() as PaymentStatus[];

  return (
    <>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button className="flex items-center gap-2" variant="outline">
            Columns
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          {columns
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenu.CheckboxItem
                  checked={column.getIsVisible()}
                  className="capitalize"
                  key={column.id}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenu.CheckboxItem>
              );
            })}
        </DropdownMenu.Content>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button className="flex items-center gap-2" variant="outline">
            Filters
            <ChevronDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content widthFull align="start">
          {statuses.map((option) => (
            <DropdownMenu.CheckboxItem
              checked={filterValue.includes(option)}
              className="capitalize"
              key={option}
              onCheckedChange={(checked) => {
                statusColumn.setFilterValue((prevValue: PaymentStatus[]) => {
                  if (checked) {
                    return [...prevValue, option];
                  }
                  return prevValue.filter((item) => item !== option);
                });
              }}
            >
              {option}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu>
    </>
  );
};

export default {
  component: DataTable
} as Meta<typeof DataTable>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [tableData, setTableData] = useState(createData(10));
      return (
        <div>
          <Story
            args={{
              columns,
              data: tableData
            }}
          />
          <div className="fixed bottom-0 py-2">
            <button
              className="rounded-md border px-2 py-1.5 text-sm"
              type="button"
              onClick={() => setTableData(createData(10))}
            >
              New Data
            </button>
          </div>
        </div>
      );
    }
  ]
};

export const WithActions: Story = {
  args: {
    columns: [
      ...columns,
      {
        accessorKey: 'notes',
        header: 'Notes'
      }
    ],
    data: createData(100).map((payment) => ({ ...payment, notes: faker.lorem.paragraph() })),
    rowActions: [
      {
        label: 'Modify',
        onSelect: () => {
          alert('Modify');
        }
      },
      {
        destructive: true,
        label: 'Delete',
        onSelect: () => {
          alert('Delete');
        }
      }
    ],
    tableName: 'action-table'
  }
};

export const WithToggles: Story = {
  args: {
    columns,
    data: createData(100),
    initialState: {
      columnFilters: [
        {
          id: 'status',
          value: [...statuses]
        }
      ]
    },
    togglesComponent: Toggles
  }
};

export const Empty: Story = {
  args: {
    columns,
    data: []
  }
};

export const Grouped: Story = {
  args: {
    columns: [
      {
        columns: [
          {
            accessorKey: 'id',
            header: 'ID'
          },
          {
            accessorKey: 'status',
            header: 'Status'
          }
        ],
        header: 'Internal'
      },
      {
        columns: [
          {
            accessorKey: 'email',
            header: 'Email'
          },
          {
            accessorKey: 'amount',
            header: 'Amount'
          }
        ],
        header: 'Details'
      }
    ],
    data: createData(100)
  }
};
