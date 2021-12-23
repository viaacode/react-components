import React, { SVGProps } from 'react';
export const ChevronsUp = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M17 12a.997.997 0 01-.707-.293L12 7.414l-4.293 4.293a.999.999 0 11-1.414-1.414l5-5a.999.999 0 011.414 0l5 5A.999.999 0 0117 12z"
			fill="#000"
		/>
		<path
			d="M17 19a.997.997 0 01-.707-.293L12 14.414l-4.293 4.293a.999.999 0 11-1.414-1.414l5-5a.999.999 0 011.414 0l5 5A.999.999 0 0117 19z"
			fill="#000"
		/>
	</svg>
);
