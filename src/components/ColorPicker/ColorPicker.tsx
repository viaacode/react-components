import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import './ColorPicker.scss';
import { ColorPickerProps } from './ColorPicker.types';

const ColorPicker: FC<ColorPickerProps> = ({
	color,
	onChange,
	disabled = false,
	className,
	rootClassName: root = 'c-color-picker',
	style,
}) => {
	const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

	return (
		<div
			className={clsx(root, className, { 'c-color-picker__disabled': disabled })}
			style={style}
		>
			<div className="c-color-picker__controls">
				<button
					className="c-color-picker__trigger"
					style={{ backgroundColor: color }}
					onClick={() => setShowColorPicker((show) => !show)}
					{...(disabled ? { disabled } : {})}
				/>
				<input
					className="c-color-picker__input"
					type="text"
					value={color}
					onChange={(evt) => onChange(evt.target.value)}
					{...(disabled ? { disabled } : {})}
				/>
				{showColorPicker && (
					<div className="c-color-picker__picker">
						<HexColorPicker color={color} onChange={onChange} />
					</div>
				)}
			</div>
			{showColorPicker && (
				<button
					className="c-color-picker__underlay"
					onClick={() => setShowColorPicker(false)}
				/>
			)}
		</div>
	);
};

export default ColorPicker;
