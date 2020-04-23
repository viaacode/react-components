import React, { SVGProps } from 'react';
export const HelpCircle = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M12 23C5.935 23 1 18.065 1 12S5.935 1 12 1s11 4.935 11 11-4.935 11-11 11zm0-20c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9z"
			fill="#000"
		/>
		<path
			d="M11.92 14a1.001 1.001 0 01-.317-1.949c.599-.203 2.316-1.018 2.316-2.051a2.002 2.002 0 00-1.336-1.891 2.005 2.005 0 00-2.551 1.223 1 1 0 01-1.886-.664 4.008 4.008 0 015.1-2.446 4.003 4.003 0 012.674 3.779c0 2.643-3.307 3.822-3.684 3.947a1 1 0 01-.316.052zM12 18a.994.994 0 01-1-1c0-.13.03-.26.08-.38.05-.13.12-.23.21-.33.37-.37 1.04-.37 1.42 0 .09.1.16.21.21.33.05.12.08.25.08.38s-.03.26-.08.38-.12.23-.21.33A.994.994 0 0112 18z"
			fill="#000"
		/>
	</svg>
);
