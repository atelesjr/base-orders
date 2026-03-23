import type { Meta, StoryObj } from '@storybook/nextjs';
import RadioInput from './index';

const meta: Meta<typeof RadioInput> = {
	title: 'UI/Inputs/RadioInput',
	component: RadioInput,
	args: {
		label: 'Lado',
		name: 'order-side',
		options: [
			{ label: 'Compra', value: 'Compra' },
			{ label: 'Venda', value: 'Venda' },
		],
	},
};

export default meta;
type Story = StoryObj<typeof RadioInput>;

export const Default: Story = {};

export const Invalid: Story = {
	args: {
		errorMessage: 'Selecione uma opção',
		invalid: true,
	},
};

export const MultipleOptions: Story = {
	args: {
		options: [
			{ label: 'Compra', value: 'Compra' },
			{ label: 'Venda', value: 'Venda' },
			{ label: 'Troca', value: 'Troca' },
		],
	},
};
