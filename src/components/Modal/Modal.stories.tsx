import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Modal from './Modal';

const meta: Meta<typeof Modal> = {
	title: 'Components/Modal',
	component: Modal,
};
export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTemplate = (args: any) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<div>
			<button type="button" onClick={() => setOpen(true)}>
				clickHereToToggle: {String(isOpen)}
			</button>
			<Modal
				{...args}
				onClose={() => {
					args.onClose?.();
					setOpen(false);
				}}
				isOpen={isOpen}
			/>
		</div>
	);
};

export const Primary: Story = {
	args: {
		title: 'The quick brown fox jumps over the lazy dog',
		children: (
			<>
				<div style={{ padding: '32px' }}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consectetur, leo
						vitae mattis sodales, eros erat fermentum nisl, quis bibendum dui nibh ut ligula. Duis
						tempus elit quis augue interdum, at dictum mi auctor. Nunc lobortis lacus in eleifend
						aliquam. Cras non maximus nibh, sit amet rutrum dolor. Nunc ultrices augue ac felis
						imperdiet commodo. Nunc eu lacinia augue. Interdum et malesuada fames ac ante ipsum
						primis in faucibus. Vestibulum ultrices sem vitae vulputate cursus. Nunc vitae nisl
						pharetra, volutpat tellus non, elementum ante. Integer tempus aliquam lorem. Nulla vel
						dolor orci. Nullam id leo eu massa semper mattis.
					</p>

					<p>
						Curabitur vitae molestie nisi, congue condimentum ante. Nam non molestie augue, a
						vehicula elit. Integer solicitudin odio sit amet eleifend bibendum. Duis convallis orci
						quis enim condimentum posuere. Ut ut tortor euismod, convallis leo eget, tristique nunc.
						Phasellus vitae justo ipsum. Sed malesuada, leo nec ultrices porta, orci massa iaculis
						ligula, ac luctus ligula velit at nibh. Vestibulum tempus mollis efficitur. Praesent
						malesuada dictum neque, interdum fringilla nisi. Orci varius natoque penatibus et magnis
						dis parturient montes, nascetur ridiculus mus.{' '}
					</p>

					<button type="button">A dynamic button</button>
				</div>
			</>
		),
	},
	render: ModalTemplate,
};

export const WithFooter: Story = {
	args: {
		...Primary.args,
		footer: (
			<div style={{ padding: '12px', background: '#eee' }}>
				<span>Static text</span>
			</div>
		),
	},
	render: ModalTemplate,
};

export const CustomHeading: Story = {
	args: {
		...WithFooter.args,
		heading: (
			<div
				style={{
					background: 'gold',
					alignSelf: 'center',
					justifySelf: 'center',
					width: '100%',
					textAlign: 'center',
					lineHeight: '24px',
				}}
			>
				<span>Custom header</span>
			</div>
		),
	},
	render: ModalTemplate,
};
