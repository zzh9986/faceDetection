import * as React from "react";
import { getCourseInfo } from "../../api";
import 'antd/dist/antd.css';
import "./index.scss";
import { Layout } from "../../components";
import { Table, Alert, Popover } from "antd";

const { Content } = Layout;

export default props => {
	const { useState, useEffect } = React;
	const [name, setName] = useState<string>("");
	const [dataList, setDataList] = useState<any>([]);
	const link: string = props.match.url.substring(props.match.url.lastIndexOf("/") + 1);
	const count = localStorage.getItem("class_count")

	useEffect(() => {
		setName(localStorage.getItem("user_name"))
	}, [])

	const getInfo = () => {
		const params = {
			id: Number(localStorage.getItem("class_id"))
		}
		getCourseInfo(params).then((res) => {
			if (res.data.status === 0) {
				setDataList(res.data.content)
			}
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
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
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[0]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[0]["image"]} />
  					</Popover>
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
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[1]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[1]["image"]} />
  					</Popover>
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
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[2]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[2]["image"]} />
  					</Popover>
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
			title: '图片4',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[3]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[3]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[3]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片5',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[4]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[4]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[4]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片6',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[5]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[5]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[5]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片7',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[6]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[6]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[6]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片8',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[7]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[7]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[7]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片9',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[8]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[8]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[8]["face"]}</span>
				</span>
			)
		},
		{
			title: '图片10',
			key: 'action',
			render: (res) => (
				<span>
					<Popover content={(<img className="image" style={{ width: 280, height: 230 }} src={res.images[9]["image"]} />)}>
						<img className="image" style={{ width: 180, height: 130 }} src={res.images[9]["image"]} />
  					</Popover>
				</span>
			)
		},
		{
			title: '抬头人数',
			key: 'action',
			render: (res) => (
				<span>
					<span>{res.images[9]["face"]}</span>
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
