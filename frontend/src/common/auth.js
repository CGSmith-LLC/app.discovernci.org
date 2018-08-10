import Cookies from 'js-cookie';

const login = (data, cb) => {
  if (localStorage.token) {
    if (cb) cb(true);
  }
};

const logout = () => {
  Cookies.remove('csrftoken');
  delete localStorage.token;
};

const loggedIn = () => {
  if (localStorage.token) {
    return true;
  }
  return false;
};

export {
  login, logout, loggedIn
};
