import { $ajax } from './post';

export function signIn(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/login1", params);
}

export function signUp(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/register1", params);
}

export function getTeacherInfo(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/teacherdetail1", params);
}

export function getCourseInfo(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/coursedetail1", params);
}

export function getAdminInfo(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/admindetail1", params)
}

export function bindCourse(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/bind1", params)
}

export function searchCourse(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/search1", params)
}

export function analyzeCamera(params?) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/analyze1", params)
}

export function changeInfo(params) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/changeinfo1", params)
}

export function changePwd(params) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/changepassword1",params)
}

export function searchInfo(params) {
	return $ajax.$post("http://h2hpmz.natappfree.cc/teachersearch1",params)
}