import React, { SVGProps } from 'react';
export const ChevronsUpAndDown = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<path
			fill="#000"
			d="M6 13.017c.256 0 .512.098.707.293L12 18.603l5.293-5.293a.999.999 0 111.414 1.414l-6 6a.999.999 0 01-1.414 0l-6-6A.999.999 0 016 13.017zM18 10.983a.997.997 0 01-.707-.293L12 5.397 6.707 10.69a.999.999 0 11-1.414-1.414l6-6a.999.999 0 011.414 0l6 6A.999.999 0 0118 10.983z"
		/>
	</svg>
);
