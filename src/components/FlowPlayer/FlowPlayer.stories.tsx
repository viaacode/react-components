import type { Meta, StoryObj } from '@storybook/react-vite';
import { cloneElement, type ReactElement, useState } from 'react';
import { action } from 'storybook/actions';

import { Button } from '../Button/index.js';
import { Modal } from '../Modal/index.js';

import { setPlayingVideoSeekTime } from './FlowPlayer.helpers.js';
import { FlowPlayer } from './FlowPlayer.js';
import { MOCK_FLOW_PLAYER_PROPS_FULL, MOCK_PLAYLIST_SOURCE } from './FlowPlayer.mock.js';
import peakJson from './Peak/__mock__/peak.json' with { type: 'json' };

const FlowPlayerStoryComponentSetTimeButtons = ({ children }: { children: ReactElement }) => (
	<>
		{cloneElement(children)}
		<br />
		{[0, 0.001, 10, 20, 30].map((s) => (
			<Button
				label={`${s} seconds`}
				onClick={() => setPlayingVideoSeekTime(s)}
				key={`button-jump-${s}`}
			/>
		))}
	</>
);

const FlowPlayerStoryComponentOpenInModal = ({ children }: { children: ReactElement }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				{cloneElement(children, { canPlay: isOpen })}
			</Modal>
			<Button label="Open playlist flowplayer in modal" onClick={() => setIsOpen(true)} />
		</>
	);
};

const FlowPlayerStoryComponentExternalControls = ({ children }: { children: ReactElement }) => {
	const [fullscreen, setFullscreen] = useState(false);
	const [pause, setPause] = useState(true);
	return (
		<>
			{cloneElement(children, {
				pause,
				fullscreen,
				onPlay: () => setPause(false),
				onPause: () => setPause(true),
				onToggleFullscreen: (val: boolean) => setFullscreen(val),
			})}
			<br />
			<Button label="play/pause" onClick={() => setPause(!pause)} />
			<Button label="toggle fullscreen" onClick={() => setFullscreen(!fullscreen)} />
		</>
	);
};

const meta: Meta<typeof FlowPlayer> = {
	title: 'Components/FlowPlayer',
	component: FlowPlayer,
};
export default meta;
type Story = StoryObj<typeof FlowPlayer>;

const Template = (args: any) => (
	<div style={{ width: '50%' }}>
		<FlowPlayer {...args} />
	</div>
);

const TemplateSetTimeButtons = (args: any) => (
	<div style={{ width: '50%' }}>
		<FlowPlayerStoryComponentSetTimeButtons>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponentSetTimeButtons>
	</div>
);

const TemplatePlaylistInModal = (args: any) => (
	<div style={{ width: '50%' }}>
		<FlowPlayerStoryComponentOpenInModal>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponentOpenInModal>
	</div>
);

const TemplateExternalControls = (args: any) => (
	<div style={{ width: '50%' }}>
		<FlowPlayerStoryComponentExternalControls>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponentExternalControls>
	</div>
);

export const Default: Story = {
	args: MOCK_FLOW_PLAYER_PROPS_FULL,
	render: Template,
};

