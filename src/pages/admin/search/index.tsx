import * as React from "react";
// import { getAdminInfo } from "../../../api";
import 'antd/dist/antd.css';
// import { Layout } from "../../components";
import {searchCourse} from "../../../api";
import { Layout, Menu, Select, Input, Button, Alert, Table } from "antd";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Option } = Select;

export default props => {
	const { useState, useEffect } = React;
	const [admin, setAdmin] = useState<string>("");
	// const [visible, setVisible] = useState<boolean>(false);
	// const [name, setName] = useState("");//课程名称
	// const [room,setRoom] = useState("");//课程教室
	// const [count,setCount] = useState("");//应到人数
	// const [id, setId] = useState("");
	const [dataList, setDataList] = useState<any>([]);
	const [type, setType] = useState("teacherName");//搜索类型
	const [value,setValue] = useState("");//搜索输入值
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);

	useEffect(() => {
		setAdmin(localStorage.getItem("admin_name"))
	}, [])

	const signOut = () => {
		localStorage.removeItem("admin_name");
		localStorage.removeItem("admin_id");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
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
					<a onClick={() => {
						localStorage.setItem("user_id", res.id)
						props.history.$push('/index/info')
					}}>查看详情</a>
				</span>
			)
		}
	];

	const column = [
		{
			title: "课程ID",
			dataIndex: 'id',
			key: 'action'
		},
		{
			title: '课程名称',
			dataIndex: 'courseName',
			key: 'action'
		},
		{
			title: '应到人数',
			dataIndex: 'studentCount',
			key: 'action'
		},
		{
			title: '课程教室',
			dataIndex: 'clazzRoom',
			key: 'action'
		},
		{
			title: '操作',
			key: 'action',
			render: (res) => (
				<span>
					<a onClick={() => {
						localStorage.setItem("class_id",res.id)
						localStorage.setItem("class_count", res.studentCount)
						props.history.$push('/index/course')
					}}>查看详情</a>
				</span>
			)
		}
	]

	const handleChange = (value) => {
		setType(value)
	}

	const search = () => {
		const params = {
			type: type,
			value: value
		}
		searchCourse(params).then((res) => {
			if (res.data.status === 0) {
				setDataList(res.data.content)
			}
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

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
        			  defaultSelectedKeys={['2']}
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
      				    <Select defaultValue="teacherName" style={{ width: 240 }} onChange={handleChange}>
      						<Option value="teacherName">按照教师姓名查找</Option>
      						<Option value="teacherId">按照教师ID查找</Option>
							<Option value="courseName">按照课程名称查找</Option>
							<Option value="courseRoom">按照教室位置查找</Option>
    					</Select>
						<Input placeholder="请输入查询内容" style={{width: 230,marginLeft: 40}} onChange={(e) => {
							setValue(e.target.value)
						}} />
						<Button type="primary" style={{marginLeft: 20}} onClick={() => {
							search()
						}}>查询</Button>
						{
							type === ("teacherName" || "teacherId") ? 
							<Table style={{marginTop: 50}} className="tablebox" bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} /> :
							<Table style={{marginTop: 50}} className="tablebox" bordered={true} columns={column} dataSource={dataList} pagination={false} size={"middle"} />
						}
      				  </Content>
      				</Layout>
				</Layout>
			</Layout>
		</>
	);
};
