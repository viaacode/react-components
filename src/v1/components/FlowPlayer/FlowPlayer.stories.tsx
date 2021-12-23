import { storiesOf } from '@storybook/react';
import React, { cloneElement, ReactElement, useState } from 'react';

import { action } from '../../helpers';
import { Button } from '../Button/Button';
import { ButtonToolbar } from '../ButtonToolbar/ButtonToolbar';
import { Modal } from '../Modal/Modal';
import { ModalBody } from '../Modal/Modal.slots';

import { FlowPlayer } from './FlowPlayer';
import { MOCK_FLOW_PLAYER_PROPS_FULL } from './FlowPlayer.mock';

const FlowPlayerStoryComponent = ({ children }: { children: ReactElement }) => {
	const [seekTime, setSeekTime] = useState(0);

	return (
		<>
			{cloneElement(children, {
				seekTime,
			})}
			<br />
			<ButtonToolbar>
				{[0, 0.001, 10, 20, 30].map((s) => (
					<Button
						label={`${s} seconds`}
						onClick={() => setSeekTime(s)}
						key={`button-jump-${s}`}
					/>
				))}
			</ButtonToolbar>
		</>
	);
};

storiesOf('v1/components/FlowPlayer', module)
	.addParameters({ jest: ['FlowPlayer'] })
	.add('FlowPlayer Video', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} />
		</div>
	))
	.add('FlowPlayer Video with m3u8 playlist src', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer
				{...MOCK_FLOW_PLAYER_PROPS_FULL}
				src="https://cdn.flowplayer.com/demo_videos/jumping_waves/hls/playlist.m3u8"
			/>
		</div>
	))
	.add('FlowPlayer Thumbnail', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} />
		</div>
	))
	.add('FlowPlayer Thumbnail 4:3', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer
				{...MOCK_FLOW_PLAYER_PROPS_FULL}
				poster={
					'https://archief-media.viaa.be/viaa/TESTBEELD/70412f5bdb594b7eb7518e261ec01d57973cba5becca46dab6870d78246c4b05/keyframes/keyframes_1_1/keyframe1.jpg'
				}
			/>
		</div>
	))
	.add('FlowPlayer without thumbnail', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} poster={undefined} />
		</div>
	))
	.add('FlowPlayer Thumbnail met Geknipt', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} start={60} end={70} />
		</div>
	))
	.add('FlowPlayer logo', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} logo="images/100x100.svg" />
		</div>
	))
	.add('FlowPlayer speeds', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer
				{...MOCK_FLOW_PLAYER_PROPS_FULL}
				speed={{
					options: [0.5, 0.75, 1, 1.25, 1.5],
					labels: ['0.5', '0.75', 'normaal', '1.25', '1.5'],
				}}
			/>
		</div>
	))
	.add('FlowPlayer set time', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayerStoryComponent>
				<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} />
			</FlowPlayerStoryComponent>
		</div>
	))
	.add('FlowPlayer cuepoints', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer {...MOCK_FLOW_PLAYER_PROPS_FULL} start={30} end={200} />
		</div>
	))
	.add('FlowPlayer events', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer
				{...MOCK_FLOW_PLAYER_PROPS_FULL}
				onPlay={action('play')}
				onPause={action('pause')}
				onEnded={action('ended')}
				onTimeUpdate={action('timeupdate')}
			/>
		</div>
	))
	.add('FlowPlayer Subtitles', () => (
		<div className="o-grid-col-bp3-7">
			<FlowPlayer
				{...MOCK_FLOW_PLAYER_PROPS_FULL}
				src="https://archief-media.viaa.be/viaa/TESTBEELD/d97b24406291480aac11d0728335afe011f3d283abde48649a4c4e9079428b8a/browse.mp4"
				subtitles={[
					{
						crossorigin: 'anonymous',
						default: true,
						kind: 'subtitles',
						lang: 'nl',
						id: '123',
						label: 'Nederlands',
						src: 'http://localhost:3000/subtitles/convert-srt-to-vtt/viaa/MOB/TESTBEELD/3b61046461be4b1e9f0fad19b42baa192487807cfefa4c289c0fa65d5c78195b/3b61046461be4b1e9f0fad19b42baa192487807cfefa4c289c0fa65d5c78195b.srt',
					},
				]}
			/>
		</div>
	))
	.add('FlowPlayer in a modal', () => (
		<div className="o-grid-col-bp3-7">
			<Modal isOpen size="medium">
				<ModalBody>
					<FlowPlayer
						{...MOCK_FLOW_PLAYER_PROPS_FULL}
						src="https://archief-media.viaa.be/viaa/TESTBEELD/d97b24406291480aac11d0728335afe011f3d283abde48649a4c4e9079428b8a/browse.mp4"
					/>
				</ModalBody>
			</Modal>
		</div>
	));
