import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';

import { COLORS } from '../../colors';
import { action } from '../../helpers';
import { Spacer } from '../Spacer/Spacer';

import { Button, ButtonPropsSchema } from './Button';

const buttonProps: Partial<ButtonPropsSchema>[] = [
	{ label: 'Primary', type: 'primary' },
	{ label: 'Secondary', type: 'secondary' },
	{ label: 'Tertiary', type: 'tertiary' },
	{ label: 'Link', type: 'link' },
	{ label: 'Inline link', type: 'inline-link' },
	{ label: 'Danger', type: 'danger' },
	{ label: 'Danger hover', type: 'danger-hover' },
	{ label: 'Borderless', type: 'borderless' },
	{ label: 'Pupil primary', type: 'pupil-primary' },
	{ label: 'Pupil Link', type: 'pupil-link' },
	{ label: 'Pupil Inline Link', type: 'pupil-inline-link' },
	{ label: 'Pupil Underlined Link', type: 'pupil-underlined-link' },
	{ label: 'Disabled', disabled: true, title: 'reason why this button is disabled' },
];

const buttonIconProps: Partial<ButtonPropsSchema>[] = [
	{ ...buttonProps[0], icon: 'plus' },
	{ ...buttonProps[1], icon: 'search' },
	{ ...buttonProps[2], icon: 'database' },
	{ ...buttonProps[3], icon: 'link' },
	{ ...buttonProps[4], icon: 'link' },
	{ ...buttonProps[5], icon: 'x-circle' },
	{ ...buttonProps[6], icon: 'x-square' },
	{ ...buttonProps[7], icon: 'tag' },
	{ ...buttonProps[8], icon: 'delete' },
	{ ...buttonProps[9], icon: 'circle' },
	{ ...buttonProps[10], icon: 'check-square' },
];

const buttonInverseProps: Partial<ButtonPropsSchema>[] = [
	{ ...buttonIconProps[1], type: 'secondary-i' },
	{ ...buttonIconProps[7], type: 'borderless-i' },
];

const buttonActiveProps: Partial<ButtonPropsSchema>[] = [
	{ ...buttonIconProps[1], label: 'Active', active: true },
	{ ...buttonIconProps[1], label: 'Inctive' },
];

const autoHeightChildren = (
	<div>
		Content exceeding <br />
		Button <br />
		Height
	</div>
);
const buttonAutoHeightProps: Partial<ButtonPropsSchema>[] = [
	{ ...buttonIconProps[1], children: autoHeightChildren, autoHeight: true },
	{ ...buttonIconProps[1], children: autoHeightChildren },
];

const renderButtonStories = (
	propsArray: Partial<ButtonPropsSchema>[],
	hasLabel = true,
	extraProps = {}
) => (
	<Fragment>
		{propsArray.map(({ label, children = null, ...rest }, i) => {
			const labelProp = `${label} button`;

			return (
				<Spacer key={`button-${i}`} margin="bottom">
					<Button
						ariaLabel={labelProp}
						onClick={action('Button clicked')}
						title={labelProp}
						{...(hasLabel && { label: labelProp })}
						{...rest}
						{...extraProps}
					>
						{children}
					</Button>
				</Spacer>
			);
		})}
	</Fragment>
);

storiesOf('v1/components/Button', module)
	.addParameters({ jest: ['Button'] })
	.add('Buttons', () => renderButtonStories(buttonProps))
	.add('Button with icon', () => renderButtonStories(buttonIconProps))
	.add('Icon only button', () => renderButtonStories(buttonIconProps, false))
	.add('Button with arrow', () => renderButtonStories(buttonIconProps, true, { arrow: true }))
	.add('Small buttons', () => renderButtonStories(buttonIconProps, true, { size: 'small' }))
	.add('Large buttons', () => renderButtonStories(buttonIconProps, true, { size: 'large' }))
	.add('Block buttons', () => renderButtonStories(buttonIconProps, true, { block: true }))
	.add('Multicolor icon buttons', () =>
		renderButtonStories(buttonIconProps, true, { icon: 'itsme', iconType: 'multicolor' })
	)
	.add('Inverse buttons', () => (
		<div
			style={{
				display: 'inline-block',
				padding: '20px',
				backgroundColor: COLORS.GRAYSCALE.G800,
			}}
		>
			{renderButtonStories(buttonInverseProps)}
		</div>
	))
	.add('Active buttons', () => renderButtonStories(buttonActiveProps))
	.add('Auto height buttons', () => renderButtonStories(buttonAutoHeightProps, false))
	.add('Button with tooltip', () =>
		renderButtonStories(buttonProps, true, { tooltip: 'Dit is een download button' })
	);
