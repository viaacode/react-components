import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, type ReactElement, useState } from 'react';

import { Button } from '../Button';
import { Modal } from '../Modal';

import { FlowPlayer } from './FlowPlayer';
import { setPlayingVideoSeekTime } from './FlowPlayer.helpers';
import { MOCK_FLOW_PLAYER_PROPS_FULL, MOCK_PLAYLIST_SOURCE } from './FlowPlayer.mock';
import peakJson from './Peak/__mock__/peak.json';

const FlowPlayerStoryComponentSetTimeButtons = ({ children }: { children: ReactElement }) => {
	return (
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
};

const FlowPlayerStoryComponentOpenInModal = ({ children }: { children: ReactElement }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				{cloneElement(children, { canPlay: isOpen })}
			</Modal>
			<Button
				label="Open playlist flowplayer in modal"
				onClick={() => {
					setIsOpen(true);
				}}
			/>
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
				// sync pause and fullscreen states
				onPlay: () => {
					setPause(false);
				},
				onPause: () => {
					setPause(true);
				},
				onToggleFullscreen: (val: boolean) => setFullscreen(val),
			})}
			<br />
			<Button label="play/pause" onClick={() => setPause(!pause)} />
			<Button label="toggle fullscreen" onClick={() => setFullscreen(!fullscreen)} />
		</>
	);
};

export default {
	title: 'Components/FlowPlayer',
	component: FlowPlayer,
} as ComponentMeta<typeof FlowPlayer>;

const Template: ComponentStory<typeof FlowPlayer> = (args) => (
	<div style={{ width: '50%' }}>
		<FlowPlayer {...args} />
	</div>
);

const TemplateSetTimeButtons: ComponentStory<typeof FlowPlayer> = (args) => (
	<div style={{ width: '50%' }}>
		<FlowPlayerStoryComponentSetTimeButtons>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponentSetTimeButtons>
	</div>
);

const TemplatePlaylistInModal: ComponentStory<typeof FlowPlayer> = (args) => (
	<div style={{ width: '50%' }}>
		<FlowPlayerStoryComponentOpenInModal>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponentOpenInModal>
	</div>
);

const TemplateExternalControls: ComponentStory<typeof FlowPlayer> = (args) => (
	<div style={{ width: '50%' }}>
		<FlowPlayerStoryComponentExternalControls>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponentExternalControls>
	</div>
);

export const Default = Template.bind({});
Default.args = MOCK_FLOW_PLAYER_PROPS_FULL;

export const Audio = Template.bind({});
Audio.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	src: [
		{
			src: 'https://cdn.flowplayer.com/token:eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4ZDhjZjMzMi0xZWRlLTQ5ZDUtYmI3MC1jMTkzMzgzYzVkNjMiLCJuYmYiOjE3MDkxMTEwOTcsImlzcyI6Imh0dHBzOi8vd3d3LmZsb3dwbGF5ZXIuY29tIiwiZXhwIjoxNzA5MTk3NDk3LCJpYXQiOjE3MDkxMTEwOTd9.Td9X3lD8E3T8_w4wzrlxo-ImN6Em4EhdWLdN1t7Qw8_VewM9rO62pD-FCMbwND05_VFbtKyMdcBUO4LofBtNhyu8dVxDZiuCY1UPntMU9gYCOkhhxrouxtgEMZr32g4sVjEiR-eLY00hL3LjuanAS6A30gN6P2hBfFGlwm2rHQnfZGm1WClT3KFP3W4Lu5Ahgoo8lbIC908YVq9U7odwTN8m8Zb28jgznFglkmdXWTjAY_PMf5-j0_7oxFQWbtd5YAHNxVKu5vo2MLLBubh3CkIh_sZBLpf0WvY5zTHrk5_aEz2uFwufMjROxfVKNJiVx05paYHUeBkSw4B1bk2r4RELGpKOnYpakAW_GZAZdXvwlmlzvcl8-I4xJVZgwnwFUIML3fnl-YaH2xyIAvHqXc7SvMN-IyRuYc5y33wiJVl-EEf2eZk_Ufnxmpe8SYDiohxdE-koQ4VXLZzA6_khQwGwNbd3uzhhQ8uGTN-4-j2962Obq4xx8PFcxh3tgcO5_dcp7R27UuEo31hizKVL9O2h9B0h4wvcdDqYuChjhNyX7XIpmLfYAMjes_wuJZdi0WvuHzoAeJCqPAJDBpjDF7L3mqupflAsmcIx5OspxmLM76YlzK_uIk7aVlaZ7_uCJhUiDBLICLI0Ep-kEf4JaT3-d_e-y9G-qfOrU_hDF50/bacec074-242b-499f-9ca8-38e382b6e179/v-8d8cf332-1ede-49d5-bb70-c193383c5d63_original.mp3',
			type: 'audio/mp3',
		},
	],
	type: 'audio',
	poster: 'https://placehold.co/1920x1080', // will be replaced by wave form fallback, since avo and hetarchief contain an ugly speaker poster as the poster for audio items
	waveformData: peakJson.data,
};

