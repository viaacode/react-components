import React, { SVGProps } from 'react';
export const EyeOff = (props: SVGProps<SVGSVGElement>) => (
	<svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
		<g clipPath="url(#eye-off_svg__clip0)" fill="#000">
			<path d="M12.016 21C4.47 21 .28 12.796.106 12.447a1.003 1.003 0 01.012-.92 19.329 19.329 0 015.334-6.262 1 1 0 011.215 1.59A17.315 17.315 0 002.144 12C3.084 13.613 6.626 19 12 19a9 9 0 005.334-1.855 1.001 1.001 0 011.213 1.59A11.005 11.005 0 0112.017 21zm8.823-4.81a1 1 0 01-.765-1.643A17.462 17.462 0 0021.856 12c-.938-1.611-4.48-7-9.856-7-.605.034-1.26.07-1.872.214a1 1 0 11-.456-1.947c.762-.178 1.523-.301 2.33-.267 7.53 0 11.718 8.204 11.893 8.553a.998.998 0 01-.013.919 19.568 19.568 0 01-2.276 3.362 1.002 1.002 0 01-.767.356zm-8.917-.115A3.975 3.975 0 019.198 15a3.972 3.972 0 01-1.27-2.785 3.977 3.977 0 011.268-3.068 1.001 1.001 0 011.366 1.462 1.993 1.993 0 00-.637 1.535c.02.534.245 1.028.635 1.393.392.364.92.56 1.434.535a1.987 1.987 0 001.393-.635A1 1 0 1114.85 14.8a3.984 3.984 0 01-2.928 1.274z" />
			<path d="M23 24a.997.997 0 01-.707-.293l-22-22A.999.999 0 111.707.293l22 22A.999.999 0 0123 24z" />
		</g>
		<defs>
			<clipPath id="eye-off_svg__clip0">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);