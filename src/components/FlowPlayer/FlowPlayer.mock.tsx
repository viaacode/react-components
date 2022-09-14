import { FlowPlayerProps, FlowplayerSourceList } from './FlowPlayer.types';

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

export const MOCK_PLAYLIST_SOURCE: FlowplayerSourceList = {
	type: 'flowplayer/playlist',
	items: [
		{
			src: '//edge.flowplayer.org/bauhaus.mp4',
			title: 'Bauhaus',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-bauhaus.jpg',
			cuepoints: [{ startTime: 5, endTime: 15 }],
		},
		{
			src: '//edge.flowplayer.org/functional.mp4',
			title: 'Functional',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-functional.jpg',
			cuepoints: [{ startTime: 10, endTime: 20 }],
		},
		{
			src: 'https://archief-media.viaa.be/viaa/TESTBEELD/c44b877a9a7d4b1a99c5b8b676c3aef4ca370f2fe15d42d49b438e71eea6b99d/browse.mp4',
			title: 'Journaal',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-journaal.jpg',
			cuepoints: [{ startTime: 15, endTime: 17 }],
		},
		{
			src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
			title: 'Elephant dream',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-elephants-dream.jpg',
			cuepoints: [{ startTime: 20, endTime: 25 }],
		},
		{
			src: '//edge.flowplayer.org/bauhaus.mp4',
			title: 'Bauhaus 2',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-bauhaus.jpg',
			cuepoints: [{ startTime: 25, endTime: 29 }],
		},
		{
			src: '//edge.flowplayer.org/functional.mp4',
			title: 'Functional 2',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-functional.jpg',
			cuepoints: [{ startTime: 12, endTime: 14 }],
		},
		{
			src: 'https://archief-media.viaa.be/viaa/TESTBEELD/c44b877a9a7d4b1a99c5b8b676c3aef4ca370f2fe15d42d49b438e71eea6b99d/browse.mp4',
			title: 'Journaal 2',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-journaal.jpg',
			cuepoints: [{ startTime: 5, endTime: 25 }],
		},
		{
			src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
			title: 'Elephant dream 2',
			category: 'video',
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-elephants-dream.jpg',
			cuepoints: [{ startTime: 0, endTime: 10 }],
		},
	],
};
