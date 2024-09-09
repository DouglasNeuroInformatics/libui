import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { Select } from '../Select';
import { Card } from './Card';

type Story = StoryObj<typeof Card>;

export default {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Create project</Card.Title>
          <Card.Description>Deploy your new project in one-click.</Card.Description>
        </Card.Header>
        <Card.Content>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <Select.Trigger id="framework">
                    <Select.Value placeholder="Select" />
                  </Select.Trigger>
                  <Select.Content position="popper">
                    <Select.Item value="next">Next.js</Select.Item>
                    <Select.Item value="sveltekit">SvelteKit</Select.Item>
                    <Select.Item value="astro">Astro</Select.Item>
                    <Select.Item value="nuxt">Nuxt.js</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            </div>
          </form>
        </Card.Content>
        <Card.Footer className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </Card.Footer>
      </>
    )
  },
  component: Card,
  tags: ['autodocs']
} as Meta<typeof Card>;

export const Default: Story = {};