export const AudioWithFallbackPeak = Template.bind({});
AudioWithFallbackPeak.args = {
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
};

export const HlsSourceUrl = Template.bind({});
HlsSourceUrl.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	src: 'https://cdn.flowplayer.com/demo_videos/jumping_waves/hls/playlist.m3u8',
};

export const Thumbnail = Template.bind({});
Thumbnail.args = MOCK_FLOW_PLAYER_PROPS_FULL;

export const Thumbnail43 = Template.bind({});
Thumbnail43.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	poster:
		'https://archief-media.viaa.be/viaa/TESTBEELD/70412f5bdb594b7eb7518e261ec01d57973cba5becca46dab6870d78246c4b05/keyframes/keyframes_1_1/keyframe1.jpg',
};

export const NoThumbnail = Template.bind({});
NoThumbnail.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	poster: undefined,
};

export const ThumbnailWithCut = Template.bind({});
ThumbnailWithCut.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	start: 60,
	end: 70,
};

export const Logo = Template.bind({});
Logo.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	logo: 'images/100x100.svg',
};

export const SetSpeed = Template.bind({});
SetSpeed.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	speed: {
		options: [0.5, 0.75, 1, 1.25, 1.5],
		labels: ['0.5', '0.75', 'normaal', '1.25', '1.5'],
	},
};

export const SetTime = TemplateSetTimeButtons.bind({});
SetTime.args = MOCK_FLOW_PLAYER_PROPS_FULL;

export const Cuepoints = Template.bind({});
Cuepoints.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	start: 60,
	end: 70,
};

export const Playlist = Template.bind({});
const srcWithoutCuepoints = JSON.parse(JSON.stringify(MOCK_PLAYLIST_SOURCE));
srcWithoutCuepoints.items = srcWithoutCuepoints.items.map((item: any) => {
	delete item.cuepoints;
	return item;
});
Playlist.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
	src: srcWithoutCuepoints,
};

export const PlaylistScrollable = Template.bind({});
PlaylistScrollable.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
	src: srcWithoutCuepoints,
	playlistScrollable: true,
};

export const PlaylistWithCuepoints = Template.bind({});
PlaylistWithCuepoints.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
	src: MOCK_PLAYLIST_SOURCE,
};

export const PlaylistWithCuepointsInModal = TemplatePlaylistInModal.bind({});
PlaylistWithCuepointsInModal.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	plugins: ['cuepoints', 'hls', 'keyboard', 'playlist'],
	src: MOCK_PLAYLIST_SOURCE,
};

export const Events = Template.bind({});
Events.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	onPlay: action('play'),
	onPause: action('pause'),
	onEnded: action('ended'),
	onTimeUpdate: action('timeupdate'),
};

export const Subtitles = Template.bind({});
Subtitles.args = {
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
};

export const ExternalControls = TemplateExternalControls.bind({});
ExternalControls.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	onPlay: action('play'),
	onPause: action('pause'),
	onEnded: action('ended'),
	onTimeUpdate: action('timeupdate'),
};

export const CustomButton = Template.bind({});
CustomButton.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	customControls: (
		<button type="button" style={{ zIndex: 1, backgroundColor: 'blue', position: 'fixed' }}>
			custom button
		</button>
	),
};
