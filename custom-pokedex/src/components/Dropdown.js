import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

export function DropdownMenu(props) {

  return (
      <Dropdown className="menu">
        <Dropdown.Toggle variant="null">
          <img className="poke-icon" src="img/icon.png" alt="pokeball icon" />
          <span>Pok&eacute;dex</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <NavLink to="/">Home</NavLink>
          <Dropdown.Divider />
          <NavLink to="shop">Shop</NavLink>
          <Dropdown.Divider />
          <NavLink to="game">Game</NavLink>
          <Dropdown.Divider />
          <NavLink to="sign-in">Login</NavLink>
        </Dropdown.Menu>
      </Dropdown>
  );
}