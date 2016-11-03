import React from 'react';
import classNames from 'classnames';

import Video from './Video';

const Inspector = ({ modules }) => (
  <ul>
    {modules.map((module, i) => {

      if (module.constructor === Array) {
        return (<li key={i} className={classNames('inspector_widget', 'card')}>
          {module.map((mod, j) => (
            <div key={j}>{console.log(mod)}{Object.keys(mod).map(item => (
              <div key={item}>{item}: {JSON.stringify(mod[item])}</div>
            ))}</div>
          ))}
        </li>);
      }
      else if (module.type == 'candidate') {
        return (
          <li key={i}
            className={classNames('inspector_widget', 'card')}>
            {Object.keys(module).map(item => (
              <div key={item}>{item}: {JSON.stringify(module[item])}</div>
            ))}
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
