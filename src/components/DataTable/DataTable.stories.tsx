import { range, toBasicISOString } from '@douglasneuroinformatics/libjs';
import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react';

import { DataTable } from './DataTable';

import type { DataTableColumn } from './DataTable';

type User = {
  birthday: Date;
  email: string;
  firstName: string;
  lastName: string;
};

type Story = StoryObj<typeof DataTable<User>>;

const columns: DataTableColumn<User>[] = [
  {
    format: (value) => {
      return toBasicISOString(value);
    },
    key: 'birthday',
    label: 'Birthday'
  },
  {
    format: 'email',
    key: 'email',
    label: 'Email',
    sortable: true
  }
];

const data: User[] = range(60)
  .unwrap()
  .map(() => ({
    birthday: faker.date.birthdate(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName()
  }));

export default { component: DataTable } as Meta<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    columns,
    data,
    headerActions: [
      {
        label: 'Do Something',
        onClick: () => {
          alert('Something!');
        }
      }
    ],
    rowActions: [
      {
        destructive: true,
        label: 'Delete',
        onSelect: (row) => {
          alert(`Delete User: ${row.firstName} ${row.lastName}`);
        }
      }
    ],
    search: {
      key: 'email',
      placeholder: 'Filter emails...'
    }
  }
};

export const Empty: Story = {
  args: {
    columns,
    data: []
  }
};
