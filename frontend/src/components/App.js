import { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Card from "./Card.js";
import Login from "./Login.js";
import Register from "./Register.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/ApiAuth.js";
import DeletePopup from "./DeleteCardPopup.js";

function App() {
	//управление видимостью попапов
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
	const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
	const [isDeleteCardOpen, setIsDeleteCardOpen] = useState(false);

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
	}

	function handleDeleteCardClick() {
		setIsDeleteCardOpen(!isDeleteCardOpen);
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setSelectedCard(false);
		setIsAuthPopupOpen(false);
		setIsDeleteCardOpen(false);
	}

	//выгрузка данных о пользователе с сервера
	const [currentUser, setCurrentUser] = useState("");

	//отправка данный о пользователе на сервер
	function handleUpdateUser({ name, about }) {
		setIsLoading(!isLoading);
		api.patchUserInfo({ name, about })
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
			});
	}

	// Отправка данных для изменения аватара
	function handleUpdateAvatar(avatar) {
		setIsLoading(!isLoading);
		api.updateAvatar(avatar)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
			});
	}

	//выгрузка карт с сервера
	const [cards, setCards] = useState([]);

	useEffect(() => {
		handleTokenCheck();
		Promise.all([api.getUserInfo(), api.getInitialCards()])
			.then(([data, item]) => {
				setCards(item);
				setCurrentUser(data);
			})
			.catch((error) => {
				console.log(error.message);
			});
	});

	//отправка новой карты
	function handleAddPlaceSubmit(item) {
		setIsLoading(!isLoading);
		api.postDataCards(item)
			.then((newCard) => {
				setCards([newCard, ...cards]);
				closeAllPopups();
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
			});
	}

	//увеличение картинки карты
	const [selectedCard, setSelectedCard] = useState({});

	function handleCardClick(selectedCard) {
		setSelectedCard(selectedCard);
	}

	//Добавьте поддержку лайков
	function handleCardLike(card) {
		// Снова проверяем, есть ли уже лайк на этой карточке
		const isLiked = card.likes.some((i) => i._id === currentUser._id);
		// Отправляем запрос в API и получаем обновлённые данные карточки
		!isLiked
			? api
				.putLike(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
				})
				.catch((err) => console.log(err))
			: api
				.deleteLike(card._id, !isLiked)
				.then((newCard) => {
					setCards((state) =>
						state.map((c) => (c._id === card._id ? newCard : c))
					);
				})
				.catch((err) => console.log(err));
	}

	//Добавьте поддержку удаления карточки
	function handleCardDelete(card) {
		// Определяем, являемся ли мы владельцем текущей карточки
		const isOwn = card.owner._id === currentUser._id;

		//Отправляем запрос в API и получаем карточки
		api.deleteCard(card._id, !isOwn)
			.then(() => {
				const newCard = cards.filter((item) => item._id !== card._id);
				setCards(newCard);
			})
			.catch((err) => console.log(err));
	}

	//отправка данных для регистрации

	const [isRegister, setIsRegister] = useState(true);

	function handleRegisterSubmit(password, email) {
		setIsLoading(!isLoading);
		auth.register(password, email)
			.then((res) => {
				if (res.data) {
					setIsAuthPopupOpen(true);
					setIsRegister(true);
					navigate("/sign-in");
				}
			})
			.catch((err) => {
				console.log(err);
				setIsAuthPopupOpen(true);
				setIsRegister(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	//отправка данных для авторизация

	const [isLogin, setIsLogin] = useState(null);

	function handleLoginSubmit(password, email) {
		setIsLoading(!isLoading);
		auth.authorize(password, email)
			.then((data) => {
				if (data) {
					localStorage.setItem("jwt", data.token);
					handleTokenCheck();
					return data;
				}
				return data;
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading(false);
			});
	}

	const [isUser, setIsUser] = useState("");

	//проверка токена
	const handleTokenCheck = () => {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			auth.checkToken(jwt)
				.then((res) => {
					if (res) {
						setIsLogin(true);
						navigate("/");
						setIsUser(res.data.email);
					}
				})
				.catch((err) => console.log(err));
		} else {
			setIsLogin(false);
		}
	};

	//удаление токена
	function signOut() {
		localStorage.removeItem("jwt");
		Navigate("/sing-in");
	}

	//экран загрузки
	if (isLogin === null) {
		return (
			<div className="load">
				<p className="load__text">Загрузка...</p>
			</div>
		);
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="page">
				<Header user={isUser} signOut={signOut} />
				<Routes>
					<Route
						path="*"
						element={
							isLogin ? (
								<Navigate to="/" replace />
							) : (
								<Navigate to="/sign-in" replace />
							)
						}
					/>
					<Route
						path="/sign-in"
						element={
							<Login
								isLoading={isLoading}
								handleLoginSubmit={handleLoginSubmit}
							/>
						}
					></Route>
					<Route
						path="/sign-up"
						element={
							<Register
								isLoading={isLoading}
								handleRegisterSubmit={handleRegisterSubmit}
							/>
						}
					></Route>
					<Route
						path="/"
						element={
							<ProtectedRouteElement
								isLogin={isLogin}
								onEditProfile={handleEditProfileClick}
								onAddPlace={handleAddPlaceClick}
								onEditAvatar={handleEditAvatarClick}
								currentUser={currentUser}
								element={Main}
							>
								{cards.map((item) => (
									<Card
										key={item._id}
										currentUser={currentUser}
										card={item}
										onCardClick={handleCardClick}
										onCardLike={handleCardLike}
										onCardDelete={handleDeleteCardClick}
									></Card>
								))}
							</ProtectedRouteElement>
						}
					/>
				</Routes>
				<ImagePopup card={selectedCard} onClose={closeAllPopups} />
				<Footer />
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
					isLoading={isLoading}
				/>

				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlaceSubmit={handleAddPlaceSubmit}
					isLoading={isLoading}
				/>

				<DeletePopup //подскажите как добавить возможно подтвердить удаление карточки? Нужно же как то передать карточку.
					isOpen={isDeleteCardOpen}
					onDeleteCard={handleCardDelete}
					onClose={closeAllPopups}
					isLoading={isLoading}
				/>

				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
					isLoading={isLoading}
				/>
				<InfoTooltip
					isOpen={isAuthPopupOpen}
					onClose={closeAllPopups}
					name="info-toolpip"
					isRegister={isRegister}
				/>
			</div>
		</CurrentUserContext.Provider>
	);
}

export default App;
