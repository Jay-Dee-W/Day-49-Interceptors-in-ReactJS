
import './App.css';
import { Container, AppBar, IconButton, Toolbar, Typography, makeStyles, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@material-ui/core"
import { Book, Category, Menu, People } from "@material-ui/icons"
import { useState } from "react"
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import BooksList from './components/BooksList'
import SignUp from './components/SignUp'
import Login from './components/Login'
import setupInterceptors from './networkUtils/interceptors';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {

  }
}))



export default function App() {

  let history = useHistory()
  setupInterceptors(history)
 

  return (
    <>
      <Wrapper>
        <Switch>
          <Route exact path='/'>
            Welcome to Library
          </Route>

          <Route exact path='/login' >
           <Login />
          </Route>
          <Route exact path='/signUp'>
           <SignUp />
          </Route>
          <Route exact path='/books' >
           <BooksList />
          </Route>
          <Route exact path='/categories'>
            List of categories
          </Route>
          <Route exact path='/members'>
            List of members
          </Route>
          <Route exact path='/issues'>
            List of Issued Books
          </Route>
   
   
        </Switch>
      </Wrapper>
    </>
  );

  function Wrapper(props) {
    const classes = useStyles()
    let [drawerOpen, setDrawerOpen] = useState(false)

    let toggleDrawer = () => setDrawerOpen(prev => !prev)

    return (
      <div className='container'>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label="menu"
              onClick={toggleDrawer} >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              React Library
            </Typography>
           
          </Toolbar>

        </AppBar>
        <>
          <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer}>
            <List>
              <Typography align='center' variant='h5'>Menu</Typography>
              <Box m={2} />
              {[
                { text: 'Books', icon: <Book />, link: "/books" },
                { text: 'Categories', icon: <Category />, link: "/catergory" },
                { text: 'Members', icon: <People />, link: '/members' },
                { text: 'Books Issued', icon: <Book />, link: '/issues' }
               
              ].map(({ text, icon,link }, index) => {
                return (
                  <Link  key={index} to={link} onClick={toggleDrawer}>
                    <ListItem className={classes.list} button>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                )
              })}
            </List>
          </Drawer>
        </>
        <Container fixed className={classes.paddedContainer} >
          {props.children}
        </Container>
      </div>
    )

  }

}


