import Input from "./Input";
import PageWithForm from "./PageWithForm";

import { useRef } from "react";

export default function Login({ isLoading, handleLoginSubmit }) {
	const inputEmailRef = useRef();
	const inputPassRef = useRef();

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		handleLoginSubmit(
			inputPassRef.current.value,
			inputEmailRef.current.value
		);
	}
	return (
		<>
			<PageWithForm
				title="Вход"
				name="add"
				nameBtn={isLoading ? "Вход..." : "Войти"}
				handleSubmit={handleSubmit}
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
		</>
	);
}
