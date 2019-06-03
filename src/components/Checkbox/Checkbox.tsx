import React, { Component } from 'react';

export interface CheckboxProps {
	label: string;
	id: string;
	defaultChecked?: boolean;
	onChanged?: (checked: boolean, id: string) => void;
}

export interface CheckboxState {
	checked: boolean;
}

export class Checkbox extends Component<CheckboxProps, CheckboxState> {
	constructor(props: CheckboxProps, state: CheckboxState) {
		super(props, state);
		this.state = {
			checked: props.defaultChecked || false,
		};
	}

	handleToggle = () => {
		console.log('checked: ', this.state.checked, !this.state.checked);
		const checked = !this.state.checked;
		this.setState({ checked });
		if (this.props.onChanged) {
			this.props.onChanged(checked, this.props.id);
		}
	};

	render() {
		const { defaultChecked, id, label } = this.props;

		return (
			<div className="c-checkbox" onClick={this.handleToggle}>
				<label>
					<input type="checkbox" defaultChecked={defaultChecked} key={id} name={id} id={id} />
					{label}
				</label>
			</div>
		);
	}
}
