import request from "request";
import fs from "fs";
import path from "path";
import AdmZip from "adm-zip";

if(!process.env.IP){
	console.log("Cannot find server's ip");
	process.exit(1);
}

const baseUrl = `http://${process.env.IP}/configs/code_lint.zip`;

if (!fs.existsSync(path.resolve(__dirname, "./lint_logs"))) {
	fs.mkdirSync(path.resolve(__dirname, "./lint_logs"));
}

function downloadConfig() {
	const fileName = path.resolve(__dirname, `./lint_configs/code_lint.zip`);
	const target = path.resolve(__dirname, `./lint_configs`);
	const req = request.get(baseUrl, { timeout: 3000 }).on("error", (error) => {
		console.error(error);
		process.exit(1);
	}).on("response",(response=>{
		if (response.statusCode !== 200) {
			console.error("Fetch lint configs failed");
			process.exit(1);
		}else{
			req.on("data",data=>{
				fs.appendFileSync(fileName, data);
			}).on("end", () => {
				const zip = new AdmZip(fileName);
				zip.extractAllTo(target, true);
				fs.unlinkSync(fileName);
				console.log('Download lint configs completed');
			}).on("error", () => {
				console.error("Fetch lint configs failed");
				process.exit(1);
			})
		}
	}));

}

downloadConfig();
