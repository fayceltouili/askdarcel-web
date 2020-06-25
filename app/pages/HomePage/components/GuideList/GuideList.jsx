import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import * as typeformEmbed from '@typeform/embed';

import styles from './GuideList.scss';

import ImgFamilyHomelessness from './assets/FamilyHomelessness.jpg';
import ImgYouthHomelessness from './assets/YouthHomelessness.jpg';
import ImgAdultHomelessness from './assets/AdultHomelessness.jpg';
import ImgFood from './assets/food.jpg';
import Imgfinancialassistance from './assets/financialassistance.jpg';
import Imgshelteraccess from './assets/shelteraccess.jpg';
import Imgmedicalservices from './assets/medicalservices.jpg';
import Imgrentalassistance from './assets/rentalassistance.jpg';
import Imginternet from './assets/internet.jpg';
import Imghygiene from './assets/hygiene.jpg';
import Imgdomesticviolence from './assets/domesticviolence.jpg';
import Imglgbtq from './assets/lgbtq.jpg';

function typeform(event, link) {
  const typeformReference = typeformEmbed.makePopup(
    link,
    {
      mode: 'popup',
      hideFooters: true,
    },
  );
  typeformReference.open();
}

const GuideCard = ({
  img, link, name, categorySlug, isTypeform = false,
}) => {
  const history = useHistory();

  let anchorTagProps;

  if (isTypeform) {
    anchorTagProps = {
      role: 'button',
      onClick: e => { typeform(e, link); },
    };
  } else if (categorySlug) {
    anchorTagProps = {
      role: 'button',
      onClick: () => history.push(`/${categorySlug}/form`),
    };
  } else {
    anchorTagProps = {
      href: link,
      target: '_blank',
    };
  }

  return (
    <a
      className={styles.cardLink}
      {...anchorTagProps}
    >
      <div className={styles.card}>
        <img
          className={styles.cardImage}
          src={img}
          alt={name}
        />
        <div className={styles.cardTextWrapper}>
          <div className={styles.cardText}>
            {name}
            <button className={styles.cardLinkText} type="button">
                Explore Guide →
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

GuideCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  categorySlug: PropTypes.string,
  isTypeform: PropTypes.bool,
};

GuideCard.defaultProps = {
  link: undefined,
  categorySlug: '',
  isTypeform: false,
};

const GuideList = () => (
  <div className={styles.wrapper}>
    <ul className={styles.list}>
      <li className={styles.item}>
        <GuideCard
          name="Shelter &#38; Quarantine Updates"
          link="/covid/shelteraccess"
          img={Imgshelteraccess}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Family Homelessness"
          link="https://sheltertech.typeform.com/to/GFEzl2"
          img={ImgFamilyHomelessness}
          isTypeform
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Youth Homelessness"
          link="https://sheltertech.typeform.com/to/mXv584"
          img={ImgYouthHomelessness}
          isTypeform
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Adult Homelessness"
          link="https://sheltertech.typeform.com/to/KXi3Pp"
          img={ImgAdultHomelessness}
          isTypeform
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Food resources"
          img={ImgFood}
          categorySlug="food-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Hygiene"
          img={Imghygiene}
          categorySlug="hygiene-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Medical Services"
          img={Imgmedicalservices}
          categorySlug="medical-services-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Domestic Violence"
          img={Imgdomesticviolence}
          categorySlug="domestic-violence-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Internet Access"
          img={Imginternet}
          categorySlug="internet-access-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Financial and Job Assistance"
          img={Imgfinancialassistance}
          categorySlug="financial-and-job-assistance-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Rental Assistance"
          img={Imgrentalassistance}
          categorySlug="rental-assistance-resources"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="LGBTQ Resources"
          img={Imglgbtq}
          categorySlug="lgbtq-resources"
        />
      </li>
      {/* Note: these resource guides have temporarily been disabled due to covid.
      Leaving them here commented out so that they can easily be re-enabled at a later date */}
      {/* <li className={styles.item}>
        <GuideCard
          name="Eviction Prevention"
          link="https://sheltertech.typeform.com/to/AuWYAN"
          img={ImgEviction}
          isTypeform
        />
      </li> */}
      {/* <li className={styles.item}>
        <GuideCard
          name="Affordable Housing"
          link="https://sheltertech.typeform.com/to/w8R0b8"
          img={ImgAffordableHousing}
          isTypeform
        />
      </li> */}
    </ul>
  </div>
);

export default GuideList;
