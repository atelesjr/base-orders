import type { Meta, StoryObj } from '@storybook/nextjs';
import DatePickerInput from './index';

const meta: Meta<typeof DatePickerInput> = {
	title: 'UI/Inputs/DatePickerInput',
	component: DatePickerInput,
	args: {
		'aria-label': 'Data',
	},
};

export default meta;
type Story = StoryObj<typeof DatePickerInput>;

export const Default: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Data',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		label: 'Data',
		value: '2026-03-25',
	},
};

export const Invalid: Story = {
	args: {
		errorMessage: 'Campo obrigatório',
		invalid: true,
		label: 'Data',
		value: '',
	},
};

export const Composed: Story = {
	render: (args) => (
		<DatePickerInput.Root {...args}>
			<DatePickerInput.Label />
			<DatePickerInput.Trigger />
			<DatePickerInput.Popover />
			<DatePickerInput.Error />
		</DatePickerInput.Root>
	),
	args: {
		label: 'Data',
		errorMessage: 'Campo obrigatório',
		invalid: true,
	},
};
