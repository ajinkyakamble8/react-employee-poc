import React from 'react';
import styles from './Menu.module.scss';
import {
  Nav,
  Button
} from 'react-bootstrap';
import { history } from './../../helper/common';
import { urlRoutes } from './../../helper/constants';

/**
 * Navbar
 * @returns 
 */
const Menu = () => (
  <Nav>
    <Nav.Item>
      <Button variant="dark" size="sm" className={styles.menuItem} onClick={() => history.push(urlRoutes.EMPLOYEES)} >Employees</Button>
    </Nav.Item>
  </Nav>
);

export default Menu;
