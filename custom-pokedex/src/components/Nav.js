import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';


export function NavBar(props) {

  const currentUser = props.currentUser;
  const handleSignOut = (event) => {
    signOut(getAuth());
  }

  return (
    <>
      <Navbar variant="null" className="nav-bar">
        <Container>
          <Navbar.Brand href="/">
          <img className="logo" src="img/icon.png" alt="pokeball icon"/>{' '}
            <span className="pokedex">Pok&eacute;dex</span>
          </Navbar.Brand>
        </Container>
        <Nav>
            <NavLink className="nav-item" to="/">Home</NavLink>
            <NavLink className="nav-item" to="/shop">Shop</NavLink>
            <NavLink className="nav-item" to="/game">Game</NavLink>
            {currentUser && currentUser.userId &&
            <>
              <div className="nav-item">
                <button className="btn btn-secondary ms-2" onClick={handleSignOut}>Sign Out</button>
              </div>
            </>
            }
            {currentUser.userId === null &&
              <>
                <div className="nav-item">
                  <NavLink className="nav-item" to="/sign-in">Login</NavLink>
                </div>
              </>
            }
        </Nav>
      </Navbar>
    </>
  );
}