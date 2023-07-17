const url = "https://api.mesto.organik.nomoredomains.xyz";
const headers = {
	Accept: "application/json",
	"Content-Type": "application/json",
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
	}).then((res) => { checkingResponse(res) });
}
