import React from 'react';
import classNames from 'classnames';

import Video from './Video';

var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();

const Candidate = ({ data }) => {
  let openBallotPedia = () => {
    window.open(data.PageURL);
  };

  return (
    <div>
      {Object.keys(data).map(item => {
        if (['type', 'num_results', 'sortOrder', 'PageURL'].indexOf(item) > -1) return;

        if (!data[item]) return;

        if (item === 'Image') {
          return (<div key={item} className="image">
            <img src={data[item]} />
          </div>);
        }

        if (item === 'Name') {
          return (<div key={item} className="heading1">
            {data[item]}
          </div>);
        }

        if (item === 'source') {
          return (<div key={item} className="source">source: {data[item]}</div>);
        }

        if (typeof data[item] !== 'object') {
          data[item] = decodeEntities(data[item]);
          return (<div key={item} className="item">
            <div className="heading2">{item}</div>
            <div className="info">{data[item]}</div>
          </div>);
        }
      })}
      <button onClick={openBallotPedia}>View more on BallotPedia</button>
    </div>
  );
}

const Inspector = ({ modules, cardInfo }) => (
  <ul>
    {modules.map((module, i) => {

      let style = {};

      if ('color' in cardInfo.poll[i]) {
        style['borderColor'] = cardInfo.poll[i].color;
      }

      if (module.constructor === Array) {
        return (<li key={i} className={classNames('inspector_widget', 'card')} style={style}>
          {module.map((mod, j) => (<Candidate key={j} data={mod} />))}
        </li>);
      }
      else if (module.type == 'candidate') {
        return (
          <li key={i} className={classNames('inspector_widget', 'card')} style={style}>
            <Candidate data={module} />
          </li>
        );
      }
      else if (module.type == 'video') {
        return (
          <li key={i}
            className={classNames('inspector_widget', 'video', 'card')}>
            <Video data={module} />
          </li>
        );
      }
    })}
  </ul>
);

export default Inspector;
