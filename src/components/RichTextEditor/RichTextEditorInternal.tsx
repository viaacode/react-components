import type { FunctionComponent } from 'react';
import { LexicalEditorCore } from './LexicalEditorCore';
import { ALL_RICH_TEXT_HEADINGS, type RichTextEditorProps } from './RichTextEditor.types';

/**
 * @deprecated Use RichTextEditorInternalWithInternalState instead since the full
 * editor state isn't exposed, which should be more performant.
 */
const RichTextEditorInternal: FunctionComponent<RichTextEditorProps> = ({
	className,
	controls,
	disabled,
	id,
	initialHtml,
	onBlur,
	onChange,
	onFocus,
	onSave,
	placeholder,
	enabledHeadings = ALL_RICH_TEXT_HEADINGS,
	rootClassName,
	state,
}) => {
	// `state` is the legacy controlled-state prop. Convert to a plain HTML string.
	const controlledValue = state?.toHTML();

	return (
		<LexicalEditorCore
			className={className}
			controls={controls}
			disabled={disabled}
			enabledHeadings={enabledHeadings}
			id={id}
			initialHtml={controlledValue === undefined ? (initialHtml ?? '') : undefined}
			value={controlledValue}
			onBlur={onBlur}
			onChange={(html) => onChange?.({ toHTML: () => html })}
			onFocus={onFocus}
			onSave={onSave}
			placeholder={placeholder}
			rootClassName={rootClassName}
		/>
	);
};

export default RichTextEditorInternal;
