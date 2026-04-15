import clsx from 'clsx';
import { type FC, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import './ColorPicker.scss';
import { bemCls, getVariantClasses } from '../../utils';

import type { ColorPickerProps } from './ColorPicker.types';

function isLightColor(hex: string): boolean {
	const clean = hex.replace('#', '');
	if (clean.length < 6) return false;
	const r = parseInt(clean.slice(0, 2), 16) / 255;
	const g = parseInt(clean.slice(2, 4), 16) / 255;
	const b = parseInt(clean.slice(4, 6), 16) / 255;
	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
	return luminance > 0.6;
}

const ColorPicker: FC<ColorPickerProps> = ({
	color,
	onChange,
	bgColor,
	onBgColorChange,
	disabled = false,
	className,
	rootClassName: root = 'c-color-picker',
	variants,
	style,
	icon: Icon,
	iconSize = 16,
}) => {
	const [open, setOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<'font' | 'bg'>('font');

	// Working copies while modal is open (committed on submit or outside-click)
	const [draftFont, setDraftFont] = useState(color);
	const [draftBg, setDraftBg] = useState(bgColor ?? '#ffffff');

	const isDual = bgColor !== undefined && onBgColorChange !== undefined;

	const openModal = () => {
		setDraftFont(color);
		setDraftBg(bgColor ?? '#ffffff');
		setActiveTab('font');
		setOpen(true);
	};

	const commit = () => {
		onChange(draftFont);
		if (isDual) onBgColorChange(draftBg);
		setOpen(false);
	};

	const iconColor = color || '#000000';
	const needsStroke = isLightColor(iconColor);
	const buttonBg = bgColor && bgColor !== 'transparent' ? bgColor : undefined;

	const bem = bemCls.bind(root);
	const rootCls = clsx(className, root, getVariantClasses(root, variants), {
		[bem('', 'disabled')]: disabled,
	});

	return (
		<div className={rootCls} style={style}>
			{/* Trigger button */}
			<button
				type="button"
				className={bem('', 'trigger')}
				style={buttonBg ? { backgroundColor: buttonBg } : undefined}
				onClick={openModal}
				disabled={disabled}
				title="Kleur"
			>
				{Icon && (
					<Icon
						size={iconSize}
						color={iconColor}
						style={
							needsStroke
								? { filter: 'drop-shadow(0 0 0.5px #000) drop-shadow(0 0 0.5px #000)' }
								: undefined
						}
					/>
				)}
			</button>

			{/* Modal */}
			{open && (
				<>
					{/* Click-outside underlay — commits on close */}
					<button
						type="button"
						className={bem('', 'underlay')}
						onClick={commit}
						aria-label="Sluit kleurkiezer"
					/>
					<div className={bem('', 'modal')}>
						{/* Tabs (only shown in dual mode) */}
						{isDual && (
							<div className={bem('', 'tabs')}>
								<button
									type="button"
									className={clsx(bem('', 'tab'), {
										[bem('', 'tab--active')]: activeTab === 'font',
									})}
									onClick={() => setActiveTab('font')}
								>
									Tekst
								</button>
								<button
									type="button"
									className={clsx(bem('', 'tab'), { [bem('', 'tab--active')]: activeTab === 'bg' })}
									onClick={() => setActiveTab('bg')}
								>
									Achtergrond
								</button>
							</div>
						)}

						{/* Color picker */}
						<div className={bem('', 'picker')}>
							{activeTab === 'font' ? (
								<HexColorPicker color={draftFont} onChange={setDraftFont} />
							) : (
								<HexColorPicker color={draftBg} onChange={setDraftBg} />
							)}
						</div>

						{/* Submit */}
						<button type="button" className={bem('', 'submit')} onClick={commit}>
							Bevestig
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ColorPicker;
