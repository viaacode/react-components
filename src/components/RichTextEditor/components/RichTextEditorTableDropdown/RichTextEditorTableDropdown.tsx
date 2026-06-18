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
import type { FunctionComponent, ReactNode } from 'react';
import { useState } from 'react';
import TableIcon from '../../icons/table.svg?react';
import TableColAddIcon from '../../icons/table-col-add.svg?react';
import TableColDeleteIcon from '../../icons/table-col-delete.svg?react';
import TableDeleteIcon from '../../icons/table-delete.svg?react';
import TableRowAddIcon from '../../icons/table-row-add.svg?react';
import TableRowDeleteIcon from '../../icons/table-row-delete.svg?react';

interface RichTextEditorTableDropdownProps {
	editor: Editor | null;
	root: string;
	isDisabled: boolean;
}

interface TableAction {
	label: string;
	icon: ReactNode;
	onClick: (editor: Editor) => void;
	onlyWhenActive?: boolean;
}

const TABLE_ACTIONS: TableAction[] = [
	{
		label: 'Tabel invoegen',
		icon: <TableIcon />,
		onClick: (editor) =>
			editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
	},
	{
		label: 'Voeg rij in',
		icon: <TableRowAddIcon />,
		onClick: (editor) => editor.chain().focus().addRowAfter().run(),
		onlyWhenActive: true,
	},
	{
		label: 'Verwijder rij',
		icon: <TableRowDeleteIcon />,
		onClick: (editor) => editor.chain().focus().deleteRow().run(),
		onlyWhenActive: true,
	},
	{
		label: 'Voeg kolom in',
		icon: <TableColAddIcon />,
		onClick: (editor) => editor.chain().focus().addColumnAfter().run(),
		onlyWhenActive: true,
	},
	{
		label: 'Verwijder kolom',
		icon: <TableColDeleteIcon />,
		onClick: (editor) => editor.chain().focus().deleteColumn().run(),
		onlyWhenActive: true,
	},
	{
		label: 'Verwijder tabel',
		icon: <TableDeleteIcon />,
		onClick: (editor) => editor.chain().focus().deleteTable().run(),
		onlyWhenActive: true,
	},
];

export const RichTextEditorTableDropdown: FunctionComponent<RichTextEditorTableDropdownProps> = ({
	editor,
	root,
	isDisabled,
}) => {
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

	const isTableActive = !!editor?.isActive('table');

	const visibleActions = TABLE_ACTIONS.filter((action) => !action.onlyWhenActive || isTableActive);

	return (
		<>
			<button
				ref={refs.setReference}
				type="button"
				className={isTableActive || open ? 'is-active' : undefined}
				title="Tabel"
				disabled={isDisabled}
				{...getReferenceProps()}
			>
				<TableIcon />
			</button>
			{open && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className={`${root}__table-popup`}
						{...getFloatingProps()}
					>
						{visibleActions.map((action) => (
							<button
								key={action.label}
								type="button"
								className={`${root}__table-option`}
								onClick={() => {
									if (editor) {
										action.onClick(editor);
									}
									setOpen(false);
								}}
							>
									<span className={`${root}__table-option-icon`}>{action.icon}</span>
									{action.label}
								</button>
							))}
					</div>
				</FloatingPortal>
			)}
		</>
	);
};
