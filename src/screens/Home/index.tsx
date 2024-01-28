import { useContext } from "react";
import Button from "../../components/Button";
import { UserContext } from "../../contexts/user.context";
import { useNavigate } from "react-router-dom";
import IRegisterModel from "../../model/register.model";

export default function Home() {
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext)

  function logout() {
    updateUserData(null)
  }

  function createRegister() {
    const register: IRegisterModel = {
      idRegister: 1,
      poda: 'PODA 1',
      rega: 'REGA 1',
      adubacao: 'ADUBACAO 1'
    }

    navigate('/cadastrarPlanta')
    // navigate('/fazerRegistro', { state: { register } })
  }

  return (
    <>
      <Button onClick={logout}>Sair da conta</Button>
      <Button onClick={createRegister}>Criar registro</Button>
    </>
  )
}