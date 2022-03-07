import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { Button } from '../Button';

import FlowPlayer from './FlowPlayer';
import { MOCK_FLOW_PLAYER_PROPS_FULL } from './FlowPlayer.mock';

const FlowPlayerStoryComponent = ({ children }: { children: ReactElement }) => {
	const [seekTime, setSeekTime] = useState(0);

	return (
		<>
			{cloneElement(children, {
				seekTime,
			})}
			<br />
			{[0, 0.001, 10, 20, 30].map((s) => (
				<Button
					label={`${s} seconds`}
					onClick={() => setSeekTime(s)}
					key={`button-jump-${s}`}
				/>
			))}
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
		<FlowPlayerStoryComponent>
			<FlowPlayer {...args} />
		</FlowPlayerStoryComponent>
	</div>
);

export const Default = Template.bind({});
Default.args = MOCK_FLOW_PLAYER_PROPS_FULL;

export const Playlist = Template.bind({});
Playlist.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	src: 'https://cdn.flowplayer.com/demo_videos/jumping_waves/hls/playlist.m3u8',
};

export const Thumbnail = Template.bind({});
Thumbnail.args = MOCK_FLOW_PLAYER_PROPS_FULL;

export const Thumbnail43 = Template.bind({});
Thumbnail43.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	poster: 'https://archief-media.viaa.be/viaa/TESTBEELD/70412f5bdb594b7eb7518e261ec01d57973cba5becca46dab6870d78246c4b05/keyframes/keyframes_1_1/keyframe1.jpg',
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

export const SetTime = TemplateSetTimeButtons.bind({});
SetTime.args = MOCK_FLOW_PLAYER_PROPS_FULL;

export const Cuepoints = Template.bind({});
Cuepoints.args = {
	...MOCK_FLOW_PLAYER_PROPS_FULL,
	start: 60,
	end: 70,
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
