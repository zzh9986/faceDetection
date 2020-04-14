import * as React from "react";
import { PwdLogin } from "../../components";
import { signUp } from '../../api';
import "./index.scss";

export default props => {
	const { useState } = React;
	const [username, setUserName] = useState<string>("");
	const [nameBlank, setNameBlank] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>("");
	const [idBlank, setIdBlank] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [pwdBlank, setPwdBlank] = useState<boolean>(false);
	const [errortip, setErrorTip] = useState<string>("");
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);

	const handleSave = () => {
		if (username.trim() === "") {
			setNameBlank(true);
			return;
		}
		if (password.trim() === "") {
			setPwdBlank(true);
			return;
		}
		const params = {
			user_name: username,
			user_id: userId,
			user_password: password
		}
		signUp(params).then((res) => {
			console.log(res)
			if (res.data.status === 0) {
				props.history.$push(`${props.match.url.replace(link, "signin")}`)
			}
			if (res.data.status === -1) {
				setErrorTip(res.data.msg)
			}
		}).catch(err => {
			console.log(err)
		})
	}

	console.log(props)
	return (
		<>
			<div className="login-wrapper">
				<div className="login-form">
					<>
						{errortip && (
							<>
								<div className="wrong">
									<p className="wrongtip">{errortip}</p>
								</div>
							</>
						)}
						<p className="login-title">注册</p>
						<PwdLogin
							maxLength={11}
							className={["user-input", nameBlank ? "error" : ""].join(" ")}
							value={username}
							valueBlank={idBlank}
							placeholder="请输入姓名"
							type="text"
							onChange={value => {
								setUserName(value);
							}}
							onClick={value => {
								setUserName(value);
							}}
							setBlank={value => {
								setNameBlank(value);
							}}
							onKeyDown={handleSave}
							onKeyPress={e => e}
						/>
						<PwdLogin
							maxLength={11}
							className={["user-input", idBlank ? "error" : ""].join(" ")}
							value={userId}
							valueBlank={idBlank}
							placeholder="请输入账号"
							type="text"
							onChange={value => {
								setUserId(value);
							}}
							onClick={value => {
								setUserId(value);
							}}
							setBlank={value => {
								setIdBlank(value);
							}}
							onKeyDown={handleSave}
							onKeyPress={e => e}
						/>
						<PwdLogin
							maxLength={12}
							className={["pwd-input", pwdBlank ? "error" : ""].join(" ")}
							value={password}
							valueBlank={pwdBlank}
							placeholder="请输入密码"
							type="password"
							onChange={value => {
								setPassword(value);
							}}
							onClick={value => {
								setPassword(value);
							}}
							setBlank={value => {
								setPwdBlank(value);
							}}
							onKeyDown={handleSave}
							onKeyPress={e => e}
						/>
						<button className="login-btn" onClick={handleSave}>
							注册
						</button>
					</>
				</div>
			</div>
		</>
	);
};
