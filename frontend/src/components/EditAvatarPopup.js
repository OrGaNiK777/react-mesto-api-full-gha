import { useRef } from "react";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
	const inputRef = useRef();

	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		onUpdateAvatar(inputRef.current.value);
	}
	return (
		<Popup isOpen={isOpen} onClose={onClose} name="avatar">
			<PopupWithForm
				title="Обновить аватар"
				name="avatar"
				nameBtn={isLoading ? "Сохранение..." : "Сохранить"}
				isLoading={isLoading}
				isOpen={isOpen}
				handleSubmit={handleSubmit}
			>
				<Input
					useRef={inputRef}
					id="popupProfileName"
					name="link"
					type="url"
					placeholder="Ссылка на страницу"
					classNameInput="popup__input popup__input_avatar"
					classNameValid="popup__input-error popupInputLinkAvatar-error"
					TextValid="Вы пропустили это поле"
				/>
			</PopupWithForm>
		</Popup>
	);
}
export default EditAvatarPopup;
