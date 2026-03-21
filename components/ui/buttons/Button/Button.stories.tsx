import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './index';

const meta: Meta<typeof Button> = {
	title: 'UI/Buttons/Button',
	component: Button,
	args: {
		children: 'Criar ordem',
		variant: 'primary',
		size: 'md',
		width: 'auto',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = {
	args: {
		children: 'Cancelar',
		variant: 'secondary',
	},
};

export const Large: Story = {
	args: {
		children: 'Enviar ordem',
		size: 'lg',
	},
};

export const FullWidth: Story = {
	args: {
		children: 'Confirmar',
		width: 'full',
	},
};
