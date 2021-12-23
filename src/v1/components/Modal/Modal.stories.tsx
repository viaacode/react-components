import { storiesOf } from '@storybook/react';
import { loremIpsum } from 'lorem-ipsum';
import React, { cloneElement, Fragment, ReactElement, useState } from 'react';

import { Button } from '../Button/Button';

import { Modal } from './Modal';
import { ModalBody, ModalFooterLeft, ModalFooterRight } from './Modal.slots';

const ModalStoryComponent = ({ children }: { children: ReactElement }) => {
	const [isOpen, setOpen] = useState(false);

	const childrenWithProps = cloneElement(children, { isOpen, onClose: () => setOpen(false) });

	return (
		<Fragment>
			<Button onClick={() => setOpen(true)} label="Open modal" ariaLabel="Open modal" />
			{childrenWithProps}
		</Fragment>
	);
};

const dummyText =
	"It doesn't matter where this modal occurs in the source code, React automatically moves it to the root.";

storiesOf('v1/components/Modal', module)
	.addParameters({ jest: ['Modal', 'ModalBackdrop'] })
	.add('Modal', () => (
		<ModalStoryComponent>
			<Modal title="Modal title" isOpen={false}>
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterLeft>
					<Button type="secondary" label="Cancel" ariaLabel="Cancel" />
				</ModalFooterLeft>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Small modal', () => (
		<ModalStoryComponent>
			<Modal isOpen title="Modal title" size="small">
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Medium modal', () => (
		<ModalStoryComponent>
			<Modal isOpen title="Modal title" size="medium">
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Large modal', () => (
		<ModalStoryComponent>
			<Modal isOpen title="Modal title" size="large">
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Extra large modal', () => (
		<ModalStoryComponent>
			<Modal isOpen title="Modal title" size="extra-large">
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Wide title modal', () => (
		<Modal isOpen title={loremIpsum({ count: 2 })} size="small">
			<ModalBody>
				<p>{loremIpsum({ count: 5 })}</p>
			</ModalBody>
			<ModalFooterRight>
				<Button type="primary" label="Ok" ariaLabel="Ok" />
			</ModalFooterRight>
		</Modal>
	))
	.add('Fullscreen modal', () => (
		<ModalStoryComponent>
			<Modal isOpen title="Modal title" size="fullscreen">
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Auto-height modal', () => (
		<ModalStoryComponent>
			<Modal isOpen title="Modal title" size="auto">
				<ModalBody>
					<p>{dummyText}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	))
	.add('Scrollable modal', () => (
		<>
			<ModalStoryComponent>
				<Modal isOpen title="Modal title" size="small" scrollable>
					<ModalBody>
						<p>{loremIpsum({ count: 40 })}</p>
					</ModalBody>
					<ModalFooterRight>
						<Button type="primary" label="Ok" ariaLabel="Ok" />
					</ModalFooterRight>
				</Modal>
			</ModalStoryComponent>
			<br />
			<br />
			<div style={{ maxWidth: '200px' }}>{loremIpsum({ count: 40 })}</div>
		</>
	))
	.add('Headless modal', () => (
		<ModalStoryComponent>
			<Modal isOpen size="small" scrollable>
				<ModalBody>
					<p>{loremIpsum({ count: 40 })}</p>
				</ModalBody>
				<ModalFooterRight>
					<Button type="primary" label="Ok" ariaLabel="Ok" />
				</ModalFooterRight>
			</Modal>
		</ModalStoryComponent>
	));
