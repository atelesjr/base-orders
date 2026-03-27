import type { Meta, StoryObj } from '@storybook/nextjs';
import ButtonIcon from './index';

const meta: Meta<typeof ButtonIcon> = {
	title: 'UI/Buttons/ButtonIcon',
	component: ButtonIcon,
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const WithLabel: Story = {
	args: {
		iconSrc: '/assets/add_box_60dp.svg',
		iconAlt: 'Criar ordem',
		label: 'Criar ordem',
		variant: 'primary',
		size: 'md',
	},
};

export const IconOnly: Story = {
	args: {
		'aria-label': 'Filtrar ordens',
		iconSrc: '/assets/filter_list_60dp.svg',
		iconAlt: 'Filtrar ordens',
		variant: 'secondary',
		size: 'sm',
	},
};
