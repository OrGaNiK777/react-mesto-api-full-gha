function PopupWithForm({ title, name, nameBtn, children, handleSubmit }) {
	return (
		<>
			<h2 className="popup__title">{title}</h2>
			<form
				className="popup__form"
				name={`${name}Form`}
				noValidate
				onSubmit={handleSubmit}
			>
				{children}
				<button className="popup__button-save" type="submit">
					{nameBtn}
				</button>
			</form>
		</>
	);
}

export default PopupWithForm;
