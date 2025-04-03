import Cookies from 'js-cookie';



export const setCookie = (user) => {
  Cookies.set('user', JSON.stringify(user));
}
export const getCookie = () => {
  const user = Cookies.get('user');
  return user ? JSON.parse(user) : null;
}
export const removeCookie = (user) => {
  Cookies.remove('user');
}

export const setCartsToLocal = (carts) => {
  localStorage.setItem('carts', JSON.stringify(carts));
}
export const getCartsFromLocal = () => {
  const carts = localStorage.getItem('carts');
  return carts ? JSON.parse(carts) : [];
}
export const removeCartsFromLocal = () => {
  localStorage.removeItem('carts');
}