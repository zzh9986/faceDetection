import * as React from "react";
import "./index.scss";

export default props => {
	// const { useState } = React;
	console.log(props)
	return (
		<>
			<div className="header">
				<p className="tip">您好,史潇哲</p>
				<a className="signout">退出</a>
			</div>
		</>
	);
};
