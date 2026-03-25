import type { Meta, StoryObj } from '@storybook/nextjs';
import SelectInput from './index';

const options = [
	{ label: 'Todos', value: '' },
	{ label: 'Compra', value: 'Compra' },
	{ label: 'Venda', value: 'Venda' },
];

const meta: Meta<typeof SelectInput> = {
	title: 'UI/Inputs/SelectInput',
	component: SelectInput,
	args: {
		options,
	},
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Lado',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: 'Compra',
	},
};

export const Invalid: Story = {
	args: {
		errorMessage: 'Campo obrigatorio',
		invalid: true,
		label: 'Lado',
		value: '',
	},
};

export const Composed: Story = {
	render: (args) => (
		<SelectInput.Root {...args}>
			<SelectInput.Label />
			<SelectInput.Trigger />
			<SelectInput.Menu />
			<SelectInput.Error />
		</SelectInput.Root>
	),
	args: {
		label: 'Lado',
		errorMessage: 'Campo obrigatorio',
		invalid: true,
		value: 'Compra',
	},
};
