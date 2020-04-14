import axios from 'axios';
import $url from './urls';

// import md5 from 'md5';

interface IConfig {
	baseURL?: string,
	headers?: IHeaders,
	timeout: number
}

interface IHeaders {
	authorization: string
}

const handleHttp = function () {
	let instance;

	init({ timeout: 5000 });

	function init(options: IConfig) {
		instance = axios.create(options);
	}

	function ajaxCommon(params) {
		const url = params.url;
		let sendParam = {};
		switch (params.method) {
			case 'put':
				sendParam = $url.initDel(params.data);
				break;
			case 'get':
				params.config.params = $url.initSearchDel(params.data);
				break;
			case 'search':
				params.method = 'post';
				sendParam = $url.initSearchDel(params.data);
				break;
			case 'post':
				if (Object.prototype.toString.call(params.data) === '[object FormData]') {
					sendParam = params.data;
				} else {
					sendParam = $url.initDel(params.data);
				}
				break;
			case 'patch':
				sendParam = $url.initDel(params.data);
				break;
			case 'delete':
				sendParam = $url.initDel(params.data);
				params.config.data = sendParam;
				break;
			default:
				break;
		}
		if (['post', 'patch', 'put'].includes(params.method)) {
			return instance[params.method](url, sendParam, params.config)
		} else {
			return instance[params.method](url, params.config)
		}
	}


	function get(url: string, params: object = {}, config: object = {}) {
		return ajaxCommon({
			method: 'get',
			url,
			data: params,
			config
		})
	}

	function post(url: string, params: object = {}, config: object = {}) {
		return ajaxCommon({
			method: 'post',
			url,
			data: params,
			config
		})
	}

	function put(url: string, params: object = {}, config: object = {}) {
		return ajaxCommon({
			method: 'put',
			url,
			data: params,
			config
		})
	}

	function patch(url: string, params: object = {}, config: object = {}) {
		return ajaxCommon({
			method: 'patch',
			url,
			data: params,
			config
		})
	}

	function del(url: string, params: object = {}, config: object = {}) {
		return ajaxCommon({
			method: 'delete',
			url,
			data: params,
			config
		})
	}

	function search(url: string, params: object = {}, config: object = {}) {
		return ajaxCommon({
			method: 'search',
			url,
			data: params,
			config
		})
	}

	function getAjaxInstance() {
		instance.$get = get;
		instance.$post = post;
		instance.$put = put;
		instance.$patch = patch;
		instance.$del = del;
		instance.$search = search;
		return instance;
	}

	return {
		init,
		$post: post,
		$put: put,
		$get: get,
		$del: del,
		$patch: patch,
		$search: search,
		getAjaxInstance
	}
}();

export default handleHttp
