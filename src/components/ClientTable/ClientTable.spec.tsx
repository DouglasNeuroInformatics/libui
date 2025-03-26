import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ClientTable } from './ClientTable';

const TEST_ID = 'ClientTable';
const FIRST_BUTTON_ID = 'first-page-button';
const PREVIOUS_BUTTON_ID = 'previous-page-button';
const NEXT_BUTTON_ID = 'next-page-button';
const LAST_BUTTON_ID = 'last-page-button';
const PAGE_NUMBER_TEST_ID = 'page-numbers';
describe('ClientTable', () => {
  it('should render', () => {
    render(<ClientTable columns={[]} data={[]} minRows={10} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_BUTTON_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PREVIOUS_BUTTON_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NEXT_BUTTON_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LAST_BUTTON_ID)).toBeInTheDocument();
  });
  it('should contain a custom class name', () => {
    render(<ClientTable className="foo" columns={[]} data={[]} minRows={10} />);
    expect(screen.getByTestId(TEST_ID)).toHaveClass('foo');
  });
  it('should function correctly', async () => {
    const handleClientTableItemClick = vi.fn();
    const handleClientTableDropdownClick = vi.fn();
    render(
      <ClientTable
        columnDropdownOptions={[
          {
            label: 'delete',
            onSelection: handleClientTableDropdownClick
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
          }
        ]}
        data={[
          {
            f1: 1,
            f2: 2
          },
          {
            f1: 23,
            f2: 24
          }
        ]}
        entriesPerPage={1}
        minRows={3}
        onEntryClick={handleClientTableItemClick}
      />
    );
    expect(screen.getByTestId(PAGE_NUMBER_TEST_ID)).toBeInTheDocument();
    await userEvent.click(screen.getByTestId(NEXT_BUTTON_ID));
    await userEvent.click(await screen.findByText('23.00'));
    expect(handleClientTableItemClick).toBeCalled();

    expect(screen.getByTestId(PAGE_NUMBER_TEST_ID).textContent).toBe('2 - 2 / 2');
    await userEvent.click(screen.getByTestId(PREVIOUS_BUTTON_ID));
    await userEvent.click(await screen.findByText('1.00'));
    expect(handleClientTableItemClick).toBeCalled();

    expect(screen.getByTestId(PAGE_NUMBER_TEST_ID).textContent).toBe('1 - 1 / 2');
    await userEvent.click(screen.getByTestId(LAST_BUTTON_ID));
    await userEvent.click(await screen.findByText('23.00'));
    expect(handleClientTableItemClick).toBeCalled();

    expect(screen.getByTestId(PAGE_NUMBER_TEST_ID).textContent).toBe('2 - 2 / 2');
    await userEvent.click(screen.getByTestId(FIRST_BUTTON_ID));
    await userEvent.click(await screen.findByText('1.00'));
    expect(handleClientTableItemClick).toBeCalled();
    expect(screen.getByTestId(PAGE_NUMBER_TEST_ID).textContent).toBe('1 - 1 / 2');

    await userEvent.click(await screen.findByText('Field 1'));
    await userEvent.click(screen.getByTestId('delete-test-id'));
    expect(handleClientTableDropdownClick).toBeCalled();
  });
});
