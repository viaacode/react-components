export interface TimeCropControlsProps {
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
}

export enum TimeCropControlsErrors {
	WRONG_FORMAT_START_DATE = 'WRONG_FORMAT_START_DATE',
	WRONG_FORMAT_END_DATE = 'WRONG_FORMAT_END_DATE',
}
