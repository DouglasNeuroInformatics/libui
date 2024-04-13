import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion } from './Accordion.js';

const TEST_ID = 'accordion';

const TestAccordion = () => (
  <Accordion collapsible type="single">
    <Accordion.Item value="item-1">
      <Accordion.Trigger>T1</Accordion.Trigger>
      <Accordion.Content>C1</Accordion.Content>
    </Accordion.Item>
  </Accordion>
);

describe('Accordion', () => {
  it('should render', () => {
    render(<TestAccordion />);
    expect(screen.getByTestId(TEST_ID)).toBeDefined();
  });
  it('should open and close an item', () => {
    render(<TestAccordion />);

    const toggle = screen.getByText('T1');
    expect(toggle).toBeInTheDocument();
    expect(() => screen.getByText('C1')).toThrow();

    fireEvent.click(toggle);
    expect(screen.getByText('C1')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(() => screen.getByText('C1')).toThrow();
  });
});
