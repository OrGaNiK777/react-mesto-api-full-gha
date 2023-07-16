import React from "react";
import { useState, useEffect, useContext } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Popup from "./Popup";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
	const [name, setName] = useState("");
	const [about, setDescription] = useState("");

	// Подписка на контекст
	const currentUser = useContext(CurrentUserContext);

	// После загрузки текущего пользователя из API
	// его данные будут использованы в управляемых компонентах.
	useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();

		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name,
			about,
		});
	}

	return (
		<Popup isOpen={isOpen} onClose={onClose} name="profile">
			<PopupWithForm
				title="Редактировать профиль"
				name="profile"
				nameBtn={isLoading ? "Сохранение..." : "Сохранить"}
				isOpen={isOpen}
				handleSubmit={handleSubmit}
			>
				<Input
					id="popupProfileName"
					name="name"
					placeholder="Имя"
					maxLength="40"
					minLength="2"
					value={name || ""}
					handleChange={(e) => setName(e.target.value)}
					classNameInput={"popup__input popup__input_addEdit"}
					classNameValid={"popup__input-error popupProfileName-error"}
					TextValid={"Вы пропустили это поле"}
					type="text"
				></Input>
				<Input
					className="popup__input popup__input_addEdit"
					id="popupProfileAbout"
					name="about"
					placeholder="Описание"
					maxLength="200"
					minLength="2"
					value={about || ""}
					handleChange={(e) => setDescription(e.target.value)}
					classNameInput={"popup__input popup__input_addEdit"}
					classNameValid={
						"popup__input-error popupProfileAbout-error"
					}
					TextValid={"Вы пропустили это поле"}
					type="text"
				></Input>
			</PopupWithForm>
		</Popup>
	);
}
export default EditProfilePopup;
