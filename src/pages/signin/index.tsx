import * as React from "react";
import { PwdLogin } from "../../components";
import "./index.scss";
import { signIn } from "../../api/index";

export default props => {
	const { useState } = React;
	const [username, setUserName] = useState<string>("");
	const [nameBlank, setNameBlank] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [pwdBlank, setPwdBlank] = useState<boolean>(false);
	const [errortip, setErrorTip] = useState<string>("");
	const [type, setType] = useState<string>("");
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
		if (type === "") {
			setErrorTip("请选择用户类型")
			return;
		}
		const params = {
			userId: username,
			userPassword: password,
			type: type
		}
		signIn(params).then(res => {
			if (res.data.status === 0) {
				if (type === 'admin') {
					props.history.$push(`${props.match.url.replace(link, "admin")}`)
					localStorage.setItem("admin_id", username)
					localStorage.setItem("admin_name", res.data.adminName)
				} else {
					props.history.$push(`${props.match.url.replace(link, "info")}`)
					localStorage.setItem("user_id", username)
				}
			}
			if (res.data.status === -1) {
				setErrorTip(res.data.msg)
			}
			console.log(res)
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
						<p className="login-title">密码登录</p>
						<PwdLogin
							maxLength={11}
							className={["user-input", nameBlank ? "error" : ""].join(" ")}
							value={username}
							valueBlank={nameBlank}
							placeholder="请输入用户名"
							type="text"
							onChange={value => {
								setUserName(value);
								setErrorTip("");
							}}
							onClick={value => {
								setUserName(value);
								setErrorTip("");
							}}
							setBlank={value => {
								setNameBlank(value);
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
								setErrorTip("");
							}}
							onClick={value => {
								setPassword(value);
								setErrorTip("");
							}}
							setBlank={value => {
								setPwdBlank(value);
							}}
							onKeyDown={handleSave}
							onKeyPress={e => e}
						/>
						<div className="radiobox">
							<input type="radio" name="status" value="teacher" onChange={(e) => { setType(e.target.value) }} />教师
							<input type="radio" name="status" value="admin" className="admin"
								onChange={(e) => {
									setType(e.target.value)
								}}
							/>管理员
						</div>
						<button className="login-btn" onClick={handleSave}>
							登录
				</button>
						<p className="tip">
							没有账号，
					<a
								className="link"
								target="_blank"
								onClick={() => {
									window.open(`${props.match.url.replace(link, "signup")}`, "_self");
								}}
							>
								立即注册
					</a>
						</p>
					</>
				</div>
			</div>
		</>
	);
};
