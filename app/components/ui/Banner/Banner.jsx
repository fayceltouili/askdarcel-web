import React from 'react';
import styles from './Banner.scss';

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <strong>CORONAVIRUS COVID-19: </strong>
      Many organizations and services have reduced hours and availability. Click
      {' '}
      <a className={styles.bannerLink} href="/covid">Resource Guide</a>
      {' '}
      for a helpful resource guide - updated daily.
    </div>
  );
}
