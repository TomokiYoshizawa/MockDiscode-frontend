import { useAppSelector, useAppDispatch } from "./app/hooks";
import { auth } from "./firebase";

import SideBar from "./components/SideBar/SideBar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";

import "./App.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/userSlice";

function App() {
  const user = useAppSelector((state) => state.user);
  // const user = null;
  // console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <SideBar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
