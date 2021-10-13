import React from 'react';

const Rating = props => {
  const { value, text } = props;

  return (
    <>
      {value} stars, {text}
    </>
  );
};

export default Rating;
