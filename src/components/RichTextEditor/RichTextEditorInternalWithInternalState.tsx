import type { FunctionComponent } from 'react';
import { LexicalEditorCore } from './LexicalEditorCore';
import {
	ALL_RICH_TEXT_HEADINGS,
	type RichTextEditorWithInternalStateProps,
} from './RichTextEditor.types';

const RichTextEditorInternalWithInternalState: FunctionComponent<
	RichTextEditorWithInternalStateProps
> = ({
	className,
	controls,
	disabled,
	id,
	value,
	onBlur,
	onChange,
	onFocus,
	onSave,
	placeholder,
	enabledHeadings = ALL_RICH_TEXT_HEADINGS,
	rootClassName,
}) => {
	return (
		<LexicalEditorCore
			className={className}
			controls={controls}
			disabled={disabled}
			enabledHeadings={enabledHeadings}
			id={id}
			value={value}
			onBlur={onBlur}
			onChange={onChange}
			onFocus={onFocus}
			onSave={onSave}
			placeholder={placeholder}
			rootClassName={rootClassName}
		/>
	);
};

export default RichTextEditorInternalWithInternalState;
