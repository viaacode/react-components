import React, { SVGProps } from 'react';
export const Terminal = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			d="M4 18a.999.999 0 01-.707-1.707L8.586 11 3.293 5.707a.999.999 0 111.414-1.414l6 6a.999.999 0 010 1.414l-6 6A.997.997 0 014 18zM20 20h-8a1 1 0 110-2h8a1 1 0 110 2z"
			fill="#000"
		/>
	</svg>
);
