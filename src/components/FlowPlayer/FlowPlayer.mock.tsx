import { AvoContentTypeEnglish } from '@viaa/avo2-types';
import type { FlowPlayerProps, FlowplayerSourceList } from './FlowPlayer.types';

const MOCK_VIDEO_SRC =
	'https://cdn.flowplayer.com/token:eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwMTM3NDAyYi1jNDVjLTQ2ODUtODEwMy1hZTgyMDNlMmJlMjkiLCJuYmYiOjE3ODM1MDAzNjYsImlzcyI6Imh0dHBzOi8vd3d3LmZsb3dwbGF5ZXIuY29tIiwiZXhwIjoxNzgzNTg2NzY2LCJpYXQiOjE3ODM1MDAzNjZ9.GtS9ThnGVbtqgbkUc0-ECYQIEl_MIKKjkrvHRxa69pSIN2JAbGXcZPcbC1uFLAY02kdDYOq2HEzN0gtTyWjcQI3KFBGdiXNH5YppB0NoHcuAPciW73qMg1vNG8nMT8XkQxlBKg_NmPq_1DLPooMX9jBik4mF3Sd6eeEtqgSl0V8CZ9B3qGWxofjhD5wG6iteIJWmg_7cOOK3w3lUPMkIUyZp9exyJeLHgg7owYivmWu8j0DRohruoeiSe2em5Iy8dNAc3jv_HSWsrUsINexWZZ_tSkl6eoNFAcF-qOGnt8wQkonl8gELPnqAjGQUQra4urFZVNtukE0esyIBFsH__w6csiyMeWUGBQhBTHW7yK5Cby_Ph7s-vi_8AliYERX1zkhrkI3RpnJJ4YCSs2PRZj8mKE8u8z3wUKc5ECbxQfL1KgW07Ex380UvTwG_1VPZ7NJtX8K3gOMw6RYe2TAQHqbHm9Wlv5FtJIsk24t2IXZiJ8uvm28yHfiniuDVJ6tN6D6iy9xyhRUXxOEmR8o2fAnU950bqM5r9V0QqTP5OLzE2DQOZzp9YjUWwcTTbU0tFPQTzrOorbTCj0kPBWkBCkt5Yum3dPUs9tzBt_fbAu3EoojynF656DHga-l1nNiVDGj_jmVWC8Mz5bE4sTr2meziv1qH1rLgtSNTKtLLjY4/bacec074-242b-499f-9ca8-38e382b6e179/v-0137402b-c45c-4685-8103-ae8203e2be29_original.mp4';

const MOCK_FLOW_PLAYER_PROPS: FlowPlayerProps = {
	src: MOCK_VIDEO_SRC,
	title: 'Title',
	autoplay: false,
	type: AvoContentTypeEnglish.VIDEO,
};

export const MOCK_FLOW_PLAYER_PROPS_FULL: FlowPlayerProps = {
	...MOCK_FLOW_PLAYER_PROPS,
	poster: 'https://placehold.co/1920x1080',
	logo: 'https://placehold.co/100x100',
	metadata: ['30-12-2011', 'VRT'],
};

export const MOCK_PLAYLIST_SOURCE: FlowplayerSourceList = {
	type: 'flowplayer/playlist',
	items: [
		{
			src: '//edge.flowplayer.org/bauhaus.mp4',
			title: 'Bauhaus',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-bauhaus.jpg',
			cuepoints: [{ startTime: 5, endTime: 15 }],
		},
		{
			src: '//edge.flowplayer.org/functional.mp4',
			title: 'Functional',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-functional.jpg',
			cuepoints: [{ startTime: 10, endTime: 20 }],
		},
		{
			src: 'https://archief-media.viaa.be/viaa/TESTBEELD/c44b877a9a7d4b1a99c5b8b676c3aef4ca370f2fe15d42d49b438e71eea6b99d/browse.mp4',
			title: 'Journaal',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-journaal.jpg',
			cuepoints: [{ startTime: 15, endTime: 17 }],
		},
		{
			src: MOCK_VIDEO_SRC,
			title: 'Elephant dream',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-elephants-dream.jpg',
			cuepoints: [{ startTime: 20, endTime: 25 }],
		},
		{
			src: '//edge.flowplayer.org/bauhaus.mp4',
			title: 'Bauhaus 2',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-bauhaus.jpg',
			cuepoints: [{ startTime: 25, endTime: 29 }],
		},
		{
			src: '//edge.flowplayer.org/functional.mp4',
			title: 'Functional 2',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-functional.jpg',
			cuepoints: [{ startTime: 12, endTime: 14 }],
		},
		{
			src: 'https://archief-media.viaa.be/viaa/TESTBEELD/c44b877a9a7d4b1a99c5b8b676c3aef4ca370f2fe15d42d49b438e71eea6b99d/browse.mp4',
			title: 'Journaal 2',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-journaal.jpg',
			cuepoints: [{ startTime: 5, endTime: 25 }],
		},
		{
			src: MOCK_VIDEO_SRC,
			title: 'Elephant dream 2',
			category: AvoContentTypeEnglish.VIDEO,
			provider: 'VRT',
			poster: 'http://localhost:3020/images/flowplayer-elephants-dream.jpg',
			cuepoints: [{ startTime: 0, endTime: 10 }],
		},
	],
};
