import React from 'react';
import PropTypes from 'prop-types';

import ServiceDiscoveryModal from 'components/ui/Modal/ServiceDiscoveryModal/ServiceDiscoveryModal';

import { CATEGORIES } from 'components/ui/Modal/ServiceDiscoveryModal/constants';

const ServiceDiscoveryForm = ({ history, match }) => {
  const { categorySlug } = match.params;
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  return (
    <ServiceDiscoveryModal
      categoryId={category.id}
      categorySlug={category.slug}
      algoliaCategoryName={category.algoliaCategoryName}
      categoryName={category.name}
      isOpen
      closeModal={() => history.goBack()}
      steps={category.steps}
    />
  );
};
ServiceDiscoveryForm.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      categorySlug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ServiceDiscoveryForm;
