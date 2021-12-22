import { storiesOf, StoryFnReactReturnType } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';
import { Select } from '../Select/Select';
import { SELECT_MOCK_OPTIONS } from '../Select/Select.mock';
import { Spacer } from '../Spacer/Spacer';

import { WYSIWYG } from './WYSIWYG';
import { WYSIWYGControlSchema } from './WYSIWYG.types';

const withContent = (story: () => StoryFnReactReturnType) => (
	<div className="c-content">{story()}</div>
);

export const WYSIWYG_OPTIONS: WYSIWYGControlSchema[] = [
	'undo',
	'redo',
	'separator',
	'bold',
	'italic',
	'underline',
	'separator',
	'list-ul',
	'list-ol',
	'separator',
	'link',
];

const WYSIWYGStoryComponent = ({ children }: { children: ReactElement }) => {
	const [state, setState] = useState(null);

	return cloneElement(children, {
		state,
		onChange: (newState: any) => {
			action('onChange')(newState.toHTML());
			setState(newState);
		},
	});
};

storiesOf('v1/components/WYSIWYG', module)
	.addParameters({ jest: ['WYSIWYG'] })
	.addDecorator(withContent)
	.add('WYSIWYG', () => (
		<WYSIWYGStoryComponent>
			<WYSIWYG
				initialHtml={
					'<h2>Welcome!</h2><p>This prefilled content is all <strong>editable</strong>.</p>'
				}
			/>
		</WYSIWYGStoryComponent>
	))
	.add('WYSIWYG disabled', () => (
		<WYSIWYGStoryComponent>
			<WYSIWYG
				initialHtml={
					'<h2>Welcome!</h2><p>This prefilled content is all <strong>editable</strong>.</p>'
				}
				disabled
			/>
		</WYSIWYGStoryComponent>
	))
	.add('WYSIWYG with limited buttons', () => (
		<WYSIWYGStoryComponent>
			<WYSIWYG controls={WYSIWYG_OPTIONS} />
		</WYSIWYGStoryComponent>
	))
	.add('WYSIWYG with table button', () => (
		<WYSIWYGStoryComponent>
			<WYSIWYG controls={[...WYSIWYG_OPTIONS, 'separator', 'table']} />
		</WYSIWYGStoryComponent>
	))
	.add('WYSIWYG with initial table html', () => (
		<WYSIWYGStoryComponent>
			<WYSIWYG
				controls={[...WYSIWYG_OPTIONS, 'separator', 'table']}
				initialHtml={
					'<p></p><p></p><table class="c-editor-table"><tr><td colSpan="1" rowSpan="1"><u>dit is een test</u></td><td colSpan="1" rowSpan="1"><u>dit ook</u></td><td colSpan="1" rowSpan="1"><u>ook dit</u></td></tr><tr><td colSpan="1" rowSpan="1">test</td><td colSpan="1" rowSpan="1"><strong>test</strong></td><td colSpan="1" rowSpan="1">test</td></tr><tr><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td><td colSpan="1" rowSpan="1"></td></tr></table><p></p>'
				}
			/>
		</WYSIWYGStoryComponent>
	))
	.add('WYSIWYG with select above it (z-index)', () => (
		<>
			<Spacer margin="bottom-small">
				<Select options={SELECT_MOCK_OPTIONS} />
			</Spacer>

			<WYSIWYGStoryComponent>
				<WYSIWYG controls={[...WYSIWYG_OPTIONS, 'separator', 'table']} />
			</WYSIWYGStoryComponent>
		</>
	));
