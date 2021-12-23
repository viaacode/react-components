import classnames from 'classnames';
import React, { Fragment, FunctionComponent } from 'react';

import { DefaultProps } from '../../types';
import { Avatar, AvatarPropsSchema } from '../Avatar/Avatar';
import { Dropdown } from '../Dropdown/Dropdown';
import { DropdownButton, DropdownContent } from '../Dropdown/Dropdown.slots';
import { Flex } from '../Flex/Flex';
import { Spacer } from '../Spacer/Spacer';
import { Tooltip } from '../Tooltip/Tooltip';
import { TooltipContent, TooltipTrigger } from '../Tooltip/Tooltip.slots';

import './AvatarList.scss';

interface ExtendedAvatarProps extends AvatarPropsSchema {
	onClick?: (avatar: ExtendedAvatarProps) => void;
	subtitle?: string;
}

export interface AvatarListPropsSchema extends DefaultProps {
	avatars: ExtendedAvatarProps[];
	isOpen: boolean;
}

export const AvatarList: FunctionComponent<AvatarListPropsSchema> = ({
	avatars,
	className,
	isOpen = false,
}) => {
	const visibleAvatars = avatars.slice(0, 3);
	const hiddenAvatars = avatars.slice(3, avatars.length);
	const hasHiddenAvatars = hiddenAvatars && !!hiddenAvatars.length;

	return (
		<div className={classnames(className, 'c-avatar--multiple')}>
			{visibleAvatars.map((avatar, index) => (
				<Fragment key={index}>
					<Tooltip position="bottom">
						<TooltipTrigger>
							<Avatar initials={avatar.initials} />
						</TooltipTrigger>
						<TooltipContent>
							<Fragment>
								<h4 className="c-h4 u-m-0">{avatar.name}</h4>
								<span className="c-tooltip__meta">{avatar.subtitle}</span>
							</Fragment>
						</TooltipContent>
					</Tooltip>
				</Fragment>
			))}
			{hasHiddenAvatars && (
				<Dropdown
					isOpen={isOpen}
					label="Show options"
					menuWidth="fit-content"
					placement="bottom-start"
				>
					<DropdownButton>
						<button
							className="c-avatar c-avatar-dropdown"
							data-dropdown="multipleAvatarsDropdown"
						>
							+{hiddenAvatars.length}
						</button>
					</DropdownButton>
					<DropdownContent>
						<Fragment>
							{hiddenAvatars.map((avatar, index) => (
								// eslint-disable-next-line jsx-a11y/anchor-is-valid
								<a
									key={index}
									className="c-menu__item"
									onClick={() =>
										avatar.onClick ? avatar.onClick(avatar) : undefined
									}
								>
									<div className="c-menu__label">
										<Flex orientation="vertical" center>
											<Avatar
												initials={avatar.initials}
												image={avatar.image}
											/>
											<Spacer margin="left-small">
												<h4 className="c-h4 u-m-0">{avatar.name}</h4>
												{avatar.subtitle && (
													<span className="c-avatar-meta">
														{avatar.subtitle}
													</span>
												)}
											</Spacer>
										</Flex>
									</div>
								</a>
							))}
						</Fragment>
					</DropdownContent>
				</Dropdown>
			)}
		</div>
	);
};
