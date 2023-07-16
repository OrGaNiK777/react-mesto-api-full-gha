function Card({ currentUser, card, onCardClick, onCardLike, onCardDelete }) {
	function handleClick() {
		onCardClick(card);
	}

	function handleLikeClick() {
		onCardLike(card);
	}

	function handleDeleteClick() {
		onCardDelete(card);
	}

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = card.owner._id === currentUser._id;

	// Создаём переменную, которую после зададим в `className` для кнопки удаления
	const cardDeleteButtonClassName = `card__icon-delete ${
		isOwn ? "card__icon-delete_active" : ""
	}`;

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = card.likes.some((i) => i._id === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = `card__icon-like ${
		isLiked ? "card__icon-like_active" : ""
	}`;

	return (
		<article className="card">
			<button
				className={cardDeleteButtonClassName}
				type="button"
				onClick={handleDeleteClick}
			></button>
			<div
				onClick={handleClick}
				className="card__image"
				style={{ backgroundImage: `url(${card.link})` }}
			></div>

			<div className="card__info">
				<h2 className="card__title">{card.name}</h2>
				<div className="card__like">
					<button
						className={cardLikeButtonClassName}
						type="button"
						onClick={handleLikeClick}
					></button>
					<p className="card__number-likes">{card.likes.length}</p>
				</div>
			</div>
		</article>
	);
}

export default Card;
