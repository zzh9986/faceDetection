import * as React from "react";
import { getTeacherInfo } from "../../api";
import "./index.scss";

export default props => {
	const { useState, useEffect } = React;
	const [name, setName] = useState<string>("");
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);

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

	const signOut = () => {
		localStorage.removeItem("user_id");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
	}

	useEffect(() => {
		getInfo()
	}, [])

	console.log(props)
	return (
		<>
			<div className="header">
				<p className="tip">您好，{name}</p>
				<a className="signout" onClick={signOut}>退出</a>
			</div>
		</>
	);
};
