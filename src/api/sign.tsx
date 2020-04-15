import { $ajax } from './post';

export function signIn(params?) {
	return $ajax.$post("http://qcxdu5.natappfree.cc/login1", params);
}

export function signUp(params?) {
	return $ajax.$post("http://qcxdu5.natappfree.cc/register1", params);
}

export function getTeacherInfo(params?) {
	return $ajax.$post("http://qcxdu5.natappfree.cc/teacherdetail1", params);
}
