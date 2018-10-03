import axios from 'axios';

const instance = axios.create({
	baseURL : 'https://react-my-burger-d406e.firebaseio.com/',
})

export default instance;