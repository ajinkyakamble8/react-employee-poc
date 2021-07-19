import React from 'react';
import { connect } from 'react-redux';
import styles from './Header.module.scss';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { loginActions } from './../../_actions';
import { history } from './../../helper/common';
import { urlRoutes } from './../../helper/constants';
import Menu from '../Menu/Menu';

/**
 * Display header content with Logo and logged in uesr details
 * @param props 
 * @returns 
 */
const Header = (props: any) => {

  const { user, logout } = props;

  return (
    <Container className={styles.Header}>
      <Row className={styles.Background}>
        <Col md={1} className={styles.orgLogo} onClick={() => history.push(urlRoutes.HOME)}>
          <h2>KIBO</h2>
        </Col>
        { (user && user.username) ? 
          <>
            <Col md={6} className={styles.menuList}>
              <Menu></Menu>
            </Col>
            <Col md={5} className={styles.profile}>
              <span>Hi {user.username || '' }</span>
              &nbsp;&nbsp;
              <Button size="sm" onClick={logout}>Logout</Button>
            </Col>
          </>
          : ''
        }
      </Row>
    </Container>
  );
};

const mapState = (state: any) => {
  const { authentication } = state;
  const { loggedIn, user } = authentication;
  return { loggedIn, user };
}

const actionCreators = {
  logout: loginActions.logout
}

export default connect(mapState, actionCreators)(Header);
