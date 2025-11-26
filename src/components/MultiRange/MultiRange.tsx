import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';

import { getTrackBackground, Range } from 'react-range';
import type { DefaultComponentProps } from '../../types';
import { bemCls } from '../../utils';
import { noop } from '../../utils/noop';

import { TextInput } from '../TextInput';

export interface MultiRangePropsSchema extends DefaultComponentProps {
	id?: string;
	disabled?: boolean;
	values?: number[];
	step?: number;
	min?: number;
	max?: number;
	allowOverlap?: boolean;
	showNumber?: boolean;
	trackColor: string;
	highlightColor: string;
	onChange?: (values: number[]) => void;
}

const MultiRange: FC<MultiRangePropsSchema> = ({
	className,
	rootClassName: root = 'c-input-range',
	id,
	disabled = false,
	values = [0, 100],
	step = 0.1,
	min = 0,
	max = 100,
	allowOverlap = false,
	showNumber = false,
	trackColor,
	highlightColor,
	onChange = noop,
}) => {
	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, {
		[bem('', 'disabled')]: disabled,
	});

	const [inputText, setInputText] = useState<string>(values[0] ? String(values[0]) : '0');
	const [tempValues, setTempValues] = useState<number[]>(values);

	useEffect(() => {
		setTempValues(values);
	}, [values]);

	const handleChange = (values: number[]) => {
		setInputText(String(values[0]));
		setTempValues(values);
	};
	const handleInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		try {
			setInputText(value);
			const val = Number.parseInt(value, 10);
			if (Number.isFinite(val)) {
				const newValue = Math.min(Math.max(val, min), max);
				onChange([newValue]);
				setInputText(String(newValue));
			}
		} catch (_err) {
			console.error('Multirange value must be number');
		}
	};

	const sortedValues = [...values];
	sortedValues.sort((a: number, b: number) => a - b);

	return (
		<div id={id} className={rootCls}>
			<Range
				disabled={disabled}
				step={step}
				min={min}
				max={max}
				allowOverlap={allowOverlap}
				values={tempValues || values}
				onChange={handleChange}
				onFinalChange={() => {
					onChange(tempValues || values);
				}}
				renderTrack={({ props, children }) => (
					// biome-ignore lint/a11y/noStaticElementInteractions: We need the events to interact with the track
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						className={bem('track')}
					>
						<div
							ref={props.ref}
							className={bem('track-highlight')}
							style={{
								background: getTrackBackground({
									min,
									max,
									values: sortedValues,
									colors:
										values.length === 1
											? [highlightColor, trackColor]
											: [trackColor, highlightColor, trackColor],
								}),
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props }) => <div {...props} key={props.key} className={bem('thumb')} />}
			/>
			{showNumber && (
				<TextInput
					className={bem('number-input')}
					value={inputText}
					onChange={handleInputChanged}
				/>
			)}
		</div>
	);
};

export default MultiRange;
