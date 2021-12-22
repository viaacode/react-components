import React, { FunctionComponent } from 'react';

import { AspectRatioWrapper } from '../../components/AspectRatioWrapper/AspectRatioWrapper';
import { Container } from '../../components/Container/Container';
import { ExpandableContainer } from '../../components/ExpandableContainer/ExpandableContainer';
import { FlowPlayer, FlowPlayerPropsSchema } from '../../components/FlowPlayer/FlowPlayer';
import { Column } from '../../components/Grid/Column/Column';
import { Grid } from '../../components/Grid/Grid';
import { Spacer } from '../../components/Spacer/Spacer';
import { convertToHtml } from '../../helpers';
import { DefaultProps } from '../../types';

export interface BlockVideoTitleTextButtonProps extends DefaultProps {
	flowPlayerProps: FlowPlayerPropsSchema;
	title?: string;
	titleLink?: string;
	text?: string;
	collapsedHeight?: number;
}

export const BlockVideoTitleTextButton: FunctionComponent<BlockVideoTitleTextButtonProps> = ({
	className,
	flowPlayerProps,
	title,
	titleLink,
	text = '',
	collapsedHeight = 220,
}) => {
	return (
		<Container className={className} mode="horizontal">
			<Spacer>
				<Grid>
					<Column size="2-6">
						<AspectRatioWrapper aspect="16:9">
							<FlowPlayer {...flowPlayerProps} />
						</AspectRatioWrapper>
					</Column>
					<Column size="2-6">
						<div className="c-content">
							<ExpandableContainer collapsedHeight={collapsedHeight}>
								{title && (
									<h2>
										<a
											href={titleLink}
											style={{ color: 'black', textDecoration: 'none' }}
										>
											{title}
										</a>
									</h2>
								)}
								{text && (
									<p dangerouslySetInnerHTML={{ __html: convertToHtml(text) }} />
								)}
							</ExpandableContainer>
						</div>
					</Column>
				</Grid>
			</Spacer>
		</Container>
	);
};
