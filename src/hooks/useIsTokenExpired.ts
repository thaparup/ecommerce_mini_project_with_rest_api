// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../states/store/store";
import { jwtDecode } from "jwt-decode";

export const useIsTokenExpired = (): boolean => {
  const auth = useSelector((state: RootState) => state.auth.auth);

  if (!auth.token) {
    return true;
  }

  let decoded;
  try {
    decoded = jwtDecode(auth.token);
  } catch (e) {
    return true;
  }

  const currentTime = new Date().getTime();

  if (currentTime > decoded.exp * 1000) {
    localStorage.removeItem("auth");
    return true;
  }

  return false;
};
