import * as React from "react";
import { getAdminInfo } from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import { Layout } from "../../components";
import {bindCourse} from "../../api";
import { Table, Modal, Form, Input } from "antd";

const { Content } = Layout;

export default props => {
	const { useState, useEffect } = React;
	const [admin, setAdmin] = useState<string>("");
	const [visible, setVisible] = useState<boolean>(false);
	const [name, setName] = useState("");//课程名称
	const [room,setRoom] = useState("");//课程教室
	const [count,setCount] = useState("");//应到人数
	const [id, setId] = useState("");
	const [dataList, setDataList] = useState<any>([]);
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);

	useEffect(() => {
		setAdmin(localStorage.getItem("admin_name"))
	}, [])

	const getInfo = () => {
		const params = {
			adminId: localStorage.getItem("admin_id")
		}
		getAdminInfo(params).then((res) => {
			console.log(res)
			if (res.data.status === 0) {
				setDataList(res.data.content)
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	const signOut = () => {
		localStorage.removeItem("admin_name");
		localStorage.removeItem("admin_id");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
	}

	const onFinish = values => {
		console.log('Success:', values);
	  };
	
	  const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	  };

	const submit = () => {
		setVisible(false)
		const params = {
			id: id,
			clazzName: name,
			clazzRoom: room,
			studentCount: count
		}
		bindCourse(params).then((res) => {
			console.log(res)
		})
		getInfo()
	}

	const columns = [
		{
			title: '教师ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '教师姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '教授课程',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.clazz.join('、')}</span>
				</span>
			)
		},
		{
			title: '操作',
			key: 'action',
			render: (res) => (
				<span>
					<div>
						<a onClick={() => {
							setName("")
							setRoom("")
							setCount("")
							setVisible(true)
							setId(res.id)
						}}>新增课程</a>
						<Modal
							mask={false}
							maskClosable={false}
          					title="新增课程"
          					visible={visible}
          					onOk={() => {
								  submit()
							  }}
          					onCancel={() => {
								  setVisible(false)
							  }}
        				>
          					<Form
								name="basic"
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}  
							>
								<Form.Item
        							label="课程名称"
        							name="name"
        							rules={[
        							  {
        							    required: true,
        							    message: '请输入课程名称'
        							  }
        							]}
      							>
									<Input 
										value={name}
										onChange={(e) => {
											setName(e.target.value)
										}} 
									/>
      							</Form.Item>
								<Form.Item
									label="教室位置"
									name="room"
									rules={[
										{
											required: true,
											message: "请输入教室位置"
										}
									]}
								>
									<Input 
										value={room}
										onChange={(e) => {
											setRoom(e.target.value)
										}} 
									/>
      							</Form.Item>
								<Form.Item
									label="应到人数"
									name="stucount"
									rules={[
										{
											required: true,
											message: "请输入应到人数"
										}
									]}
								>
									<Input 
										value={count}
										onChange={(e) => {
											setCount(e.target.value)
										}} 
									/>
								</Form.Item>
							</Form>
        				</Modal>
					</div>
					<a onClick={() => {
						localStorage.setItem("user_id", res.id)
						props.history.$push(`${props.match.url.replace(link, `info`)}`)
						// props.history.$push(`${props.match.url.replace(link, `course?id=${res.id}&stucount=${res.studentCount}`)}`)
					}}>查看详情</a>
				</span>
			)
		}
	];

	useEffect(() => {
		getInfo()
	}, [])

	console.log(props)
	return (
		<>
			<div className="header">
				<p className="tip">您好，{admin}</p>
				<a className="signout" onClick={signOut}>退出</a>
			</div>
			<Layout>
				<Content>
					<Table className="tablebox" bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} />
				</Content>
			</Layout>
		</>
	);
};
