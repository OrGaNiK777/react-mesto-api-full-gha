const url = "http://localhost:4000";
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
		body: JSON.stringify({ password, email }),
	}).then((res) => checkingResponse(res));
};

export const checkToken = (token) => {
	return fetch(`${url}/users/me`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	}).then((res) => checkingResponse(res));
};
