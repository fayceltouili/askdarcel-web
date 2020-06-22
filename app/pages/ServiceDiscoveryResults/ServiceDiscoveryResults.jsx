import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InstantSearch, Configure } from 'react-instantsearch/dom';
import _ from 'lodash';
import qs from 'qs';

import config from '../../config';
import Loader from '../../components/ui/Loader';
import * as dataService from '../../utils/DataService';

import ClearAllFilters from './ClearAllFilters';
import OpenNowFilter from './OpenNowFilter';
import RefinementListFilter from './RefinementListFilter';
import SearchResults from './SearchResults/SearchResults';
import styles from './ServiceDiscoveryResults.scss';


const createURL = state => `?${qs.stringify(state, { encodeValuesOnly: true })}`;

const searchStateToURL = (location, searchState) => (searchState ? `${location.pathname}${createURL(searchState)}` : '');

const urlToSearchState = location => qs.parse(location.search.slice(1));


const categoryIDToName = new Map([
  ['1000001', 'Food resources'],
  ['1000002', 'Hygiene'],
]);


/** Wrapper component that handles state management, URL parsing, and external API requests. */
const ServiceDiscoveryResults = ({ history, location, match }) => {
  const categoryID = match.params.category_id;
  const [parentCategory, setParentCategory] = useState(null);
  const [eligibilities, setEligibilities] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const [searchState, setSearchState] = useState(urlToSearchState(location));

  const onSearchStateChange = nextSearchState => {
    setSearchState(nextSearchState);
    history.push(searchStateToURL(location, nextSearchState), nextSearchState);
  };

  // TODO: Handle failure?
  useEffect(() => {
    dataService.get(`/api/categories/${categoryID}`).then(response => {
      setParentCategory(response.category);
    });
  }, [categoryID]);

  useEffect(() => {
    dataService.get(`/api/eligibilities?category_id=${categoryID}`).then(response => {
      setEligibilities(response.eligibilities);
    });
  }, [categoryID]);

  useEffect(() => {
    dataService.get(`/api/categories/subcategories?id=${categoryID}`).then(response => {
      setSubcategories(response.categories);
    });
  }, [categoryID]);

  const isLoading = (parentCategory === null)
    || (eligibilities === null)
    || (subcategories === null);

  if (isLoading) {
    return <Loader />;
  }

  const categoryName = categoryIDToName.get(categoryID);
  return (
    <InnerServiceDiscoveryResults
      eligibilities={eligibilities}
      subcategories={subcategories}
      categoryName={categoryName}
      algoliaCategoryName={parentCategory.name}
      searchState={searchState}
      onSearchStateChange={onSearchStateChange}
    />
  );
};
ServiceDiscoveryResults.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category_id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ServiceDiscoveryResults;


/** Stateless inner component that just handles presentation. */
const InnerServiceDiscoveryResults = ({
  eligibilities,
  subcategories,
  categoryName,
  algoliaCategoryName,
  searchState,
  onSearchStateChange,
}) => {
  const subcategoryNames = subcategories.map(c => c.name);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{categoryName}</h1>
      </div>
      <InstantSearch
        appId={config.ALGOLIA_APPLICATION_ID}
        apiKey={config.ALGOLIA_READ_ONLY_API_KEY}
        indexName={`${config.ALGOLIA_INDEX_PREFIX}_services_search`}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
      >
        <Configure filters={`categories:'${algoliaCategoryName}'`} />
        <div className={styles.flexContainer}>
          <div className={styles.sidebar}>
            <div className={styles.filterResourcesTitle}>Filter Resources</div>
            <ClearAllFilters />
            <div className={styles.filterGroup}>
              <div className={styles.filterTitle}>Availability</div>
              <OpenNowFilter attribute="open_times" />
            </div>

            {!!eligibilities.length && (
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Eligibilities</div>
                <RefinementListFilter
                  attribute="eligibilities"
                  transformItems={items => _.sortBy(items, ['label'])}
                />
              </div>
            )}

            {!!subcategories.length && (
              <div className={styles.filterGroup}>
                <div className={styles.filterTitle}>Categories</div>
                <RefinementListFilter
                  attribute="categories"
                  transformItems={items => {
                    // Note that in Algolia, the categories attribute is for all
                    // categories, but for this page, we only want to display
                    // the specific subcategories of the target category, not
                    // all categories that the services are tagged with.
                    // We filter down the categories list from Algolia to just
                    // the subcategories.
                    const subcategoryItems = items.filter(
                      item => subcategoryNames.includes(item.label),
                    );
                    return _.sortBy(subcategoryItems, ['label']);
                  }}
                />
              </div>
            )}

          </div>
          <div className={styles.results}>
            <SearchResults />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};
