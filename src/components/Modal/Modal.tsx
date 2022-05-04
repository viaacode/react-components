import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { bemCls, getVariantClasses } from '../../utils';
import { Button } from '../Button';

import { MODAL_CLOSE_ICON } from './Modal.const';
import { ModalProps } from './Modal.types';

const Modal: FC<ModalProps> = ({
	children,
	className,
	closeButtonProps = { icon: MODAL_CLOSE_ICON },
	footer,
	heading,
	isOpen,
	rootClassName: root = 'c-modal',
	overlayStyle,
	title,
	variants,
	onClose,
	onOpen,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants));

	const [ready, setReady] = useState(false);

	// See https://github.com/reactjs/react-modal#examples
	useEffect(() => {
		const root = document.body;

		if (root) {
			ReactModal.setAppElement(root);
			setReady(true);
		}
	}, []);

	return (
		<ReactModal
			isOpen={ready && !!isOpen}
			overlayClassName={bem('overlay')}
			className={rootCls}
			shouldCloseOnEsc
			shouldCloseOnOverlayClick
			onRequestClose={onClose}
			overlayElement={(props, contentElement) => (
				<div {...props} className={bem('overlay')} style={overlayStyle}>
					{contentElement}
				</div>
			)}
			onAfterOpen={onOpen}
		>
			<section className={bem('heading')}>
				<div className={bem('title-wrapper')}>
					{heading || <h3 className={bem('title')}>{title}</h3>}
				</div>

				<div className={bem('close-wrapper')}>
					<Button className={bem('close')} {...closeButtonProps} onClick={onClose} />
				</div>
			</section>

			<section className={bem('content')}>{children}</section>
			{footer ? <section className={bem('footer')}>{footer}</section> : null}
		</ReactModal>
	);
};

export default Modal;
