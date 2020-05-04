import * as React from "react";
import { getTeacherInfo } from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import { Layout } from "../../components";
import { Table, Alert } from "antd";

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
			if (res.data.status === 0) {
				localStorage.setItem("user_name", res.data.teacherName)
				setName(res.data.teacherName)
				setDataList(res.data.content)
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
						props.history.$push(`${props.match.url.replace(link, `course`)}`)
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
			<div className="header">
				<p className="tip">您好，{name}</p>
				<a className="signout" onClick={signOut}>退出</a>
			</div>
			<Layout>
				<Content>
					<Table rowClassName={"tablecell"} bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} />
				</Content>
			</Layout>
		</>
	);
};
