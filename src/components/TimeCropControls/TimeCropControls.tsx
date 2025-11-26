import { clsx } from 'clsx';
import React, { type FC, useEffect, useState } from 'react';
import {
	formatDurationHoursMinutesSeconds,
	getValidStartAndEnd,
	parseDuration,
	toSeconds,
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
}) => {
	const [fragmentStartString, setFragmentStartString] = useState<string>(
		formatDurationHoursMinutesSeconds(startTime)
	);
	const [fragmentEndString, setFragmentEndString] = useState<string>(
		formatDurationHoursMinutesSeconds(endTime)
	);

	const clampDuration = (value: number): number => {
		return clamp(value, minTime, maxTime);
	};

	useEffect(() => {
		setFragmentStartString(formatDurationHoursMinutesSeconds(startTime));
		setFragmentEndString(formatDurationHoursMinutesSeconds(endTime));
	}, [startTime, endTime]);

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
			if (/[0-9]{2}:[0-9]{2}:[0-9]{2}/.test(value)) {
				// full duration
				if (type === 'start') {
					const newStartTime = clampDuration(parseDuration(value));

					if (newStartTime > (endTime || maxTime)) {
						onChange(newStartTime, newStartTime);
					} else {
						onChange(newStartTime, endTime);
					}
				} else {
					const newEndTime = clampDuration(parseDuration(value));

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
			if (type === 'start') {
				if (/[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/.test(fragmentStartString)) {
					const newStartTime = clampDuration(parseDuration(fragmentStartString));

					if (newStartTime > (endTime || maxTime)) {
						onChange(newStartTime, newStartTime);
					} else {
						onChange(newStartTime, endTime);
					}
				} else {
					onChange(0, endTime);
					onError(TimeCropControlsErrors.WRONG_FORMAT_START_DATE);
				}
			} else {
				if (/[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/.test(fragmentEndString)) {
					const newEndTime = clampDuration(parseDuration(fragmentEndString));

					if (newEndTime < (startTime || minTime)) {
						onChange(newEndTime, newEndTime);
					} else {
						onChange(startTime, newEndTime);
					}
				} else {
					onChange(startTime, toSeconds(endTime) || 0);
					onError(TimeCropControlsErrors.WRONG_FORMAT_END_DATE);
				}
			}
		}
	};

	const [start, end] = getValidStartAndEnd(startTime || minTime, endTime || maxTime, maxTime);
	return (
		<div className={clsx('c-time-crop-controls', className)}>
			<TextInput
				value={fragmentStartString}
				disabled={disabled}
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
				disabled={disabled}
				value={fragmentEndString}
				onBlur={() => updateStartAndEnd('end')}
				onChange={(event) => updateStartAndEnd('end', event.target.value)}
			/>
		</div>
	);
};

export default TimeCropControls;
