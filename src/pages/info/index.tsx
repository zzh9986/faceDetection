import * as React from "react";
import { getTeacherInfo } from "../../api";
import "./index.scss";

export default props => {
	const { useState, useEffect } = React;
	const [name, setName] = useState<string>("");

	const getInfo = () => {
		const params = {
			user_id: localStorage.getItem("user_id")
		}
		getTeacherInfo(params).then((res) => {
			console.log(res)
			if (res.data.status === 0) {
				setName(res.data.teacher_name)
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	useEffect(() => {
		getInfo()
	}, [])

	console.log(props)
	return (
		<>
			<div className="header">
				<p className="tip">您好，{name}</p>
				<a className="signout">退出</a>
			</div>
		</>
	);
};
