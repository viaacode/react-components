import { FlowplayerCommand } from './FlowPlayer.types';

const MESSAGE_TYPE = 'avo.videoplayer';

/**
 * Send a message to the parent window.
 */
function sendMessage(message: FlowplayerCommand) {
	window.parent.postMessage({ _type: MESSAGE_TYPE, ...message }, '*');
}

export function registerCommands(videoPlayer: HTMLVideoElement): void {
	// Listen and respond to commands from the parent window.
	window.addEventListener('message', async (event) => {
		if (event.data._type !== MESSAGE_TYPE) {
			return;
		}

		const message = event.data;
		try {
			switch (message.command) {
				case 'initialize':
					// Notify the parent window of future state changes in the video player.
					videoPlayer.addEventListener('play', () =>
						sendMessage({ event: 'state_change', payload: { state: 'playing' } })
					);

					videoPlayer.addEventListener('pause', () =>
						sendMessage({ event: 'state_change', payload: { state: 'paused' } })
					);

					videoPlayer.addEventListener('ended', () =>
						sendMessage({ event: 'state_change', payload: { state: 'ended' } })
					);

					videoPlayer.addEventListener('error', () =>
						sendMessage({
							event: 'error',
							payload: { code: 'unknown', error: 'error' },
						})
					);

					// Confirm that the player is initialized and ready to accept
					// further commands.
					sendMessage({ event: 'initialized', result: {} });
					break;

				case 'play':
					videoPlayer.play();
					break;

				case 'pause':
					videoPlayer.pause();
					break;

				case 'set_current_time':
					videoPlayer.currentTime = message.payload.currentTime;
					sendMessage({
						event: message.command,
						result: { currentTime: videoPlayer.currentTime },
					});
					break;

				case 'set_playback_rate':
					videoPlayer.playbackRate = message.payload.playbackRate;
					sendMessage({
						event: message.command,
						result: { playbackRate: videoPlayer.playbackRate },
					});
					break;

				case 'get_current_time':
					sendMessage({
						event: message.command,
						result: { currentTime: videoPlayer.currentTime },
					});
					break;

				case 'get_playback_rate':
					sendMessage({
						event: message.command,
						result: { playbackRate: videoPlayer.playbackRate },
					});
					break;

				case 'set_muted':
					videoPlayer.muted = message.payload.muted;
					sendMessage({ event: message.command, result: { muted: videoPlayer.muted } });
					break;

				case 'get_duration':
					sendMessage({
						event: message.command,
						result: { duration: videoPlayer.duration },
					});
					break;

				case 'get_state': {
					let state;
					if (videoPlayer.paused) {
						state = 'paused';
					} else if (videoPlayer.ended) {
						state = 'ended';
					} else {
						state = 'playing';
					}
					sendMessage({ event: message.command, result: { state: state } });
					break;
				}

				default:
					break;
			}
		} catch (error) {
			console.error(error);
		}
	});

	// Notify the parent window that the player is ready to
	// accept the `initialize` command.
	sendMessage({ event: 'ready' });
}
