import { $ajax } from './post';

export function signIn(params?) {
	return $ajax.$post("http://38gq8y.natappfree.cc/login1", params);
}

export function signUp(params?) {
	return $ajax.$post("http://38gq8y.natappfree.cc/register1", params);
}
