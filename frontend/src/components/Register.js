import Input from "./Input";
import PageWithForm from "./PageWithForm";
import { Link } from "react-router-dom";

import { useRef } from "react";

export default function Register({ isLoading, handleRegisterSubmit }) {
	const inputEmailRef = useRef();
	const inputPassRef = useRef();

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		handleRegisterSubmit(
			inputPassRef.current.value,
			inputEmailRef.current.value
		);
	}

	return (
		<PageWithForm
			title="Регистрация"
			name="add"
			nameBtn={isLoading ? "Регистрация..." : "Зарегистрироваться"}
			handleSubmit={handleSubmit}
			question={
				<p className="access-page__question" style={{ color: "white" }}>
					Уже зарегистрированы?
					<Link
						className="access-page__question"
						style={{ textDecoration: "none" }}
						to="/sign-in"
					>
						{"  "}
						Войти
					</Link>
				</p>
			}
		>
			<Input
				useRef={inputEmailRef}
				type="email"
				classNameInput="access-page__input"
				classNameValid="popup__input-error popupInputTitle-error"
				placeholder="Email"
			></Input>
			<Input
				useRef={inputPassRef}
				type="text"
				classNameInput="access-page__input"
				classNameValid="popup__input-error popupInputTitle-error"
				placeholder="Пароль"
			></Input>
		</PageWithForm>
	);
}
