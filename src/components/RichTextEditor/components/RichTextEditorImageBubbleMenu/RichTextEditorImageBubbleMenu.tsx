import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import clsx from 'clsx';
import type { FunctionComponent, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RichTextEditorImageAlign } from '../../extensions/RichTextEditorImage';
import AlignCenterIcon from '../../icons/align-center.svg?react';
import AlignLeftIcon from '../../icons/align-left.svg?react';
import AlignRightIcon from '../../icons/align-right.svg?react';
import ImageFloatLeftIcon from '../../icons/image-float-left.svg?react';
import ImageFloatRightIcon from '../../icons/image-float-right.svg?react';
import ImageSizeIcon from '../../icons/image-size.svg?react';
import LinkIcon from '../../icons/link.svg?react';
import { LabelKey, type RichTextEditorLabels } from '../../RichTextEditor.labels';
import { RichTextEditorImageLinkForm } from '../RichTextEditorImageLinkForm/RichTextEditorImageLinkForm';
import { RichTextEditorImageSizeForm } from '../RichTextEditorImageSizeForm/RichTextEditorImageSizeForm';

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
		align: RichTextEditorImageAlign.FLOAT_LEFT,
		labelKey: LabelKey.Image_FloatLeft,
		icon: <ImageFloatLeftIcon />,
	},
	{
		align: RichTextEditorImageAlign.FLOAT_RIGHT,
		labelKey: LabelKey.Image_FloatRight,
		icon: <ImageFloatRightIcon />,
	},
	{
		align: RichTextEditorImageAlign.BLOCK_LEFT,
		labelKey: LabelKey.Image_BlockLeft,
		icon: <AlignLeftIcon />,
	},
	{
		align: RichTextEditorImageAlign.BLOCK_CENTER,
		labelKey: LabelKey.Image_BlockCenter,
		icon: <AlignCenterIcon />,
	},
	{
		align: RichTextEditorImageAlign.BLOCK_RIGHT,
		labelKey: LabelKey.Image_BlockRight,
		icon: <AlignRightIcon />,
	},
];

type ImagePanel = 'link' | 'size';

// Module level, so it stays referentially stable across renders. Keeps the menu, and its link
// and size panels, a bit away from the screen edges.
const BUBBLE_MENU_OPTIONS = { flip: { padding: 8 }, shift: { padding: 8 } };

/**
 * Floating toolbar that appears over a selected image, offering the alignment modes that
 * control how the surrounding text reflows around it, and the link and size of the image.
 *
 * The link and size forms are rendered inside the bubble menu rather than in a portal: the
 * bubble menu hides itself when the editor loses focus, unless the focus moves into the menu.
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
	// The panel is remembered together with the image it was opened for, so it closes as soon as
	// another image, or no image at all, gets selected.
	const [panelState, setPanelState] = useState<{ panel: ImagePanel; imagePos: number } | null>(
		null
	);

	const selectedImagePos = editor?.isActive('image') ? editor.state.selection.from : null;
	const openPanel = panelState?.imagePos === selectedImagePos ? panelState.panel : null;

	// The bubble menu only repositions on editor transactions, so after opening or closing a panel
	// it keeps the position computed for its old size and can stick out of the screen.
	// https://meemoo.atlassian.net/browse/AVO-4137
	// biome-ignore lint/correctness/useExhaustiveDependencies: openPanel changes the menu size
	useEffect(() => {
		if (!editor || editor.isDestroyed) {
			return;
		}
		editor.view.dispatch(
			editor.state.tr.setMeta('richTextEditorImageBubbleMenu', 'updatePosition')
		);
	}, [editor, openPanel]);

	if (!editor) {
		return null;
	}

	const togglePanel = (panel: ImagePanel) =>
		setPanelState(
			openPanel === panel || selectedImagePos === null
				? null
				: { panel, imagePos: selectedImagePos }
		);
	const closePanel = () => setPanelState(null);

	return (
		<BubbleMenu
			editor={editor}
			pluginKey="richTextEditorImageBubbleMenu"
			shouldShow={shouldShow}
			className={`${root}__image-bubble-menu`}
			options={BUBBLE_MENU_OPTIONS}
		>
			<div className={`${root}__image-bubble-menu-buttons`}>
				{IMAGE_ALIGN_ACTIONS.map((action) => (
					<button
						key={action.align}
						type="button"
						data-align-mode={action.align}
						className={editor.isActive('image', { align: action.align }) ? 'is-active' : undefined}
						title={labels[action.labelKey]}
						onClick={() => editor.chain().focus().setImageAlign(action.align).run()}
					>
						{action.icon}
					</button>
				))}
				<span className={`${root}__image-bubble-menu-separator`} />
				<button
					type="button"
					data-image-panel="link"
					className={clsx({
						'is-active': openPanel === 'link' || !!editor.getAttributes('image').href,
					})}
					title={labels[LabelKey.Image_Link]}
					aria-expanded={openPanel === 'link'}
					onClick={() => togglePanel('link')}
				>
					<LinkIcon />
				</button>
				<button
					type="button"
					data-image-panel="size"
					className={clsx({
						'is-active':
							openPanel === 'size' ||
							!!editor.getAttributes('image').width ||
							!!editor.getAttributes('image').height,
					})}
					title={labels[LabelKey.Image_Size]}
					aria-expanded={openPanel === 'size'}
					onClick={() => togglePanel('size')}
				>
					<ImageSizeIcon />
				</button>
			</div>
			{openPanel && (
				<div className={clsx(`${root}__link-popup`, `${root}__image-bubble-menu-panel`)}>
					{openPanel === 'link' ? (
						<RichTextEditorImageLinkForm
							editor={editor}
							root={root}
							labels={labels}
							onClose={closePanel}
						/>
					) : (
						<RichTextEditorImageSizeForm
							editor={editor}
							root={root}
							labels={labels}
							onClose={closePanel}
						/>
					)}
				</div>
			)}
		</BubbleMenu>
	);
};
