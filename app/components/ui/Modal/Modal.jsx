import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import Modal from 'react-modal';

import styles from './Modal.scss';

export const BaseModal = props => {
  const {
    backButtonText, closeModal, modalContent, isFullScreen,
  } = props;

  const modalBody = isFullScreen ? (
    <Fragment>
      <div className={styles.fullscreenModalHeader}>
        <div className={styles.fullscreenModalBackButton} role="button" onClick={e => { e.stopPropagation(); closeModal(); }} tabIndex="0">
          <i className="material-icons">keyboard_arrow_left</i>
          {backButtonText}
        </div>
      </div>
      <div className={styles.fullscreenModalBody}>
        {modalContent}
      </div>
    </Fragment>
  ) : null;

  return (
    <Modal
      className={isFullScreen ? styles.fullScreenModalContent : styles.baseModalContent}
      overlayClassName={styles.baseModalOverlay}
      appElement={document.getElementById('root')}
      {...props}
    >
      {modalBody}
    </Modal>
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  backButtonText: PropTypes.string,
  closeModal: PropTypes.func,
  modalContent: PropTypes.element,
  isFullScreen: PropTypes.bool,
};

BaseModal.defaultProps = {
  backButtonText: null,
  closeModal: noop,
  modalContent: null,
  isFullScreen: false,
};
