import { $ajax } from './post';

export function signIn(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/login1", params);
}

export function signUp(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/register1", params);
}

export function getTeacherInfo(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/teacherdetail1", params);
}

export function getCourseInfo(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/coursedetail1", params);
}

export function getAdminInfo(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/admindetail1", params)
}

export function bindCourse(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/bind1", params)
}

export function searchCourse(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/search1", params)
}

export function analyzeCamera(params?) {
	return $ajax.$post("http://rgtc22.natappfree.cc/analyze1", params)
}
