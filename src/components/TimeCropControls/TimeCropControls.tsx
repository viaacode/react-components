import { clsx } from 'clsx';
import { type FC, useEffect, useState, useCallback } from 'react';
import {
	formatDurationHoursMinutesSeconds,
	formatDurationMinutesSeconds,
	getValidStartAndEnd,
	parseDuration,
} from '../../utils';
import { clamp } from '../../utils/clamp';
import MultiRange from '../MultiRange/MultiRange';
import { TextInput } from '../TextInput';
import { TimeCropControlsErrors, type TimeCropControlsProps } from './TimeCropControls.types';

const TimeCropControls: FC<TimeCropControlsProps> = ({
	startTime,
	endTime,
	minTime,
	maxTime,
	disabled,
	onChange,
	onError,
	className,
	trackColor,
	highlightColor,
	allowStartAndEndToBeTheSame,
	skipHourFormatting,
	correctWrongTimeInput,
}) => {
	const formatDuration = useCallback(
		(numSeconds: number | null | undefined) => {
			if (skipHourFormatting) {
				return formatDurationMinutesSeconds(numSeconds);
			}
			return formatDurationHoursMinutesSeconds(numSeconds);
		},
		[skipHourFormatting]
	);

	const parseAndClampDuration = useCallback(
		(duration: string) => {
			return clampDuration(parseDuration(skipHourFormatting ? `00:${duration}` : duration));
		},
		[skipHourFormatting]
	);

	const [fragmentStartString, setFragmentStartString] = useState<string>(formatDuration(startTime));
	const [fragmentEndString, setFragmentEndString] = useState<string>(formatDuration(endTime));

	const clampDuration = (value: number): number => {
		return clamp(value, minTime, maxTime);
	};

	useEffect(() => {
		setFragmentStartString(formatDuration(startTime));
		setFragmentEndString(formatDuration(endTime));
	}, [startTime, endTime, formatDuration]);

	const onUpdateMultiRangeValues = (values: number[]) => {
		onChange(values[0], values[1]);
	};
	const updateStartAndEnd = (type: 'start' | 'end', value?: string) => {
		if (value) {
			// onChange event
			if (type === 'start') {
				setFragmentStartString(value);
			} else {
				setFragmentEndString(value);
			}

			const regex = skipHourFormatting ? /[0-9]{2}:[0-9]{2}/ : /[0-9]{2}:[0-9]{2}:[0-9]{2}/;

			if (regex.test(value)) {
				// full duration
				if (type === 'start') {
					let newStartTime = parseAndClampDuration(value);

					if (correctWrongTimeInput && newStartTime > maxTime) {
						newStartTime = maxTime;
						setFragmentStartString(formatDuration(newStartTime));
					}

					if (newStartTime > (endTime || maxTime)) {
						onChange(newStartTime, newStartTime);
					} else {
						onChange(newStartTime, endTime);
					}
				} else {
					let newEndTime = parseAndClampDuration(value);

					if (correctWrongTimeInput && newEndTime > maxTime) {
						newEndTime = maxTime;
						setFragmentEndString(formatDuration(newEndTime));
					}

					if (newEndTime < (startTime || minTime)) {
						onChange(newEndTime, newEndTime);
					} else {
						onChange(startTime, newEndTime);
					}
				}
			}
			// else do nothing yet, until the user finishes the time entry
		} else {
			// on blur event

			const regex = skipHourFormatting
				? /[0-9]{1,2}:[0-9]{1,2}/
				: /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/;

			if (type === 'start') {
				if (regex.test(fragmentStartString)) {
					let newStartTime = parseAndClampDuration(fragmentStartString);

					if (correctWrongTimeInput && newStartTime > maxTime) {
						newStartTime = maxTime;
						setFragmentStartString(formatDuration(newStartTime));
					}

					if (newStartTime > (endTime || maxTime)) {
						onChange(newStartTime, newStartTime);
					} else {
						onChange(newStartTime, endTime);
					}
				} else {
					const newStartTime = 0;
					onChange(newStartTime, endTime);
					if (correctWrongTimeInput) {
						setFragmentStartString(formatDuration(newStartTime));
					}
					onError(TimeCropControlsErrors.WRONG_FORMAT_START_DATE);
				}
			} else {
				if (regex.test(fragmentEndString)) {
					let newEndTime = parseAndClampDuration(fragmentEndString);

					if (correctWrongTimeInput && newEndTime > maxTime) {
						newEndTime = maxTime;
						setFragmentEndString(formatDuration(newEndTime));
					}

					if (newEndTime < (startTime || minTime)) {
						onChange(newEndTime, newEndTime);
					} else {
						onChange(startTime, newEndTime);
					}
				} else {
					const newEndTime = 0;
					onChange(startTime, newEndTime);
					if (correctWrongTimeInput) {
						setFragmentEndString(formatDuration(newEndTime));
					}
					onError(TimeCropControlsErrors.WRONG_FORMAT_END_DATE);
				}
			}
		}
	};

	const [start, end] = getValidStartAndEnd(
		startTime || minTime,
		endTime || maxTime,
		maxTime,
		!allowStartAndEndToBeTheSame
	);

	return (
		<div className={clsx('c-time-crop-controls', className)}>
			<TextInput
				value={fragmentStartString}
				disabled={disabled}
				maxLength={skipHourFormatting ? 'mm:ss'.length : 'HH:mm:ss'.length}
				onBlur={() => updateStartAndEnd('start')}
				onChange={(event) => updateStartAndEnd('start', event.target.value)}
			/>
			<div className="m-multi-range-wrapper">
				<MultiRange
					trackColor={trackColor}
					highlightColor={highlightColor}
					values={[start || minTime, end || maxTime]}
					disabled={disabled}
					onChange={onUpdateMultiRangeValues}
					min={minTime}
					max={Math.max(maxTime, minTime + 1)} // Avoid issues with min === 0 and max === 0 with Range library
					step={1}
				/>
			</div>
			<TextInput
				value={fragmentEndString}
				disabled={disabled}
				maxLength={skipHourFormatting ? 'mm:ss'.length : 'HH:mm:ss'.length}
				onBlur={() => updateStartAndEnd('end')}
				onChange={(event) => updateStartAndEnd('end', event.target.value)}
			/>
		</div>
	);
};

export default TimeCropControls;
