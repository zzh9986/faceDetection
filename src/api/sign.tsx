import { $ajax } from './post';

export function signIn(params?) {
	return $ajax.$post("http://fthsdz.natappfree.cc/login1", params);
}

export function signUp(params?) {
	return $ajax.$post("http://fthsdz.natappfree.cc/register1", params);
}

export function getTeacherInfo(params?) {
	return $ajax.$post("http://fthsdz.natappfree.cc/teacherdetail1", params);
}

export function getCourseInfo(params?) {
	return $ajax.$post("http://fthsdz.natappfree.cc/coursedetail1", params);
}

export function getAdminInfo(params?) {
	return $ajax.$post("http://fthsdz.natappfree.cc/admindetail1", params)
}

export function bindCourse(params?) {
	return $ajax.$post("http://fthsdz.natappfree.cc/bind1", params)
}
