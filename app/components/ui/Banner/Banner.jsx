import React from 'react';
import styles from './Banner.scss';

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <strong>CORONAVIRUS (COVID-19) UPDATE: </strong>
      <span>
        Many resources are operating with abnormal or reduced hours.
        Please find the latest information on resources available during this pandemic
        {' '}
        <a className={styles.bannerLink} href="https://docs.google.com/document/d/1R9y8KLbU-oZTJheoqobmqg6TJxkwSjTkJvm6WywHURk/edit">here</a>
        . We are working to incorporate active services into the SF Service Guide - check back for more updates.
      </span>
    </div>
  );
}
