import * as queryString from 'query-string';

export default {
	init(obj: object) {
		const _obj: object = {};

		if (Object.prototype.toString.call(obj) !== '[object Object]' || JSON.stringify(obj) === '{}') {
			return '';
		}

		for (const i in obj) {
			if (obj[i] !== 0 && obj[i] === 'undefined') continue;
			_obj[i] = obj[i];
		}

		return '?' + queryString.stringify(_obj);
	},
	unInit(url: string) {
		if (!url) return {};
		return queryString.parse(url);
	},
	initDel(obj: object) {
		const _obj: object = {};

		if (Object.prototype.toString.call(obj) === '[object Array]') {
			return obj
		}

		if (!obj || Object.prototype.toString.call(obj) !== '[object Object]' || JSON.stringify(obj) === '{}') {
			return {};
		}

		for (const i in obj) {
			if (obj[i] !== 0 && obj[i] === 'undefined') continue;
			_obj[i] = obj[i];
		}
		return _obj;
	},
	initSearchDel(obj: object) {
		const _obj: object = {};

		if (!obj || Object.prototype.toString.call(obj) !== '[object Object]' || JSON.stringify(obj) === '{}') {
			return {};
		}

		for (const i in obj) {
			if (obj[i] !== 0 && (obj[i] === 'undefined' || !obj[i])) continue;
			_obj[i] = obj[i];
		}
		return _obj;
	},
	parseParams(urlParams: object) {
		let params = '';
		if (Object.keys(urlParams).length > 0) {
			for (const k in urlParams) {
				params += `${k}=${urlParams[k]}&`;
			}
			params = params.substr(0, params.length - 1);
		}
		return params;
	},
	link(path?: string, param?: object) {
		return param && param !== {} ? `${path}${this.init(param)}` : path;
	}
};
