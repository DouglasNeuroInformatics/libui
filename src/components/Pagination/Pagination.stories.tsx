import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination.js';

type Story = StoryObj<typeof Pagination>;

export default {
  args: {
    children: (
      <>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous href="#" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">1</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link isActive href="#">
              2
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link href="#">3</Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next href="#" />
          </Pagination.Item>
        </Pagination.Content>
      </>
    )
  },
  component: Pagination
} as Meta<typeof Pagination>;

export const Default: Story = {};
