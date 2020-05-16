import * as React from "react";
import {changeInfo, changePwd} from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import {Alert, Input, Upload, message, Button, Form, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default (props) => {
    const {useState} = React;
    const [teacherName, setTeacherName] = useState(""); 
    const [imageUrl, setimageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [oldPwd,setoldPwd] = useState("");
    const [newPwd,setNewPwd] = useState("");
    const [visible, setVisible] = useState<boolean>(false);

    console.log("props",props)

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
      
    const submit = () => {
        const params = {
            id: localStorage.getItem("user_id"),
            name: teacherName,
            pic: imageUrl === "" ? localStorage.getItem("pic") : imageUrl
        }
        changeInfo(params).then((res) => {
            console.log("res.cont",res.content)
            localStorage.setItem("user_name",res.content.name)
            localStorage.setItem("pic",res.content.pic)
        }).catch(() => {
            <Alert message="接口返回错误" type="error" showIcon />
        })
    }

    const submitPwd = () => {
		setVisible(false)
		const params = {
			id: localStorage.getItem("user_id"),
            old: oldPwd,
            new: newPwd
		}
		changePwd(params).then((res) => {
            console.log("respwd",res.data)
			if(res.data.status === -1) {
                message.error('原密码填写不一致');
            }
		}).catch(() => {
			message.error('接口返回错误');
		})
		
	}

    return(
        <>
            <div>
                <div className="personal">
                    <p className="tip">个人中心</p>
                </div>
                <div className="content">
                    <a className="detail" onClick={() => {
                        props.history.$push("/index/info")
                    }}>&gt;点击返回教室详情页面</a><br/>
                    教师 ID：<Input style={{width: 230,marginTop: 30,marginLeft: 14}} value={localStorage.getItem("user_id")} disabled={true} /><br/>
                    教师姓名：<Input placeholder="请输入修改教师姓名" style={{width: 230,marginTop: 30}} value={teacherName === "" ? localStorage.getItem("user_name") : teacherName} onChange={(e) => {
		            	setTeacherName(e.target.value)
		            }} /><br/>
                    上传头像：<Upload
                    	name="avatar"
                    	listType="picture-card"
                    	className="antload"
                    	showUploadList={false}
                    	action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    	beforeUpload={beforeUpload}
                    	onChange={(e) => {
		            		handleChange(e)
		            	}}
      	            >{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}</Upload>
                    <Button type="primary" style={{marginTop: 30,width: 100}} onClick={() => {
		            	submit()
		            }}>提交修改</Button><br/>
                    <Button style={{marginTop: 30, width: 100}} onClick={() => {
                        setoldPwd("")
                        setNewPwd("")
                        setVisible(true)
                    }}>修改密码</Button>
                    <Modal
				    	mask={false}
				    	maskClosable={false}
          		    	title="修改密码"
          		    	visible={visible}
          		    	onOk={() => {
                            submitPwd()
				    	  }}
          		    	onCancel={() => {
				    		  setVisible(false)
				    	  }}
        		    >
                        <Form
				    		name="basic"
				    	>
				    		<Form.Item
        		    			label="旧密码"
        		    			name="name"
        		    			rules={[
        		    			  {
        		    			    required: true,
        		    			    message: '请输入旧密码'
        		    			  }
        		    			]}
      			    		>
                                <Input 
                                    type="password"
				    				value={oldPwd}
				    				onChange={(e) => {
				    					setoldPwd(e.target.value)
				    				}} 
				    			/>
      			    		</Form.Item>
				    		<Form.Item
				    			label="新密码"
				    			name="room"
				    			rules={[
				    				{
				    					required: true,
				    					message: "请输入新密码"
				    				}
				    			]}
				    		>
                                <Input 
                                    type="password"
				    				value={newPwd}
				    				onChange={(e) => {
				    					setNewPwd(e.target.value)
				    				}} 
				    			/>
      			    		</Form.Item>
				    	</Form>
                    </Modal>
                </div>
            </div>
        </>
    )
}