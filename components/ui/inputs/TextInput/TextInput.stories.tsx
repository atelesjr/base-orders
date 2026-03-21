import type { Meta, StoryObj } from '@storybook/nextjs';
import TextInput from './index';

const meta: Meta<typeof TextInput> = {
	title: 'UI/Inputs/TextInput',
	component: TextInput,
	args: {
		placeholder: 'Digite o instrumento',
	},
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Instrumento',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: 'PETR4',
	},
};

export const Invalid: Story = {
	args: {
		errorMessage: 'Campo obrigatorio',
		invalid: true,
		label: 'Instrumento',
		value: 'Entrada invalida',
	},
};
