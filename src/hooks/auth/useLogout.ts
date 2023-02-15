import Cookies from "js-cookie";

export const useLogout = () => {
  const logout = () => {
    Cookies.remove("currentUser");
    window.location.href = '/';
  };

  return { logout };
};
