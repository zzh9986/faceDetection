import * as React from "react";

type Props = {
	className?: string,
	placeholder?: string,
	id?: string,
	maxLength?: number,
	type?: string,
	value?: string,
	errorTip?: string,
	valueBlank?: boolean,
	onChange?: Function,
	onClick?: Function,
	onKeyDown?: Function,
	onKeyPress?: Function,
	setBlank?: Function
}

type State = {
	value?: string,
	valueBlank?: boolean,
	errorTip?: string,
	id?: string
}

export default class PwdLogin extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			value: this.props.value,
			valueBlank: this.props.valueBlank,
			errorTip: this.props.errorTip,
			id: this.props.id
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return {
			value: nextProps.value
		}
	}

	render() {
		return (
			<>
				<div className={this.props.className}>
					<input
						autoComplete="new-password"
						maxLength={this.props.maxLength}
						type={this.props.type}
						placeholder={this.props.placeholder}
						value={this.state.value}
						onChange={e => {
							const value = e.target.value;
							if (value.trim() !== '') {
								this.setState({
									valueBlank: false
								}, () => {
									this.props.setBlank(false)
								})
							}
							this.setState({
								value: value,
								errorTip: ''
							}, () => {
								this.props.onChange(value)
							})
						}}
						onKeyDown={e => {
							if (e.keyCode === 13) {
								this.props.onKeyDown(e);
								(e.target as HTMLInputElement).blur()
							}
						}}
						onKeyPress={e => {
							this.props.onKeyPress(e)
						}}
					/>
					<span
						className={this.state.value.length > 0 ? 'login-clear-btn' : ''}
						onClick={e => {
							this.setState({
								value: '',
								errorTip: ''
							}, () => {
								this.props.onClick('')
							})
							e.stopPropagation()
						}}
					/>
				</div>
			</>
		)
	}
}
