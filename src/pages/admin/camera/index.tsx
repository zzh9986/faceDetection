import * as React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Button, Alert } from "antd";
import {analyzeCamera} from "../../../api";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default props => {
	const { useState, useEffect } = React;
	const [admin, setAdmin] = useState<string>("");
	const [id, setId] = useState(0);
	const [studentNum, setStudentNum] = useState(0);
	const [num, setNum] = useState(0);
	const [file, setFile] = useState("");
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);

	useEffect(() => {
		setAdmin(localStorage.getItem("admin_name"))
	}, [])

	const signOut = () => {
		localStorage.removeItem("admin_name");
		localStorage.removeItem("admin_id");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
	}

	const submit = () => {
		const params = {
			id,
			date: `${new Date().getFullYear()}` + '-' + `${new Date().getMonth() +1}` + '-' + `${new Date().getDate()}` ,
			studentNum,
			num,
			file
		}
		analyzeCamera(params).then((res) => {
			console.log(res)
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

	useEffect(() => {
		setId(1)
		setStudentNum(2)
		setNum(3)
		setFile('aa')
	})

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
        			  defaultSelectedKeys={['3']}
        			  defaultOpenKeys={['sub1']}
        			  style={{ height: '100%', borderRight: 0 }}
        			>
        			  <SubMenu key="sub1" title="管理系统">
					  	<Menu.Item key="1" onClick={() => {
							props.history.$push('/index/admin/detail')
						}}>授课详情</Menu.Item>
						<Menu.Item key="2" onClick={() => {
							props.history.$push('/index/admin/search')
						}}>搜索课程</Menu.Item>
        			    <Menu.Item key="3" onClick={() => {
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
      				    课程ID：&nbsp;<Input placeholder="请输入课程ID" style={{width: 230,marginLeft: 40,marginBottom: 30}} onChange={(e) => {
							  setId(Number(e.target.value))
						  }}/><br/>
						课程节数：&nbsp;&nbsp;&nbsp;&nbsp;第<Input placeholder="请输入课程节数" style={{width: 230,marginLeft: 0,marginBottom: 30}} onChange={(e) => {
							setNum(Number(e.target.value))
						}} />节课<br/>
						应到人数：&nbsp;<Input placeholder="请输入应到人数" style={{width: 230,marginLeft: 26, marginBottom: 30}} onChange={(e) => {
							setStudentNum(Number(e.target.value))
						}} /><br/>
						录制视频：&nbsp;
						<Button type="primary" style={{marginLeft: 26, marginBottom: 80}}>
							录制视频
						</Button><br/>
						<Button type="primary" onClick={() => {
							submit()
						}}>
							提交
						</Button>
      				  </Content>
      				</Layout>
				</Layout>
			</Layout>
		</>
	);
};
