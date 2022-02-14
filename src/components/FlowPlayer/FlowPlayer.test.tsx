export {};

// TODO figure out of to get these tests to work with flowplayer libraries being initialised on the window
// import { render, waitFor } from '@testing-library/react';
// import React, { PropsWithChildren } from 'react';
//
// import { FlowPlayer } from './FlowPlayer';
// import { MOCK_FLOW_PLAYER_PROPS_FULL } from './FlowPlayer.mock';
// import { FlowPlayerPropsSchema } from './FlowPlayer.types';
//
// const renderFlowPlayer = (props: PropsWithChildren<FlowPlayerPropsSchema>) => {
// 	return render(<FlowPlayer {...props} />);
// };
//
// describe('<FlowPlayer />', () => {
// 	it('Should be able to render with poster', async () => {
// 		const { container } = renderFlowPlayer(MOCK_FLOW_PLAYER_PROPS_FULL);
//
// 		const playButton = await waitFor(() => container.querySelector('.fp-play'));
// 		expect(playButton).toBeInTheDocument();
//
// 		const videoWrapper = await waitFor(() => container.querySelector('.c-video-player-inner'));
// 		expect(videoWrapper).toBeInTheDocument();
// 		expect(videoWrapper).toHaveStyle(
// 			`background-image: url(${MOCK_FLOW_PLAYER_PROPS_FULL.poster})`
// 		);
// 	});
// });