export const Audio: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		src: [
			{
				src: 'https://cdn.flowplayer.com/token:eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4ZDhjZjMzMi0xZWRlLTQ5ZDUtYmI3MC1jMTkzMzgzYzVkNjMiLCJuYmYiOjE3MDkxMTEwOTcsImlzcyI6Imh0dHBzOi8vd3d3LmZsb3dwbGF5ZXIuY29tIiwiZXhwIjoxNzA5MTk3NDk3LCJpYXQiOjE3MDkxMTEwOTd9.Td9X3lD8E3T8_w4wzrlxo-ImN6Em4EhdWLdN1t7Qw8_VewM9rO62pD-FCMbwND05_VFbtKyMdcBUO4LofBtNhyu8dVxDZiuCY1UPntMU9gYCOkhhxrouxtgEMZr32g4sVjEiR-eLY00hL3LjuanAS6A30gN6P2hBfFGlwm2rHQnfZGm1WClT3KFP3W4Lu5Ahgoo8lbIC908YVq9U7odwTN8m8Zb28jgznFglkmdXWTjAY_PMf5-j0_7oxFQWbtd5YAHNxVKu5vo2MLLBubh3CkIh_sZBLpf0WvY5zTHrk5_aEz2uFwufMjROxfVKNJiVx05paYHUeBkSw4B1bk2r4RELGpKOnYpakAW_GZAZdXvwlmlzvcl8-I4xJVZgwnwFUIML3fnl-YaH2xyIAvHqXc7SvMN-IyRuYc5y33wiJVl-EEf2eZk_Ufnxmpe8SYDiohxdE-koQ4VXLZzA6_khQwGwNbd3uzhhQ8uGTN-4-j2962Obq4xx8PFcxh3tgcO5_dcp7R27UuEo31hizKVL9O2h9B0h4wvcdDqYuChjhNyX7XIpmLfYAMjes_wuJZdi0WvuHzoAeJCqPAJDBpjDF7L3mqupflAsmcIx5OspxmLM76YlzK_uIk7aVlaZ7_uCJhUiDBLICLI0Ep-kEf4JaT3-d_e-y9G-qfOrU_hDF50/bacec074-242b-499f-9ca8-38e382b6e179/v-8d8cf332-1ede-49d5-bb70-c193383c5d63_original.mp3',
				type: 'audio/mp3',
			},
		],
		type: 'audio',
		poster: 'https://placehold.co/1920x1080',
		waveformData: peakJson.data,
	},
	render: Template,
};

export const AudioWithFallbackPeak: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		src: [
			{
				src: 'https://cdn.flowplayer.com/token:eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4ZDhjZjMzMi0xZWRlLTQ5ZDUtYmI3MC1jMTkzMzgzYzVkNjMiLCJuYmYiOjE3MDkxMTEwOTcsImlzcyI6Imh0dHBzOi8vd3d3LmZsb3dwbGF5ZXIuY29tIiwiZXhwIjoxNzA5MTk3NDk3LCJpYXQiOjE3MDkxMTEwOTd9.Td9X3lD8E3T8_w4wzrlxo-ImN6Em4EhdWLdN1t7Qw8_VewM9rO62pD-FCMbwND05_VFbtKyMdcBUO4LofBtNhyu8dVxDZiuCY1UPntMU9gYCOkhhxrouxtgEMZr32g4sVjEiR-eLY00hL3LjuanAS6A30gN6P2hBfFGlwm2rHQnfZGm1WClT3KFP3W4Lu5Ahgoo8lbIC908YVq9U7odwTN8m8Zb28jgznFglkmdXWTjAY_PMf5-j0_7oxFQWbtd5YAHNxVKu5vo2MLLBubh3CkIh_sZBLpf0WvY5zTHrk5_aEz2uFwufMjROxfVKNJiVx05paYHUeBkSw4B1bk2r4RELGpKOnYpakAW_GZAZdXvwlmlzvcl8-I4xJVZgwnwFUIML3fnl-YaH2xyIAvHqXc7SvMN-IyRuYc5y33wiJVl-EEf2eZk_Ufnxmpe8SYDiohxdE-koQ4VXLZzA6_khQwGwNbd3uzhhQ8uGTN-4-j2962Obq4xx8PFcxh3tgcO5_dcp7R27UuEo31hizKVL9O2h9B0h4wvcdDqYuChjhNyX7XIpmLfYAMjes_wuJZdi0WvuHzoAeJCqPAJDBpjDF7L3mqupflAsmcIx5OspxmLM76YlzK_uIk7aVlaZ7_uCJhUiDBLICLI0Ep-kEf4JaT3-d_e-y9G-qfOrU_hDF50/bacec074-242b-499f-9ca8-38e382b6e179/v-8d8cf332-1ede-49d5-bb70-c193383c5d63_original.mp3',
				type: 'audio/mp3',
			},
		],
		type: 'audio',
		poster: undefined,
		waveformData: undefined,
	},
	render: Template,
};

export const HlsSourceUrl: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		src: 'https://cdn.flowplayer.com/demo_videos/jumping_waves/hls/playlist.m3u8',
	},
	render: Template,
};

