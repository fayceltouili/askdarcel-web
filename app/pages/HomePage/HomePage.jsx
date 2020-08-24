import React from 'react';
import { withRouter } from 'react-router-dom';
import * as ax from 'axios';
import qs from 'qs';

import Footer from 'components/ui/Footer/Footer';
import Partners from 'components/ui/Partners/Partners';
import HomePageHero from './components/HomePageHero';
import SearchBar from './components/SearchBar';
import Section from './components/Section';
import ResourceList from './components/ResourceList/ResourceList';

const covidResources = [
  { name: 'Food', icon: 'food', categorySlug: 'food-resources' },
  { name: 'Showers and Restrooms', icon: 'shower', categorySlug: 'hygiene-resources' },
  { name: 'Access Points and Shelters', icon: 'bed', link: '/covid/shelteraccess' },
  { name: 'Financial and Job Assistance', icon: 'employment', categorySlug: 'financial-and-job-assistance-resources' },
  { name: 'Rent and Eviction Help', icon: 'eviction-prevention', categorySlug: 'rental-assistance-resources' },
  { name: 'COVID-19 Testing & Other Health Services', icon: 'hospital', categorySlug: 'medical-services-resources' },
  { name: 'Domestic Violence', icon: 'warning', categorySlug: 'domestic-violence-resources' },
  { name: 'Internet Access', icon: 'wifi', categorySlug: 'internet-access-resources' },
  { name: 'LGBTQ Resources', icon: 'community', categorySlug: 'lgbtq-resources' },
];

const generalResources = [{
  name: 'Family Homelessness',
  icon: 'family',
  link: 'https://sheltertech.typeform.com/to/GFEzl2',
  isTypeform: true,
}, {
  name: 'Youth Homelessness',
  icon: 'care',
  link: 'https://sheltertech.typeform.com/to/mXv584',
  isTypeform: true,
}, {
  name: 'Adult Homelessness',
  icon: 'shelter',
  link: 'https://sheltertech.typeform.com/to/KXi3Pp',
  isTypeform: true,
}];

class HomePage extends React.Component {
  state = {
    resourceCount: undefined,
    searchValue: '',
  };

  componentDidMount() {
    this.loadResourceCountFromServer();
  }

  submitSearch = () => {
    const { searchValue } = this.state;
    const { history } = this.props;
    if (searchValue) {
      const query = qs.stringify({ query: searchValue });
      history.push(`/search?${query}`);
    }
  }

  loadResourceCountFromServer() {
    ax.get('/api/resources/count').then(resp => {
      this.setState({ resourceCount: resp.data });
    });
  }

  render() {
    const { resourceCount, searchValue } = this.state;
    return (
      <div className="find-page">
        <HomePageHero
          title="Welcome to the SF Service Guide"
          description="Find food, housing, health, and coronavirus resources in San Francisco."
        />
        <Section
          title="COVID-19 Resource Guides"
          description="Get guided help for common COVID-19 related issues people are facing in San Francisco."
        >
          <ResourceList resources={covidResources} />
        </Section>
        <Section
          title="Get step-by-step help"
          description="Get guided help with many of the most common issues peeople are facing in San Francisco."
        >
          <ResourceList resources={generalResources} />
        </Section>
        <Section
          title="Browse Directory"
          description="Search the directory for a specific social service provider or browse by category."
        >
          <SearchBar
            placeholder={`Search ${resourceCount || ''} resources in San Francisco`}
            onSubmit={this.submitSearch}
            onChange={newSearchValue => this.setState({ searchValue: newSearchValue })}
            value={searchValue}
          />
        </Section>
        <Partners />
        <Footer />
      </div>
    );
  }
}

export default withRouter(HomePage);
