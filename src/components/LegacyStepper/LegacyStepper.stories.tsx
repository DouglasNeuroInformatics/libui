import React from 'react';

import { FaceSmileIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';

import { useLegacyStepper } from '../../hooks/useLegacyStepper.js';
import { Button } from '../Button/Button.js';
import { LegacyStepper, type Step } from './LegacyStepper.js';

type Story = StoryObj<typeof LegacyStepper>;

const meta: Meta<typeof LegacyStepper> = { component: LegacyStepper };

export default meta;

const MockStep: React.FC<{ step: number }> = ({ step }) => {
  const { updateIndex } = useLegacyStepper();
  return (
    <div>
      <h1 className="text-lg font-medium">Step {step}</h1>
      <p className="my-3 text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde necessitatibus accusantium mollitia, odit
        voluptates veritatis cupiditate eum quod dolore culpa enim reprehenderit et, suscipit aut possimus placeat
        laudantium. Earum dicta totam laudantium, sed voluptate labore neque hic sit molestiae quia soluta consectetur
        ipsam officiis, temporibus debitis nam distinctio minima cupiditate!
      </p>
      <div className="flex gap-x-3">
        <Button label="Previous Step" onClick={() => updateIndex('decrement')} />
        <Button label="Next Step" onClick={() => updateIndex('increment')} />
      </div>
    </div>
  );
};

const steps: Step[] = [];
for (let i = 1; i < 4; i++) {
  steps.push({
    element: <MockStep step={i} />,
    icon: <FaceSmileIcon />,
    label: 'Step Number ' + i
  });
}

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <div className="mx-auto max-w-3xl">
          <Story args={{ steps }} />
        </div>
      );
    }
  ]
};
