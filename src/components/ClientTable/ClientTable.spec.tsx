import { range } from '@douglasneuroinformatics/libjs';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ClientTable } from './ClientTable';

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
