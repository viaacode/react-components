import clsx from 'clsx';
import { type FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import './ColorPicker.scss';
import { bemCls, getVariantClasses } from '../../utils/index.js';

import type { ColorPickerProps } from './ColorPicker.types.js';

const ColorPicker: FC<ColorPickerProps> = ({
	color,
	onChange,
	disabled = false,
	className,
	rootClassName: root = 'c-color-picker',
	variants,
	style,
	input,
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
					type="button"
					className={bem('', 'trigger')}
					style={{ backgroundColor: color }}
					onClick={() => setShowColorPicker((show) => !show)}
					disabled={disabled}
				/>
				<input
					{...input}
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
				<button
					type="button"
					className={bem('', 'underlay')}
					onClick={() => setShowColorPicker(false)}
				/>
			)}
		</div>
	);
};

export default ColorPicker;
