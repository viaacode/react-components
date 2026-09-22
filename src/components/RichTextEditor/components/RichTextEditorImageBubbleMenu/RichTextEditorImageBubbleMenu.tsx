import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import type { FunctionComponent, ReactNode } from 'react';
import { useCallback } from 'react';
import type { RichTextEditorImageAlign } from '../../extensions/RichTextEditorImage';
import AlignCenterIcon from '../../icons/align-center.svg?react';
import AlignLeftIcon from '../../icons/align-left.svg?react';
import AlignRightIcon from '../../icons/align-right.svg?react';
import ImageFloatLeftIcon from '../../icons/image-float-left.svg?react';
import ImageFloatRightIcon from '../../icons/image-float-right.svg?react';
import { LabelKey, type RichTextEditorLabels } from '../../RichTextEditor.labels';

interface RichTextEditorImageBubbleMenuProps {
	editor: Editor | null;
	root: string;
	isDisabled: boolean;
	labels: RichTextEditorLabels;
}

interface ImageAlignAction {
	align: RichTextEditorImageAlign;
	labelKey: LabelKey;
	icon: ReactNode;
}

const IMAGE_ALIGN_ACTIONS: ImageAlignAction[] = [
	{
		align: 'float-left',
		labelKey: LabelKey.Image_FloatLeft,
		icon: <ImageFloatLeftIcon />,
	},
	{
		align: 'float-right',
		labelKey: LabelKey.Image_FloatRight,
		icon: <ImageFloatRightIcon />,
	},
	{
		align: 'block-left',
		labelKey: LabelKey.Image_BlockLeft,
		icon: <AlignLeftIcon />,
	},
	{
		align: 'block-center',
		labelKey: LabelKey.Image_BlockCenter,
		icon: <AlignCenterIcon />,
	},
	{
		align: 'block-right',
		labelKey: LabelKey.Image_BlockRight,
		icon: <AlignRightIcon />,
	},
];

/**
 * Floating toolbar that appears over a selected image, offering the alignment modes that
 * control how the surrounding text reflows around it.
 */
export const RichTextEditorImageBubbleMenu: FunctionComponent<
	RichTextEditorImageBubbleMenuProps
> = ({ editor, root, isDisabled, labels }) => {
	// Must be referentially stable: the bubble menu re-registers its prosemirror plugin
	// whenever this changes, which in combination with shouldRerenderOnTransaction would
	// otherwise result in an endless render loop.
	const shouldShow = useCallback(
		({ editor }: { editor: Editor }) => !isDisabled && editor.isActive('image'),
		[isDisabled]
	);

	if (!editor) {
		return null;
	}

	return (
		<BubbleMenu
			editor={editor}
			pluginKey="richTextEditorImageBubbleMenu"
			shouldShow={shouldShow}
			className={`${root}__image-bubble-menu`}
		>
			{IMAGE_ALIGN_ACTIONS.map((action) => (
				<button
					key={action.align}
					type="button"
					data-align-mode={action.align}
					className={
						editor.isActive('image', { align: action.align }) ? 'is-active' : undefined
					}
					title={labels[action.labelKey]}
					onClick={() => editor.chain().focus().setImageAlign(action.align).run()}
				>
					{action.icon}
				</button>
			))}
		</BubbleMenu>
	);
};
