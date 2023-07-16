function Main({
	onEditProfile,
	onAddPlace,
	onEditAvatar,
	currentUser,
	children,
}) {
	return (
		<>
			<main>
				<section className="profile">
					<div className="profile__container">
						<button
							onClick={onEditAvatar}
							className="profile__avatar-edit"
							type="button"
							aria-label="update avatar"
						>
							<img
								className="profile__avatar"
								style={{
									backgroundImage: `url(${currentUser.avatar})`,
								}}
								alt=""
							/>
						</button>
						<div className="profile__info">
							<h1 className="profile__name">
								{currentUser.name}
							</h1>
							<p className="profile__about">
								{currentUser.about}
							</p>
							<button
								onClick={onEditProfile}
								className="profile__edit-button"
								type="button"
							></button>
						</div>
					</div>
					<button
						onClick={onAddPlace}
						className="profile__add-button"
						type="button"
						aria-label="Кнопка добавить"
					></button>
				</section>
			</main>
			<section className="cards">{children}</section>
		</>
	);
}

export default Main;
