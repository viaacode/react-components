export interface TimeCropControlsProps {
	id: string;
	startTime: number;
	endTime: number;
	minTime: number;
	maxTime: number;
	disabled?: boolean;
	onChange: (newStartTime: number, newEndTime: number) => void;
	onError: (error: TimeCropControlsErrors) => void;
	className?: string;
	trackColor: string;
	highlightColor: string;
	allowStartAndEndToBeTheSame?: boolean;
	correctWrongTimeInput?: boolean;
	skipHourFormatting?: boolean;
	startInputAriaLabel: string;
	endInputAriaLabel: string;
	startSliderAriaLabel?: string;
	endSliderAriaLabel?: string;
	startSliderId?: string;
	endSliderId?: string;
}

export enum TimeCropControlsErrors {
	WRONG_FORMAT_START_DATE = 'WRONG_FORMAT_START_DATE',
	WRONG_FORMAT_END_DATE = 'WRONG_FORMAT_END_DATE',
}
