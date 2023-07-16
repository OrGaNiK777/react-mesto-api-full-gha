import PopupWithForm from "./PopupWithForm";
import Popup from "./Popup";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, isLoading }) {
	function handleSubmit(e) {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		onDeleteCard();
	}

	return (
		<Popup isOpen={isOpen} onClose={onClose} name="delete">
			<PopupWithForm
				title="Вы уверены?"
				name="delete"
				nameBtn={isLoading ? "Удаление..." : "Да"}
				isOpen={isOpen}
				onClose={onClose}
				handleSubmit={handleSubmit}
			></PopupWithForm>
		</Popup>
	);
}
export default DeleteCardPopup;
