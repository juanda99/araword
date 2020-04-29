import React from 'react';
import { useRouter } from 'next/router'
import { locales, languageNames } from '../translations/config'
import { LocaleContext } from '../context/LocaleContext'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const MenuAppBar: React.FC = () => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const router = useRouter()
  const { locale } = React.useContext(LocaleContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);

  const handleCloseSession = () => {
    setAuth(false);
    handleClose();
  };

//   const handleLocaleChange = React.useCallback(
//     (e: React.ChangeEvent<HTMLSelectElement>) => {
//       const regex = new RegExp(`^/(${locales.join('|')})`)
//       router.push(router.pathname, router.asPath.replace(regex, `/${e.target.value}`))
//     },
//     [router]
//   )


const handleLocaleChange = React.useCallback(
    (language: string) => {
      console.log(language, '***************************')
      const regex = new RegExp(`^/(${locales.join('|')})`)
      handleClose()
      router.push(router.pathname, router.asPath.replace(regex, `/${language}`))
    },
    [router]
  )

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenu2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Araword
          </Typography>
          {auth ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-locale-appbar"
                aria-haspopup="true"
                onClick={handleMenu2}
                color="inherit"
              >
                <LanguageIcon />
              </IconButton>
              <Menu
                id="menu-locale-appbar"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open2}
                onClose={handleLocaleChange}
              >
                {locales.map(localeValue => (
                    <MenuItem key={localeValue} selected={localeValue === locale} onClick={() => handleLocaleChange(localeValue)}>
                        {languageNames[localeValue]}
                    </MenuItem>
                ))}

              </Menu>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleCloseSession}>Close session</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuAppBar