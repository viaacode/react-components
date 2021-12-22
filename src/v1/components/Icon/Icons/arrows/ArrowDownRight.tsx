import React, { SVGProps } from 'react';
export const ArrowDownRight = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M17 18a.997.997 0 01-.707-.293l-10-10a.999.999 0 111.414-1.414l10 10A.999.999 0 0117 18z"
			fill="#000"
		/>
		<path d="M17 18H7a1 1 0 110-2h9V7a1 1 0 112 0v10a1 1 0 01-1 1z" fill="#000" />
	</svg>
);
