import React from 'react';

import ResourceCard from '../ResourceCard/ResourceCard';
import styles from './ResourceList.scss';

const ResourceList = ({ resources }) => (
  <ul className={styles.list}>
    {resources.map(resource => <ResourceCard key={resource.name} resource={resource} />)}
  </ul>
);

export default ResourceList;
