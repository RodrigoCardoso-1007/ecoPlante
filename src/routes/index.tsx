import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../screens/Login";
import CreateAccount from "../screens/CreateAccount";
import RecoverPassword from "../screens/RecoverPassword";
import { UserContext } from "../contexts/user.context";
import { useContext } from "react";
import Home from "../screens/Home";


const NotLogged = () => (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/cadastro" element={<CreateAccount />} />
    <Route path="/trocarSenha" element={<RecoverPassword />} />
  </>
)

const Logged = () => (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
  </>
)

const RouteComponent = () => {
  const { userData } = useContext(UserContext)

  return (
    <BrowserRouter>
      <Routes>
        {!!userData
          ? Logged()
          : NotLogged()
        }
      </Routes>
    </BrowserRouter>
  )
}

export default RouteComponent