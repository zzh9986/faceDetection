import * as React from "react";
import { getTeacherInfo } from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import { Layout } from "../../components";
import { Table } from "antd";

const { Content } = Layout;

export default props => {
	const { useState, useEffect } = React;
	const [name, setName] = useState<string>("");
	const [dataList, setDataList] = useState<any>([]);
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);
	const getInfo = () => {
		const params = {
			userId: localStorage.getItem("user_id")
		}
		getTeacherInfo(params).then((res) => {
			console.log(res)
			if (res.data.status === 0) {
				localStorage.setItem("user_name", res.data.teacherName)
				setName(res.data.teacherName)
				setDataList(res.data.content)
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	const signOut = () => {
		localStorage.removeItem("user_id");
		localStorage.removeItem("user_name");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
	}

	console.log(dataList)

	const columns = [
		{
			title: '课程ID',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '课程名称',
			dataIndex: 'courseName',
			key: 'courseName'
		},
		{
			title: '应到人数',
			dataIndex: 'studentCount',
			key: 'studentCount'
		},
		{
			title: '课程教室',
			dataIndex: 'clazzRoom',
			key: 'clazzRoom'
		},
		{
			title: '操作',
			key: 'action',
			render: (res) => (
				<span>
					<a onClick={() => {
						props.history.$push(`${props.match.url.replace(link, `course?id=${res.id}&stucount=${res.studentCount}`)}`)
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
				<p className="tip">您好，{name}</p>
				<a className="signout" onClick={signOut}>退出</a>
			</div>
			<Layout>
				<Content>
					<Table bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} />
				</Content>
			</Layout>
		</>
	);
};
