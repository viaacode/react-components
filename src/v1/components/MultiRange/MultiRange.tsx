import classnames from 'classnames';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getTrackBackground, Range } from 'react-range';

import { DefaultProps } from '../../types';
import { TextInput } from '../TextInput/TextInput';

import './MultiRange.scss';

export interface MultiRangePropsSchema extends DefaultProps {
	id?: string;
	disabled?: boolean;
	values?: number[];
	step?: number;
	min?: number;
	max?: number;
	allowOverlap?: boolean;
	showNumber?: boolean;
	onChange?: (values: number[]) => void;
}

export const MultiRange: FunctionComponent<MultiRangePropsSchema> = ({
	className,
	id,
	disabled = false,
	values = [0, 100],
	step = 0.1,
	min = 0,
	max = 100,
	allowOverlap = false,
	showNumber = false,
	onChange = () => null,
}) => {
	const [inputText, setInputText] = useState<string>(values[0] ? String(values[0]) : '0');
	const [tempValues, setTempValues] = useState<number[]>(values);

	useEffect(() => {
		setTempValues(values);
	}, [values]);

	const handleChange = (values: number[]) => {
		setInputText(String(values[0]));
		setTempValues(values);
	};

	const handleInputChanged = (value: string) => {
		try {
			setInputText(value);
			const val = parseInt(value, 10);
			if (Number.isFinite(val)) {
				const newValue = Math.min(Math.max(val, min), max);
				onChange([newValue]);
				setInputText(String(newValue));
			}
		} catch (err) {
			console.error('Multirange value must be number');
		}
	};

	const classes = classnames('c-input-range', className, { 'c-input-range__disabled': disabled });

	const sortedValues = [...values];
	sortedValues.sort((a: number, b: number) => a - b);

	return (
		<div id={id} className={classes}>
			<Range
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
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: '36px',
							display: 'flex',
							width: '100%',
						}}
					>
						<div
							ref={props.ref}
							style={{
								height: '8px',
								width: '100%',
								borderRadius: '4px',
								background: getTrackBackground({
									min,
									max,
									values: sortedValues,
									colors:
										values.length === 1
											? ['hsl(190, 80%, 40%)', 'rgb(196, 196, 196)']
											: [
													'rgb(196, 196, 196)',
													'hsl(190, 80%, 40%)',
													'rgb(196, 196, 196)',
											  ],
								}),
								alignSelf: 'center',
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props }) => (
					<div
						{...props}
						style={{
							...props.style,
							height: '40px',
							width: '40px',
						}}
					/>
				)}
			/>
			{showNumber && <TextInput value={inputText} onChange={handleInputChanged} />}
		</div>
	);
};
