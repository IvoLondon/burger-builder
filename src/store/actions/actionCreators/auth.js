import * as actionTypes from './../actionTypes';
import axios from 'axios';

export const authStart = () => {
	return ({
		type : actionTypes.AUTH_START
	})
}
export const authSuccess = (idToken, localId) => {
	return ({
		type : actionTypes.AUTH_SUCCESS,
		idToken : idToken,
		localId : localId,
	})
}
export const authFail = (err) => {
	return ({
		type : actionTypes.AUTH_FAIL,
		error : err,
	})
}
export const authLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userID');

	return ({
		type : actionTypes.AUTH_LOGOUT
	})
}
export const setLogout = (expTime) => {
	return dispatch => {
		setTimeout(function(){
			dispatch(authLogout())
		}, expTime * 1000)
	}
}
export const auth = (email, password, isSignUp) => {
	return dispatch => {
		const authData = {
			email : email,
			password : password,
			returnSecureToken : true,
		}
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBgcVOjlgEpNEMsXDxCoOXwWLTacaaBVlk';
		if(!isSignUp) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBgcVOjlgEpNEMsXDxCoOXwWLTacaaBVlk';
		}
		axios.post(url, authData)
		.then(response => {
			const expTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
			localStorage.setItem('token', response.data.idToken);
			localStorage.setItem('expirationDate', expTime)
			localStorage.setItem('userID', response.data.localId)

			dispatch(authSuccess(response.data.idToken, response.data.localId));
			dispatch(setLogout(response.data.expiresIn));
		})
		.catch(err => {
			dispatch(authFail(err.response.data.error.message));
		})
		dispatch(authStart());
	}
}

export const authSetRedirect = (path) => {
	return ({
		type : actionTypes.AUTH_SET_REDIRECT_PATH,
		path : path,
	})
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		if(!token) {
			dispatch(authLogout());
		} else {
			const expirationTime = new Date(localStorage.getItem('expirationDate'));
			if(expirationTime.getTime() > new Date().getTime()) {

				dispatch(authSuccess(token, localStorage.getItem('userID')));
				dispatch(setLogout((expirationTime.getTime() - new Date().getTime()) / 1000 ));
			} else {

				dispatch(authLogout())
			}
		}
	}
}