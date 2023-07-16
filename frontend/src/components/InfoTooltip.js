import authNoOk from "../images/authNoOk.svg";
import authOk from "../images/authOk.svg";
import Popup from "./Popup";

export default function InfoTooltip({ isOpen, name, onClose, isRegister }) {
	return (
		<Popup onClose={onClose} name={name} isOpen={isOpen}>
			<img
				className="popup-info-toolpip__img"
				src={isRegister ? authOk : authNoOk}
				alt="accept"
			/>
			<p className="popup__title popup-info-toolpip__title">
				{isRegister
					? "Вы успешно зарегистрировались!"
					: "Что-то пошло не так! Попробуйте ещё раз."}
			</p>
		</Popup>
	);
}
