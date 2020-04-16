import * as React from "react";
import { getCourseInfo } from "../../api";
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
	const count = props.location.query.stucount;

	useEffect(() => {
		setName(localStorage.getItem("user_name"))
	}, [])

	const getInfo = () => {
		const params = {
			id: props.location.query.id
		}
		getCourseInfo(params).then((res) => {
			if (res.data.status === 0) {
				console.log("status")
				setDataList(res.data.content)
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	const signOut = () => {
		localStorage.removeItem("user_id");
		props.history.$push(`${props.match.url.replace(link, "signin")}`)
	}

	const columns = [
		{
			title: '日期',
			dataIndex: 'date',
			width: '90px',
			key: 'date'
		},
		{
			title: '上课时间',
			dataIndex: 'clazzNum',
			width: '75px',
			key: 'clazzNum'
		},
		{
			title: '图片1',
			key: 'action',
			render: (res) => (
				<span>
					<img style={{ width: 250, height: 200 }} src={res.images[0]["image"]} />
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[0]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片2',
			key: 'action',
			render: (res) => (
				<span>
					<img style={{ width: 250, height: 200 }} src={res.images[1]["image"]} />
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[1]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片3',
			key: 'action',
			render: (res) => (
				<span>
					<img style={{ width: 250, height: 200 }} src={res.images[2]["image"]} />
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[2]["face"]}</span>
				</span>
			)
		},
		{
			title: '应到人数',
			key: 'action',
			render: () => (
				<span>
					{count}
				</span>
			)
		},
		{
			title: '实到人数',
			dataIndex: 'studentNum',
			key: 'studentNum'
		},
		{
			title: '到课率',
			dataIndex: 'arriveRate',
			key: 'arriveRate'
		},
		{
			title: '平均抬头率',
			dataIndex: 'averFace',
			key: 'averFace'
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
					<Table className="tablebox" bordered={true} columns={columns} dataSource={dataList} pagination={false} size={"middle"} />
				</Content>
			</Layout>
		</>
	);
};
