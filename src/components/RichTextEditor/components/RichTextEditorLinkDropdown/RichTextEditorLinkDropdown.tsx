import {
	FloatingPortal,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react';
import type { Editor } from '@tiptap/react';
import clsx from 'clsx';
import { type FunctionComponent, type KeyboardEvent, useState } from 'react';
import CrossIcon from '../../icons/cross.svg?react';
import LinkIcon from '../../icons/link.svg?react';

interface RichTextEditorLinkDropdownProps {
	editor: Editor | null;
	root: string;
	isDisabled: boolean;
}

export const RichTextEditorLinkDropdown: FunctionComponent<RichTextEditorLinkDropdownProps> = ({
	editor,
	root,
	isDisabled,
}) => {
	const [open, setOpen] = useState(false);
	const [linkUrl, setLinkUrl] = useState('');
	const [openInNewTab, setOpenInNewTab] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: (nextOpen) => {
			if (nextOpen) {
				setLinkUrl((editor?.getAttributes('link').href as string) || '');
				const target = editor?.getAttributes('link').target as string | undefined;
				setOpenInNewTab(target === '_blank');
			}
			setOpen(nextOpen);
		},
		middleware: [offset(6), flip(), shift({ padding: 8 })],
		placement: 'bottom',
	});

	const click = useClick(context, { enabled: !isDisabled });
	const dismiss = useDismiss(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	const isActive = !!editor?.isActive('link');

	const applyLink = () => {
		if (!editor) return;
		const href = linkUrl.trim();
		if (href) {
			editor
				.chain()
				.focus()
				.extendMarkRange('link')
				.setLink({ href, target: openInNewTab ? '_blank' : '_self' })
				.run();
		} else {
			editor.chain().focus().unsetLink().run();
		}
		setOpen(false);
	};

	const removeLink = () => {
		editor?.chain().focus().unsetLink().run();
		setOpen(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			applyLink();
		}
		if (e.key === 'Escape') {
			e.preventDefault();
			setOpen(false);
		}
	};

	return (
		<>
			<button
				ref={refs.setReference}
				type="button"
				className={isActive || open ? 'is-active' : undefined}
				title="Link invoegen"
				disabled={isDisabled}
				{...getReferenceProps()}
			>
				<LinkIcon />
			</button>
			{open && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className={`${root}__link-popup`}
						{...getFloatingProps()}
					>
						<input
							// biome-ignore lint/a11y/noAutofocus: handy to auto focus when dialog is opened
							autoFocus
							type="url"
							value={linkUrl}
							onChange={(e) => setLinkUrl(e.target.value)}
							placeholder="Link URL invoeren"
							onKeyDown={handleKeyDown}
						/>
						<div className={`${root}__link-popup-toggle`}>
							<span
								className={clsx(`${root}__link-popup-switch`, { 'is-on': openInNewTab })}
								onClick={() => setOpenInNewTab((prev) => !prev)}
								role="switch"
								aria-checked={openInNewTab}
								tabIndex={0}
								onKeyDown={(e) => {
									if (e.key === ' ' || e.key === 'Enter') setOpenInNewTab((prev) => !prev);
								}}
							/>
							Openen in een nieuw venster
						</div>
						<div className={`${root}__link-popup-footer`}>
							<button type="button" className={`${root}__link-popup-delete`} onClick={removeLink}>
								<CrossIcon />
								Verwijder link
							</button>
							<div>
								<button type="button" onClick={() => setOpen(false)}>
									Annuleer
								</button>
								<button type="button" className={`${root}__link-popup-confirm`} onClick={applyLink}>
									Bevestig
								</button>
							</div>
						</div>
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
