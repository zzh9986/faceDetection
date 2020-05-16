import * as React from "react";
import { getTeacherInfo, searchInfo } from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import { Layout } from "../../components";
import { Table, Alert, Avatar, Input, Select, Button } from "antd";

const { Content } = Layout;
const {Option} = Select;

export default props => {
	const { useState, useEffect } = React;
	const [name, setName] = useState<string>("");
	const [dataList, setDataList] = useState<any>([]);
	const [pic, setPic] = useState<string>("");
	const [boxFlag,setboxFlag] = useState<boolean>(false);
	const [type, setType] = useState("courseName");//搜索类型
	const [value,setValue] = useState("");//搜索输入值
	// const [sname,setSname] = useState<string>("");
	// const [sxingzhi,setXingzhi] = useState<string>("");
	// const [sxiaoqu,setXiaoqu] = useState<string>("");
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);
	const getInfo = () => {
		const params = {
			userId: localStorage.getItem("user_id")
		}
		getTeacherInfo(params).then((res) => {
			if (res.data.status === 0) {
				localStorage.setItem("user_name", res.data.teacherName)
				setName(res.data.teacherName)
				setDataList(res.data.content)
				setPic(res.data.pic)
				localStorage.setItem("pic",res.data.pic)
			}
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

	const signOut = () => {
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_name");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
	}

	const columns = [
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
			title: '教学班人数',
			dataIndex: 'studentCount',
			key: 'action'
		},
		{
			title: '校区',
			dataIndex: 'xiaoqu',
			key: 'action'
		},
		{
			title: '上课地点',
			dataIndex: 'clazzRoom',
			key: 'action'
		},
		{
			title: '教学班组成',
			dataIndex: 'clazzs',
			key: 'action'
		},
		{
			title: '课程性质',
			dataIndex: 'xingzhi',
			key: 'action'
		},
		{
			title: '学分',
			dataIndex: 'credit',
			key: 'action'
		},
		{
			title: '任课教师',
			dataIndex: 'belong',
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
						props.history.$push(`${props.match.url.replace(link, `course`)}`)
					}}>查看详情</a>
				</span>
			)
		}
	];

	const boxDisplay = () => {
		setboxFlag(!boxFlag)
	}

	const search = () => {
		const params = {
			type: type,
			value: value,
			id: localStorage.getItem("user_id")
		}
		searchInfo(params).then((res) => {
			if (res.data.status === 0) {
				setDataList(res.data.content)
			}
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

	useEffect(() => {
		getInfo()
	}, [])

	return (
		<>
			<div className="infoheader">
				<p className="tip">您好，{name}</p>
				<div onClick={boxDisplay}>
					<Avatar className={"antavatar"} src={pic}/>
				</div>
				{
					!boxFlag ? "" : <div className="hoverbox">
					<ul>
						<li className="personcenter" onClick={() => {
							props.history.$push("/index/personal")
						}}>个人中心</li>
						<li className="signout" onClick={signOut}>退出</li>
					</ul>
				</div>
				}
			</div>
			<Layout>
				<Content>
					<div className="searchbox">
						<Select defaultValue="courseName" style={{ width: 240 }} onChange={(v) => {
							setType(v)
						}}>
      						<Option value="courseName">按照课程名称查找</Option>
							<Option value="clazzRoom">按照上课地点查找</Option>
							<Option value="xingzhi">按照课程性质查找</Option>
							<Option value="xiaoqu">按照校区查找</Option>
    					</Select>
						<Input placeholder="请输入查询内容" style={{width: 230,marginLeft: 40}} onChange={(e) => {
							setValue(e.target.value)
						}} />
						<Button type="primary" style={{marginLeft: 20}} onClick={() => {
							search()
						}}>查询</Button>
					</div>
					<Table className="infotable" rowClassName={"tablecell"} bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} />
				</Content>
			</Layout>
		</>
	);
};
