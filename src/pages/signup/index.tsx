import * as React from "react";
import { PwdLogin } from "../../components";
import {Alert} from "antd";
import { signUp } from '../../api';
import "./index.scss";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default props => {
	const { useState } = React;
	const [username, setUserName] = useState<string>("");
	const [nameBlank, setNameBlank] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>("");
	const [idBlank, setIdBlank] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [pwdBlank, setPwdBlank] = useState<boolean>(false);
	const [errortip, setErrorTip] = useState<string>("");
	const [imageUrl,setimageUrl] = useState("");
	const [loading, setLoading] = useState(false);
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
			user_password: password,
			pic: imageUrl
		}
		signUp(params).then((res) => {
			if (res.data.status === 0) {
				props.history.$push(`${props.match.url.replace(link, "signin")}`)
			}
			if (res.data.status === -1) {
				setErrorTip(res.data.msg)
			}
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

	const uploadButton = (
		<div>
		  {loading ? <LoadingOutlined /> : <PlusOutlined />}
		  <div className="ant-upload-text">上传头像</div>
		</div>
	  );

	  function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	  }
	  
	  function beforeUpload(file) {
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
		  message.error('You can only upload JPG/PNG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
		  message.error('Image must smaller than 2MB!');
		}
		return isJpgOrPng && isLt2M;
	  }

	  const handleChange = info => {
		if (info.file.status === 'uploading') {
		  setLoading(true)
		  return;
		}
		if (info.file.status === 'done') {
		  // Get this url from response in real world.
		  getBase64(info.file.originFileObj, imageUrl =>
			{
				setimageUrl(imageUrl)
				setLoading(false)
			}
		  );
		  console.log(imageUrl)
		}
	  };

	return (
		<>
			<div className="login-wrapper">
				<div className="signup-form">
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
						<Upload
        					name="avatar"
        					listType="picture-card"
        					className="antupload"
        					showUploadList={false}
        					action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        					beforeUpload={beforeUpload}
        					onChange={(e) => {
								handleChange(e)
							}}
      					>{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</Upload>
						<button className="login-btn" onClick={handleSave}>
							注册
						</button>
					</>
				</div>
			</div>
		</>
	);
};
