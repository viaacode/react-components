import React, { FunctionComponent } from 'react';

import { Button } from '../../Button/Button';
import { Container } from '../../Container/Container';
import { Column } from '../../Grid/Column';
import { Grid } from '../../Grid/Grid';
import { Image } from '../../Image/Image';
import { Spacer } from '../../Spacer/Spacer';

export interface BlockImageTitleTextButtonProps {
	imageSource: string;
	imageDescription?: string;
	title?: string;
	text?: string;
	buttonLabel?: string;
	onClick?: () => void;
}

export const BlockImageTitleTextButton: FunctionComponent<BlockImageTitleTextButtonProps> = ({
	imageSource,
	imageDescription,
	title,
	text,
	buttonLabel,
	onClick,
}: BlockImageTitleTextButtonProps) => {
	return (
		<section className="o-container-vertical">
			<Container mode="horizontal">
				<Grid>
					<Column size="2-4">
						<Image src={imageSource} alt={imageDescription} />
					</Column>
					<Column size="2-8">
						<div className="c-content">
							{title && <h2>{title}</h2>}
							{text && <p>{text}</p>}
							{buttonLabel && (
								<Spacer margin="top">
									<Button
										label={buttonLabel}
										type="secondary"
										onClick={() => onClick && onClick()}
									/>
								</Spacer>
							)}
						</div>
					</Column>
				</Grid>
			</Container>
		</section>
	);
};
