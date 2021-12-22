import classnames from 'classnames';
import React, { FunctionComponent } from 'react';

import { Button, ButtonPropsSchema } from '../../components/Button/Button';
import { Column, GridSizeSchema } from '../../components/Grid/Column/Column';
import { Grid } from '../../components/Grid/Grid';
import { Spacer } from '../../components/Spacer/Spacer';
import { convertToHtml } from '../../helpers';
import { defaultRenderLinkFunction } from '../../helpers/render-link';
import { ButtonAction, DefaultProps, RenderLinkFunction } from '../../types';

import './BlockRichText.scss';

interface BlockRichTextElement {
	content: string;
	buttons?: (ButtonPropsSchema & { buttonAction: ButtonAction })[];
	color?: string;
}

export interface BlockRichTextProps extends DefaultProps {
	elements: BlockRichTextElement | BlockRichTextElement[];
	maxTextWidth?: string;
	renderLink?: RenderLinkFunction;
}

export const BlockRichText: FunctionComponent<BlockRichTextProps> = ({
	className,
	elements = [
		{
			content: '',
		},
	],
	maxTextWidth,
	renderLink = defaultRenderLinkFunction,
}) => {
	const renderButtons = (columnIndex: number, buttons: any[]) =>
		buttons.map((buttonProps: any, buttonIndex: number) => (
			<Spacer key={`rich-text-column-${columnIndex}-button-${buttonIndex}`} margin="top">
				{renderLink(
					buttonProps.buttonAction,
					<Button {...buttonProps} />,
					buttonProps.label || buttonProps.ariaLabel || buttonProps.tooltip,
					buttonProps.altTitle ||
						buttonProps.label ||
						buttonProps.ariaLabel ||
						buttonProps.tooltip
				)}
			</Spacer>
		));

	const renderContent = (contentElem: BlockRichTextElement, columnIndex = 0) => {
		const { content, color, buttons } = contentElem;

		return (
			<>
				<div
					className="c-content"
					dangerouslySetInnerHTML={{ __html: convertToHtml(content) }}
					style={{
						...(color ? { color } : {}),
						...(maxTextWidth ? { maxWidth: maxTextWidth } : {}),
					}}
				/>
				{buttons && !!buttons.length && renderButtons(columnIndex, buttons)}
			</>
		);
	};

	const renderElements = (elements: BlockRichTextElement[]) => (
		<Grid>
			{elements.map((column, columnIndex) => (
				<Column
					size={`2-${12 / elements.length}` as GridSizeSchema}
					key={`rich-text-column-${columnIndex}`}
				>
					{renderContent(column, columnIndex)}
				</Column>
			))}
		</Grid>
	);

	return (
		<div className={classnames('c-rich-text-block', className)}>
			{Array.isArray(elements) ? renderElements(elements) : renderContent(elements)}
		</div>
	);
};
