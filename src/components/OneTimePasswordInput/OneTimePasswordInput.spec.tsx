import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OneTimePasswordInput } from './OneTimePasswordInput.tsx';

type Props = React.ComponentPropsWithoutRef<typeof OneTimePasswordInput>;

const TEST_ID = 'OneTimePasswordInput';

const TestOneTimePasswordInput: React.FC<Partial<Props>> = (props) => {
  return <OneTimePasswordInput data-testid={TEST_ID} {...(props as Props)} />;
};

describe('OneTimePasswordInput', () => {
  it('should render', () => {
    render(<TestOneTimePasswordInput />);
    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });
});
