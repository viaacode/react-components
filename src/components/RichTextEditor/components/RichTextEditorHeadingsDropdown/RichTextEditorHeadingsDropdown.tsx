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
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import type { Heading } from '../../RichTextEditor.types';

interface RichTextEditorHeadingsDropdownProps {
	editor: Editor | null;
	root: string;
	isDisabled: boolean;
	resolvedHeadings: Heading[];
	activeHeading: Heading;
}

const HEADING_LABELS: Record<Heading, string> = {
	h1: 'Koptekst 1',
	h2: 'Koptekst 2',
	h3: 'Koptekst 3',
	h4: 'Koptekst 4',
	h5: 'Koptekst 5',
	h6: 'Koptekst 6',
	normal: 'Normaal',
};

export const RichTextEditorHeadingsDropdown: FunctionComponent<
	RichTextEditorHeadingsDropdownProps
> = ({ editor, root, isDisabled, resolvedHeadings, activeHeading }) => {
	const [open, setOpen] = useState(false);

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		middleware: [offset(6), flip(), shift({ padding: 8 })],
		placement: 'bottom',
	});

	const click = useClick(context, { enabled: !isDisabled });
	const dismiss = useDismiss(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	const handleSelect = (heading: Heading) => {
		if (!editor) return;
		if (heading === 'normal') {
			editor.chain().focus().setParagraph().run();
		} else {
			editor
				.chain()
				.focus()
				.setHeading({
					level: Number.parseInt(heading.replace('h', ''), 10) as 1 | 2 | 3 | 4 | 5 | 6,
				})
				.run();
		}
		setOpen(false);
	};

	return (
		<>
			<button
				ref={refs.setReference}
				type="button"
				className={`${root}__headings-trigger${open ? ' is-active' : ''}`}
				disabled={isDisabled}
				title="Koptekst"
				{...getReferenceProps()}
			>
				{HEADING_LABELS[activeHeading]}
				<span className={`${root}__headings-chevron`}>▾</span>
			</button>
			{open && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className={`${root}__headings-popup`}
						{...getFloatingProps()}
					>
						{resolvedHeadings.map((heading) => (
							<button
								key={heading}
								type="button"
								className={`${root}__headings-option ${root}__headings-option--${heading}${activeHeading === heading ? ' is-active' : ''}`}
								onClick={() => handleSelect(heading)}
							>
								{HEADING_LABELS[heading]}
							</button>
						))}
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
