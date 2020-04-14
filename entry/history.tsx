import { createBrowserHistory } from 'history/cjs/history';
import * as queryString from 'query-string';
import $url from './urls';

const init = (h): void => {
	const { pathname, search } = h.location;
	h.location = { ...h.location, query: queryString.parse(search) };
	h.$push = (path: string, obj: object): void => {
		const _o = {};
		path = path || pathname;
		if (obj) {
			Object.assign(_o, $url.unInit(search), obj);
		}
		h.push(`${path}${$url.init(_o)}`);
	};
	h.$reload = () => {
		h.push(pathname + search);
	};

	h.$replace = (path: string, obj: object) => {
		path = path || pathname;
		h.push(`${path}${$url.init(obj)}`);
	}
};

const history = createBrowserHistory({ basename: '/' });

init(history);

history.listen(() => {
	init(history);
});

export default history;
