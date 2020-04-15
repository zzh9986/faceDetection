import * as React from "react";
import { getAdminInfo } from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import { Layout } from "../../components";
import { Table } from "antd";

const { Content } = Layout;

export default props => {
	const { useState, useEffect } = React;
	const [admin, setAdmin] = useState<string>("");
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
