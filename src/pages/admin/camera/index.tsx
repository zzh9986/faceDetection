import * as React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Button, Alert } from "antd";
import {analyzeCamera} from "../../../api";
import { func } from "prop-types";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default props => {
	const { useState, useEffect } = React;
	const [admin, setAdmin] = useState<string>("");
	const [id, setId] = useState(0);
	const [studentNum, setStudentNum] = useState(0);
	const [num, setNum] = useState(0);

	useEffect(() => {
		setAdmin(localStorage.getItem("admin_name"))
	}, [])

	const signOut = () => {
		localStorage.removeItem("admin_name");
		localStorage.removeItem("admin_id");
		props.history.$push(`/index/signin`)
	}

	const submit = () => {
		const params = {
			id: id,
			date: `${new Date().getFullYear()}` + '-' + `${new Date().getMonth() +1}` + '-' + `${new Date().getDate()}` ,
			studentNum: studentNum,
			num: num
		}
		analyzeCamera(params).then((res) => {
			console.log(res)
		}).catch(() => {
			<Alert message="接口返回错误" type="error" showIcon />
		})
	}

	const getCamera = () => {
		// const video = document.getElementById("camera")
		navigator.mediaDevices.getUserMedia({
			audio: true, 
			video: { width: 1280, height: 720 }
		}).then((res) => {
			const video = document.querySelector('video')
  			video.srcObject = res;
  			video.onloadedmetadata = function(e) {
				  console.log(e)
  			  video.play();
  			};
		})


		let mediaRecorder;
		  let timer;
		  let n =0;
      	const stopButton = document.getElementById("stop");
      	const startButton = document.getElementById("start");
		
      	navigator.mediaDevices.getUserMedia({
      	    audio: true,
      	    video: true,
      	}).then(stream => {
      	    let liveVideo = document.querySelector("video");
      	    // liveVideo.src = URL.createObjectURL(stream); // 你会看到一些警告
      	    liveVideo.srcObject = stream;
      	    liveVideo.play();
			
      	    stopButton.addEventListener("click", () => {
				clearInterval(timer);
				n = 0;
				if (mediaRecorder) {
				  mediaRecorder.stop();
				} else {
				  alert("还没有开始。");
				}
			  });
      	    startButton.addEventListener("click", e => {
				const timerEl = document.querySelector(".timer");
				timer = setInterval(() => {
				  n += 1;
				  timerEl.textContent = `${n}s`;
				}, 1000);
      	      	let recordedChunks = [];
      	  		mediaRecorder = new MediaRecorder(stream);
      	  		mediaRecorder.start();

      	  		mediaRecorder.addEventListener("dataavailable", function(e) {
      	  		  if (e.data.size > 0) recordedChunks.push(e.data);
      	  		});
				
      	  		mediaRecorder.addEventListener("stop", function() {
					let downloadLink = document.createElement("a");
					downloadLink.href = URL.createObjectURL(
					  new Blob(recordedChunks, {
						type: "application/video",
					  })
					);
					// downloadLink.download = 'live.webm';
					downloadLink.download = "live.mp4";
					// downloadLink.download = 'live.mp4';
					downloadLink.click();
      	  		});
				
      	  		mediaRecorder.addEventListener("start", e => {
      	  		});
      	    });
      	  });

	}

	useEffect(() => {
		getCamera()
	}, [])

	// useEffect(() => {
	// 	setId(1)
	// 	setStudentNum(2)
	// 	setNum(3)
	// 	setFile('aa')
	// })

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
						<Button type="primary" style={{marginLeft: 26, marginBottom: 30}} id="start">
							开始录制视频
						</Button>
						<Button type="primary" style={{marginLeft: 26, marginBottom: 30}} id="stop">
							结束录制视频
						</Button><br/>
						<p>已录制 <span className="timer"></span></p>
						<video style={{width: 650,height: 350}} src="" id="camera"></video><br/>
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
