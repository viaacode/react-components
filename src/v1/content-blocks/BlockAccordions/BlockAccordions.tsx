import classnames from 'classnames';
import React, { FunctionComponent, useState } from 'react';

import { Accordion } from '../../components/Accordion/Accordion';
import { DefaultProps } from '../../types';
import { BlockRichText } from '../BlockRichText/BlockRichText';

export interface BlockAccordionsProps extends DefaultProps {
	elements: { title: string; content: string }[];
}

export const BlockAccordions: FunctionComponent<BlockAccordionsProps> = ({
	className,
	elements,
}) => {
	// Methods
	const generateKey = (i: number) => `block-accordion-${i}`;

	// Hooks
	const [accordionsOpen, setAccordionsOpen] = useState<{ [key: string]: boolean }>(
		elements.reduce((acc, curr, i) => ({ ...acc, [generateKey(i)]: false }), {})
	);

	// Render
	return (
		<div className={classnames(className, 'c-block-accordions')}>
			{elements.map(({ content, title }, index) => {
				const key = generateKey(index);

				return (
					<Accordion
						key={key}
						isOpen={accordionsOpen[key]}
						title={title}
						onToggle={() =>
							setAccordionsOpen({ ...accordionsOpen, [key]: !accordionsOpen[key] })
						}
					>
						<BlockRichText elements={{ content }} />
					</Accordion>
				);
			})}
		</div>
	);
};
