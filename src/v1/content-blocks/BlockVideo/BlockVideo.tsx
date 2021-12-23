import React, { FunctionComponent } from 'react';

import { AspectRatioWrapper } from '../../components/AspectRatioWrapper/AspectRatioWrapper';
import { Container } from '../../components/Container/Container';
import { FlowPlayer, FlowPlayerPropsSchema } from '../../components/FlowPlayer/FlowPlayer';
import { DefaultProps } from '../../types';

export interface BlockVideoProps extends DefaultProps {
	flowPlayerProps: FlowPlayerPropsSchema;
}

export const BlockVideo: FunctionComponent<BlockVideoProps> = ({ className, flowPlayerProps }) => {
	return (
		<Container className={className} mode="vertical">
			<AspectRatioWrapper aspect="16:9">
				<FlowPlayer {...flowPlayerProps} />
			</AspectRatioWrapper>
		</Container>
	);
};
