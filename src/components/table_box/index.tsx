import * as React from 'react';
import classnames from 'classnames';

interface IProps {
	isLoading: boolean,
	className?: string,
	style?: object,
	children?: object,
	type?: string,
	bigLeftRange?: boolean
}

const TableBox = (props: IProps) => (
	<div className={classnames(
		props.type === 'modal' ? 'table-box-modal' : 'table-box',
		props.bigLeftRange && 'big-left-range',
		props.className)}
		style={{ ...props.style }}>
		{
			props.isLoading ?
				<div className="table-loading-box">加载中</div> :
				props.children
		}
	</div>
)

export default TableBox;
