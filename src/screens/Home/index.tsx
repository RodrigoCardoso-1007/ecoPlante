import { useContext } from "react";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/user.context";

export default function Home() {
  const { updateUserData } = useContext(UserContext)

  function logout() {
    localStorage.removeItem('userData')
    updateUserData(null)
  }

  return (
    <>
      <Button onClick={logout}>Sair da conta</Button>
    </>
  )
}