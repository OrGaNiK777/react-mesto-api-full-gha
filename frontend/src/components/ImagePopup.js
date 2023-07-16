function ImagePopup({ card, onClose }) {
	return (
		<div>
			<div
				className={`popup popup-img ${card.link ? "popup_opened" : ""}`}
			>
				<div className="popup-img__container">
					<button
						onClick={onClose}
						id="buttonClosePopupImg"
						className="popup__button-close"
						type="button"
					></button>
					<img
						className="popup-img__img"
						src={card.link}
						alt={card.name}
					/>
					<h2 className="popup-img__title">{card.name}</h2>
				</div>
			</div>
		</div>
	);
}

export default ImagePopup;
