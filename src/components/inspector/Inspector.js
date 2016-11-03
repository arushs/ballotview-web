import React from 'react';
import classNames from 'classnames';

import Video from './Video';

const Candidate = ({ data }) => {

  return (
    <div>
      {Object.keys(data).map(item => {
        if (['type', 'num_results', 'sortOrder'].indexOf(item) > -1) return;

        if (!data[item]) return;

        if (item === 'Image') {
          return (<div key={item} className="image">
            <img src={data[item]} />
          </div>);
        }

        if (typeof data[item] !== 'object') {
          return (<div key={item} className="item">
            <div className="heading">{item}</div>
            <div className="info">{data[item]}</div>
          </div>);
        }
      })}
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
            className={classNames('inspector_widget', 'video')}>
            <Video data={module} />
          </li>
        );
      }
    })}
  </ul>
);

export default Inspector;
