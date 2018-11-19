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
			console.log(response);
			dispatch(authSuccess(response.data.idToken, response.data.localId));
		})
		.catch(err => {
			console.log(err);
			dispatch(authFail(err.response.data.error.message));
		})
		dispatch(authStart());
	}
}