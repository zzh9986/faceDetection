import * as React from "react";
import { getAdminInfo } from "../../../api";
import 'antd/dist/antd.css';
import "./index.scss";
// import { Layout } from "../../components";
import {bindCourse} from "../../../api";
import { Table, Modal, Form, Input, Layout, Menu, Alert, Select } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

export default props => {
	const { useState, useEffect } = React;
	const [admin, setAdmin] = useState<string>("");
	const [visible, setVisible] = useState<boolean>(false);
	const [name, setName] = useState("");//课程名称
	const [room,setRoom] = useState("");//课程教室
	const [count,setCount] = useState("");//应到人数
	const [xiaoqu,setXiaoqu] = useState("" || "dongqu");//校区
	const [clazzs,setClazzs] = useState("");//教学班组成
	const [xingzhi,setXingzhi] = useState("" || "bixiu");//教学班性质
	const [credit,setCredit] = useState(0);//学分
	const [id, setId] = useState("");
	const [dataList, setDataList] = useState<any>([]);

	useEffect(() => {
		setAdmin(localStorage.getItem("admin_name"))
	}, [])

	const getInfo = () => {
		const params = {
			adminId: localStorage.getItem("admin_id")
		}
		getAdminInfo(params).then((res) => {
			if (res.data.status === 0) {
				setDataList(res.data.content)
			}
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

	const signOut = () => {
		localStorage.removeItem("admin_name");
		localStorage.removeItem("admin_id");
		props.history.$push(`/index/signin`)
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
			studentCount: Number(count),
			xiaoqu,
			xingzhi,
			credit,
			clazzs
		}
		bindCourse(params).then(() => {
			getInfo()
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
		
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
									label="校区"
									name="xiaoqu"
									rules={[
										{
											required: true
										}
									]}
								>
									<Select defaultValue="dongqu" style={{ width: 240 }} onChange={(v) => {
										setXiaoqu(v)
									}}>
      									<Option value="dongqu">长安校区东区</Option>
      									<Option value="xiqu">长安校区西区</Option>
										<Option value="yanta">雁塔校区</Option>
    								</Select>
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
									label="教学班人数"
									name="stucount"
									rules={[
										{
											required: true,
											message: "请输入教学班人数"
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
								<Form.Item
									label="教学班组成"
									name="clazzs"
									rules={[
										{
											required: true,
											message: "请输入教学班组成"
										}
									]}
								>
									<Input 
										value={clazzs}
										onChange={(e) => {
											setClazzs(e.target.value)
										}} 
									/>
								</Form.Item>
								<Form.Item
									label="课程性质"
									name="xingzhi"
									rules={[
										{
											required: true,
											message: "请输入课程性质"
										}
									]}	
								>
									<Select defaultValue="bixiu" style={{ width: 240 }} onChange={(v) => {
										console.log("value",v)
										setXingzhi(v)
									}}>
      									<Option value="bixiu">必修</Option>
      									<Option value="xuanxiu">选修</Option>
    								</Select>
								</Form.Item>
								<Form.Item
									label="学分"
									name="credit"
									rules={[
										{
											required: true,
											message: "请输入学分"
										}
									]}
								>
									<Input 
										value={credit}
										onChange={(e) => {
											setCredit(Number(e.target.value))
										}} 
									/>
								</Form.Item>
							</Form>
        				</Modal>
					</div>
					<a onClick={() => {
						localStorage.setItem("user_id", res.id)
						props.history.$push('/index/info')
						// props.history.$push(`${props.match.url.replace(link, `course?id=${res.id}&stucount=${res.studentCount}`)}`)
					}}>查看详情</a>
				</span>
			)
		}
	];

	useEffect(() => {
		getInfo()
	}, [])

	return (
		<>
			<Layout>
				<Header className="header">
					<p className="tip">您好，{admin}</p>
					<a className="signout" onClick={signOut}>退出</a>
				</Header>
				<Layout>
      				<Sider width={200} className="site-layout-background">
        			<Menu
        			  mode="inline"
        			  defaultSelectedKeys={['1']}
        			  defaultOpenKeys={['sub1']}
        			  style={{ height: '100%', borderRight: 0 }}
        			>
        			  <SubMenu key="sub1" title="管理系统">
					  <Menu.Item key="1" onClick={() => {
							props.history.$push('/index/admin/detail')
						}}>授课详情</Menu.Item>
						<Menu.Item key="3" onClick={() => {
							props.history.$push('/index/admin/search')
						}}>搜索课程</Menu.Item>
        			    <Menu.Item key="2" onClick={() => {
							props.history.$push('/index/admin/camera')
						}}>调用摄像头</Menu.Item>
        			  </SubMenu>
        			</Menu>
      			</Sider>
      				<Layout style={{ padding: '0 24px 24px' }}>
      				  <Content
      				    className="site-layout-background"
      				    style={{
      				      padding: 24,
      				      margin: 0,
      				      minHeight: 280
      				    }}
      				  >
      				    <Table className="tablebox" bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} />
      				  </Content>
      				</Layout>
				</Layout>
			</Layout>
		</>
	);
};
