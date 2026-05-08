import { useMemo, useState } from 'react';

import { toBasicISOString } from '@douglasneuroinformatics/libjs';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef, PaginationState, SortingState } from '@tanstack/table-core';
import { range } from 'lodash-es';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '../Button/Button.tsx';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.tsx';
import { DataTable } from './DataTable.tsx';
import { useDataTableHandle } from './hooks.ts';

type PaymentStatus = 'failed' | 'pending' | 'processing' | 'success';

type Payment = {
  amount: number;
  date: Date;
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
    date: faker.date.recent(),
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

export default { component: DataTable } as Meta<typeof DataTable>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [tableData, setTableData] = useState(createData(100));
      return (
        <div>
          <Story
            args={{
              columns,
              data: tableData,
              onRowDoubleClick(row) {
                alert(`row with email ${row.email} double clicked`);
              }
            }}
          />
          <div className="fixed bottom-0 py-2">
            <button
              className="rounded-md border px-2 py-1.5 text-sm"
              type="button"
              onClick={() => setTableData(createData(100))}
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
    onRowDoubleClick(row) {
      alert(`row with email ${row.email} double clicked`);
    },
    onSearchChange: () => {
      return;
    },
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
    onSearchChange: () => {
      return;
    },
    togglesComponent: Toggles
  }
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    onSearchChange: () => {
      return;
    }
  }
};

export const Grouped: Story = {
  args: {
    columns: [
      {
        accessorFn: (row) => toBasicISOString(row.date),
        header: 'Date',
        id: 'date'
      },
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
        enableResizing: false,
        header: 'Internal',
        meta: {
          centered: true
        }
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
        enableResizing: false,
        header: 'Details',
        meta: {
          centered: true
        }
      }
    ],
    data: createData(100),
    initialState: {
      columnPinning: {
        left: ['date']
      }
    },
    onRowDoubleClick(row) {
      alert(`row with ID ${row.id} double clicked`);
    },
    onSearchChange: () => {
      return;
    },
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
    ]
  }
};

export const Server: Story = {
  decorators: [
    (Story) => {
      const allServerData = useMemo<Payment[]>(() => {
        return range(100).map((i) => ({
          amount: faker.number.int({ max: 100, min: 0 }),
          date: faker.date.recent(),
          email: faker.internet.email(),
          id: String(i + 1),
          status: faker.helpers.arrayElement(statuses)
        }));
      }, []);

      const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
      const [sorting, setSorting] = useState<SortingState>([]);

      const sortedData = useMemo(() => {
        if (!sorting.length) {
          return allServerData;
        }
        const { desc, id } = sorting[0]!;
        return [...allServerData].sort((a, b) => {
          const aVal = a[id as keyof Payment];
          const bVal = b[id as keyof Payment];
          if (aVal < bVal) {
            return desc ? 1 : -1;
          } else if (aVal > bVal) {
            return desc ? -1 : 1;
          }
          return 0;
        });
      }, [allServerData, sorting]);

      const pageData = sortedData.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize
      );

      return (
        <Story
          args={{
            columns,
            data: pageData,
            mode: 'server',
            onPaginationChange: setPagination,
            onSortingChange: setSorting,
            pageCount: Math.ceil(allServerData.length / pagination.pageSize)
          }}
        />
      );
    }
  ]
};
