import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import './ColorPicker.scss';
import { bemCls, getVariantClasses } from '../../utils';

import { ColorPickerProps } from './ColorPicker.types';

const ColorPicker: FC<ColorPickerProps> = ({
	color,
	onChange,
	disabled = false,
	className,
	rootClassName: root = 'c-color-picker',
	variants,
	style,
}) => {
	const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'disabled')]: disabled,
	});

	return (
		<div className={rootCls} style={style}>
			<div className={bem('', 'controls')}>
				<button
					className={bem('', 'trigger')}
					style={{ backgroundColor: color }}
					onClick={() => setShowColorPicker((show) => !show)}
					disabled={disabled}
				/>
				<input
					className={bem('', 'input')}
					type="text"
					value={color}
					onChange={(evt) => onChange(evt.target.value)}
					disabled={disabled}
				/>
				{showColorPicker && (
					<div className={bem('', 'picker')}>
						<HexColorPicker color={color} onChange={onChange} />
					</div>
				)}
			</div>
			{showColorPicker && (
				<button className={bem('', 'underlay')} onClick={() => setShowColorPicker(false)} />
			)}
		</div>
	);
};

export default ColorPicker;
