import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { LegacySlider } from './LegacySlider.js';

type Story = StoryObj<typeof LegacySlider>;

export default { component: LegacySlider } satisfies Meta<typeof LegacySlider>;

export const Default: Story = {
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);
      return (
        <>
          <div className="fixed inset-0 w-full bg-slate-200 dark:bg-slate-800">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Open
            </button>
          </div>
          <Story
            args={{
              children: (
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt suscipit vero qui optio explicabo
                    autem eaque, voluptatem dolore nulla, perspiciatis soluta quaerat similique magni amet at quae fuga
                    fugit laborum.
                  </p>
                </div>
              ),
              isOpen,
              setIsOpen,
              title: 'Example'
            }}
          />
        </>
      );
    }
  ]
};
