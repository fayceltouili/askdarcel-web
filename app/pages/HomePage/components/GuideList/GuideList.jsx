import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ServiceDiscoveryModal from 'components/ui/Modal/ServiceDiscoveryModal';
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

const GuideCard = ({
  img, link, name, categoryId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const anchorTagProps = categoryId ? {
    role: 'button',
    onClick: () => setModalOpen(true),
  } : {
    href: link,
    target: '_blank',
  };

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
      {modalOpen && (
        <ServiceDiscoveryModal
          categoryId={categoryId}
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          isEligibility
        />
      )}
    </a>
  );
};

GuideCard.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  categoryId: PropTypes.string,
};

GuideCard.defaultProps = {
  categoryId: '',
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
          categoryId="5"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Youth Homelessness"
          link="https://sheltertech.typeform.com/to/mXv584"
          img={ImgYouthHomelessness}
          categoryId="4"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Adult Homelessness"
          link="https://sheltertech.typeform.com/to/KXi3Pp"
          img={ImgAdultHomelessness}
          categoryId="4"
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Food resources"
          link="/covid/foodmap"
          img={ImgFood}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Hygiene"
          link="/covid/hygiene"
          img={Imghygiene}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Medical Services"
          link="/covid/medicalservices"
          img={Imgmedicalservices}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Domestic Violence"
          link="/covid/domesticviolence"
          img={Imgdomesticviolence}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Internet Access"
          link="/covid/internet"
          img={Imginternet}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Financial and Job Assistance"
          link="/covid/financialassistance"
          img={Imgfinancialassistance}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="Rental Assistance"
          link="/covid/rentalassistance"
          img={Imgrentalassistance}
        />
      </li>
      <li className={styles.item}>
        <GuideCard
          name="LGBTQ Resources"
          link="/covid/lgbtq"
          img={Imglgbtq}
        />
      </li>
      {/* Note: these resource guides have temporarily been disabled due to covid.
      Leaving them here commented out so that they can easily be re-enabled at a later date */}
      {/* <li className={styles.item}>
        <GuideCard
          name="Eviction Prevention"
          link="https://sheltertech.typeform.com/to/AuWYAN"
          img={ImgEviction}
          categoryId="4"
        />
      </li> */}
      {/* <li className={styles.item}>
        <GuideCard
          name="Affordable Housing"
          link="https://sheltertech.typeform.com/to/w8R0b8"
          img={ImgAffordableHousing}
          categoryId="4"
        />
      </li> */}
    </ul>
  </div>
);

export default GuideList;
