import { range } from '@douglasneuroinformatics/libjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ClientTable } from './ClientTable';
import { type ClientTableColumn } from './ClientTable';

type ExampleItem = {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  c5: number;
  c6: number;
  c7: number;
  c8: number;
  c9: number;
  c10: number;
  c11: number;
  c12: number;
  c13: number;
  c14: number;
  c15: number;
  id: string;
};

const columns: ClientTableColumn<ExampleItem>[] = [
  {
    field: 'id',
    label: 'ID'
  }
];

for (let i = 1; i < 16; i++) {
  columns.push({
    field: `c${i}` as keyof ExampleItem,
    label: `Column ${i}`
  });
}

const TEST_ID = 'ClientTable';

describe('ClientTable', () => {
  it('should render', () => {
    render(
      <ClientTable
        columnDropdownOptions={[
          {
            label: 'Delete',
            onSelection: (column) => {
              return column.label;
            }
          }
        ]}
        columns={[
          {
            field: 'f1',
            label: 'Field 1'
          },
          {
            field: 'f2',
            label: 'Field 2'
          },
          {
            field: 'f3',
            label: 'Field 3'
          }
        ]}
        data={[
          {
            f1: 1,
            f2: range(1000).join(', '),
            f3: 3
          }
        ]}
        minRows={10}
        noWrap={true}
        onEntryClick={(entry) => {
          return entry;
        }}
      />
    );
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
