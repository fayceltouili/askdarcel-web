import React, { Fragment } from 'react';

import './FeedbackSteps.scss';

export const FeedbackTags = ({ tagOptions, onSelectTag }) => (
  <div className="feedback-tags">
    {tagOptions.map(({ tag, selected }, pos) => (
      <div
        key={tag}
        role="button"
        tabIndex="0"
        className={`feedback-tag ${selected ? 'selected' : ''}`}
        onClick={() => onSelectTag(pos)}
      >
        {tag}
      </div>
    ))}
  </div>
);

export const Review = ({ reviewValue, onReviewChange, reviewRequired }) => (
  <div className="feedback-review">
    <textarea
      type="text"
      placeholder={`Type your feedback here ${
        !reviewRequired ? '(optional)' : ''
      }`}
      value={reviewValue}
      onChange={onReviewChange}
    />
  </div>
);

export const SubmitMessage = ({ closeModal }) => (
  <Fragment>
    <div className="feedback-submit-header">Thank you for your feedback!</div>
    <div className="feedback-submit-subheader">
    Your feedback will help us continue to improve this guide.
    </div>
    <div className="feedback-action-buttons">
      <button type="button" className="button" onClick={closeModal}>
        Close
      </button>
    </div>
  </Fragment>
);

export const tagList = [
  {
    tag: 'Contact Information',
    selected: false,
  },
  {
    tag: 'Hours',
    selected: false,
  },
  {
    tag: 'Address',
    selected: false,
  },
  {
    tag: 'Website Link',
    selected: false,
  },
  {
    tag: 'Information missing',
    selected: false,
  },
  {
    tag: 'Other',
    selected: false,
  },
];
