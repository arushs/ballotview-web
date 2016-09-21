import React from 'react';

const BallotClickableText = ({ text, click, ...other }) => (
  <span {...other}>
    {text.map((data, i) => {

      if (typeof data === 'object') {
        if (data.click) {
          return (
            <span
              key={i}
              className="clickable"
              onClick={click(data.text)}
            >{data.text}</span>
          );
        } else {
          return (<span key={i}>{data.text}</span>);
        }
      } else {
        return (<span key={i}>{data}</span>);
      }
    })}
  </span>
);

BallotClickableText.propTypes = {
  text: React.PropTypes.array.isRequired,
  click: React.PropTypes.func,
};

export default BallotClickableText;
