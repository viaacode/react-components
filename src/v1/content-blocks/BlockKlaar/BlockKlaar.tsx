import classnames from 'classnames';
import moment from 'moment';
import 'moment/locale/nl-be';
import React, { FunctionComponent } from 'react';

import { DefaultProps } from '../../types';

import './BlockKlaar.scss';

moment.locale('nl-be');

export interface BlockKlaarProps extends DefaultProps {
	className?: string;
	date: string;
	titles: string[];
}

export const BlockKlaar: FunctionComponent<BlockKlaarProps> = ({ className, date, titles }) => (
	<div className={classnames(className, 'klaar-header')} role="banner">
		<div className="klaar-header__logo">
			<span>KLAAR</span>
		</div>
		{date && <div className="klaar-header__date">{moment(date).format('LL')}</div>}
		<div className="klaar-header__titles">{(titles || []).join(' • ')}</div>
	</div>
);
