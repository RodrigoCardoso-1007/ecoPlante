import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem } from '@mui/material';
import { UserContext } from '../../contexts/user.context';
import colors from '../../styles/colors';
import styles from './styles';
import Avatar from '../Avatar';

export default function Header() {
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onPressProfile() {
    handleClose();
    navigate('/perfil')
  }

  function onPressPlants() {
    handleClose();
    navigate('/')
  }

  function onPressLogout() {
    updateUserData(null)
    navigate('/')
  }

  return (
    <div style={styles.container}>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuIcon style={{ fontSize: '48px', color: colors.primary.dark }} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={onPressProfile}>Perfil</MenuItem>
          <MenuItem onClick={onPressPlants}>Minhas plantas</MenuItem>
          <MenuItem onClick={onPressLogout}>Sair da conta</MenuItem>
        </Menu>
      </div>

      <Avatar size={48} onClick={onPressProfile} />
    </div>
  )
}