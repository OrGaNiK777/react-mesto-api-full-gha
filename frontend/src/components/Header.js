import headerLogo from "../images/header-logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ user, signOut }) {
	return (
		<header className="header">
			<a href="_">
				<img
					className="header__logo"
					src={headerLogo}
					alt="Логотип Mesto"
				/>
			</a>
			<div style={{ display: "flex" }}>
				<p className="header__auth header__auth_user">{user}</p>
				<Routes>
					<Route
						path="/sign-up"
						element={
							<Link className="header__auth" to={"/sign-in"}>
								Войти
							</Link>
						}
					></Route>
					<Route
						path="/sign-in"
						element={
							<Link className="header__auth" to={"/sign-up"}>
								Зарегистрироваться
							</Link>
						}
					></Route>
					<Route
						path="/"
						element={
							<Link
								onClick={signOut}
								style={{ color: "#a9a9a9" }}
								className="header__auth"
								to={"/"}
							>
								Выход
							</Link>
						}
					></Route>
				</Routes>
			</div>
		</header>
	);
}

export default Header;
