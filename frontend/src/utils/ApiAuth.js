const url = "http://localhost:4000";
//const url = "https://api.mesto.organik.nomoredomains.xyz";
const jwt =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWI1MTIxMDgzMzNmMzRkMWJmMTg2MSIsImlhdCI6MTcwMDQ4MzM3OCwiZXhwIjoxNzAxMDg4MTc4fQ.hsbxbYwqxUNy6Mo0wg9bhdLBxCTLdAF6xGEk6cqceig';
const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
	authorization: `Bearer ${jwt}`
};

function checkingResponse(res) {
	if (res.ok) {
		return res.json();
	}
	// если ошибка, отклоняем промис
	return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
	return fetch(`${url}/signup`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({ password, email }),
	}).then((res) => checkingResponse(res));
};

export const authorize = (password, email) => {
	return fetch(`${url}/signin`, {
		method: "POST",
		headers: headers,
		credentials: 'include',
		body: JSON.stringify({ password, email }),
	}).then((res) => checkingResponse(res));
};

export const checkToken = () => {
	return fetch(`${url}/users/me`, {
		method: "GET",
		headers: headers,
		credentials: 'include',
	}).then((res) => { return checkingResponse(res) });
};

export const loginOut = () => {
	return fetch(`${url}/signout`, {
		method: "DELETE",
		headers: headers,
		credentials: 'include',
	}).then((res) => { return checkingResponse(res) });
}
