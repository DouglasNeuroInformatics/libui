import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ClientTable } from './ClientTable';

const TEST_ID = 'ClientTable';
const FIRST_BUTTON_ID = 'first-page-button';
const PREVIOUS_BUTTON_ID = 'previous-page-button';
const NEXT_BUTTON_ID = 'next-page-button';
const LAST_BUTTON_ID = 'last-page-button';

describe('ClientTable', () => {
  it('should render', () => {
    render(<ClientTable columns={[]} data={[]} minRows={10} noWrap={true} />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(FIRST_BUTTON_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PREVIOUS_BUTTON_ID)).toBeInTheDocument();
    expect(screen.getByTestId(NEXT_BUTTON_ID)).toBeInTheDocument();
    expect(screen.getByTestId(LAST_BUTTON_ID)).toBeInTheDocument();
  });
});
