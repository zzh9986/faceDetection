import { $ajax } from './post';

export function signIn(params?) {
	return $ajax.$post("http://95xtta.natappfree.cc/login1", params);
}

export function signUp(params?) {
	return $ajax.$post("http://95xtta.natappfree.cc/register1", params);
}

export function getTeacherInfo(params?) {
	return $ajax.$post("http://95xtta.natappfree.cc/teacherdetail1", params);
}