export const Thumbnail: Story = {
	args: MOCK_FLOW_PLAYER_PROPS_FULL,
	render: Template,
};

export const Thumbnail43: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		poster:
			'https://archief-media.viaa.be/viaa/TESTBEELD/70412f5bdb594b7eb7518e261ec01d57973cba5becca46dab6870d78246c4b05/keyframes/keyframes_1_1/keyframe1.jpg',
	},
	render: Template,
};

export const NoThumbnail: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		poster: undefined,
	},
	render: Template,
};

export const ThumbnailWithCut: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		start: 60,
		end: 70,
	},
	render: Template,
};

export const Logo: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		logo: 'images/100x100.svg',
	},
	render: Template,
};

export const SetSpeed: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		speed: {
			options: [0.5, 0.75, 1, 1.25, 1.5],
			labels: ['0.5', '0.75', 'normaal', '1.25', '1.5'],
		},
	},
	render: Template,
};

export const SetTime: Story = {
	args: MOCK_FLOW_PLAYER_PROPS_FULL,
	render: TemplateSetTimeButtons,
};

export const Cuepoints: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		start: 60,
		end: 70,
	},
	render: Template,
};

export const Playlist: Story = {
	args: (() => {
		const srcWithoutCuepoints = JSON.parse(JSON.stringify(MOCK_PLAYLIST_SOURCE));
		srcWithoutCuepoints.items = srcWithoutCuepoints.items.map((item: any) => {
			delete item.cuepoints;
			return item;
		});
		return {
			...MOCK_FLOW_PLAYER_PROPS_FULL,
			plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
			src: srcWithoutCuepoints,
		};
	})(),
	render: Template,
};

export const PlaylistScrollable: Story = {
	args: (() => {
		const srcWithoutCuepoints = JSON.parse(JSON.stringify(MOCK_PLAYLIST_SOURCE));
		srcWithoutCuepoints.items = srcWithoutCuepoints.items.map((item: any) => {
			delete item.cuepoints;
			return item;
		});
		return {
			...MOCK_FLOW_PLAYER_PROPS_FULL,
			plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
			src: srcWithoutCuepoints,
			playlistScrollable: true,
		};
	})(),
	render: Template,
};

export const PlaylistWithCuepoints: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
		src: MOCK_PLAYLIST_SOURCE,
	},
	render: Template,
};

export const PlaylistWithCuepointsInModal: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
		src: MOCK_PLAYLIST_SOURCE,
	},
	render: TemplatePlaylistInModal,
};

export const Events: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		onPlay: action('play'),
		onPause: action('pause'),
		onEnded: action('ended'),
		onTimeUpdate: action('timeupdate'),
	},
	render: Template,
};

export const Subtitles: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		src: 'https://archief-media.viaa.be/viaa/TESTBEELD/d97b24406291480aac11d0728335afe011f3d283abde48649a4c4e9079428b8a/browse.mp4',
		subtitles: [
			{
				crossorigin: 'anonymous',
				default: true,
				kind: 'subtitles',
				lang: 'nl',
				id: '123',
				label: 'Nederlands',
				src: 'https://avo2-proxy-qas.hetarchief.be/subtitles/convert-srt-to-vtt/viaa/MOB/TESTBEELD/3b61046461be4b1e9f0fad19b42baa192487807cfefa4c289c0fa65d5c78195b/3b61046461be4b1e9f0fad19b42baa192487807cfefa4c289c0fa65d5c78195b.srt',
			},
		],
	},
	render: Template,
};

export const ExternalControls: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		onPlay: action('play'),
		onPause: action('pause'),
		onEnded: action('ended'),
		onTimeUpdate: action('timeupdate'),
	},
	render: TemplateExternalControls,
};

export const CustomButton: Story = {
	args: {
		...MOCK_FLOW_PLAYER_PROPS_FULL,
		customControls: (
			<button type="button" style={{ zIndex: 1, backgroundColor: 'blue', position: 'fixed' }}>
				custom button
			</button>
		),
	},
	render: Template,
};
