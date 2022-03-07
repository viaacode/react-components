import { FlowPlayerProps } from './FlowPlayer.types';

export const MOCK_FLOW_PLAYER_PROPS: FlowPlayerProps = {
	src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
	title: 'Title',
	autoplay: false,
};

export const MOCK_FLOW_PLAYER_PROPS_FULL: FlowPlayerProps = {
	...MOCK_FLOW_PLAYER_PROPS,
	poster: 'https://via.placeholder.com/1920x1080',
	logo: 'https://via.placeholder.com/100x100',
	metadata: ['30-12-2011', 'VRT'],
};
