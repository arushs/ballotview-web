import React from 'react';
import classNames from 'classnames';

import Video from './Video';

const Inspector = ({ modules }) => (
  <ul>
    {modules.map((module, i) => {
      console.log(module.type);
      if (module.type == 'video') {
        return (
          <li key={i}
            className={classNames('inspector_widget', 'video')}>
            <Video data={module} />
          </li>
        );
      }
      else if (module.type == 'candidate') {
        console.log(module.Name);
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
