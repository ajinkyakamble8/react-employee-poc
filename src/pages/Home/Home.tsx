import React from 'react';
import styles from './Home.module.scss';

/**
 * Home page design
 * @returns 
 */
const Home = () => (
  <>
    <img src={process.env.PUBLIC_URL + '/img/home/lee-campbell-DtDlVpy-vvQ-unsplash.jpg'} alt="Home Page" className={styles.background} />
    <img src={process.env.PUBLIC_URL + '/img/home/diego-ph-fIq0tET6llw-unsplash.jpg'} alt="" className={styles.img1} />

  </>
);

export default Home;
