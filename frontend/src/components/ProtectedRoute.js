import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
	return props.isLogin ? (
		<Component {...props} />
	) : (
		<Navigate to="/sign-in" replace />
	);
};

export default ProtectedRouteElement;
