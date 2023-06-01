import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'

const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}


export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavText href="/homepage" text="BINGER" isMain />
          <NavText href="/search" text="SEARCH" />
          <NavText href="/mypage" text="USER" />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
