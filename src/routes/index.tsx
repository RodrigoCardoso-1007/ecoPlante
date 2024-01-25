import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "../screens/Login";

const NotLogged = () => (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastro" element={<Login />} />
  </>
)

const Logged = () => (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Login />} />
  </>
)

const RouteComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {false
          ? Logged()
          : NotLogged()
        }
      </Routes>
    </BrowserRouter>
  )
}

export default RouteComponent