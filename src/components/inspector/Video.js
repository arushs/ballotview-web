import React from 'react';

const Video = ({ data, ...other }) => {
  let { type, embed, embed_id, source, source_url, title } = data;

  if (embed === 'youtube') {
    return (
      <div class="card">
        <section>
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + embed_id + "?rel=0"}
            frameBorder="0"
            allowFullScreen>
          </iframe>
          <div>
            from <a href={source_url} target="_blank">{source}</a>
          </div>
        </section>
      </div>
    );
  } else {
    return (<div>Error</div>);
  }

};

export default Video;
