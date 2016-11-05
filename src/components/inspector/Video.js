import React from 'react';

const Video = ({ data, ...other }) => {
  let { type, embed, embed_id, source, source_url, title, ballotfyi_url, voterguide_url} = data;
  let openBallotFYI = () => {
    window.open(ballotfyi_url);
  };

  let openVoterGuide = () => {
    window.open(voterguide_url);
  };


  if (embed === 'youtube' && embed_id != "") {
    return (
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
        <br />
        <button className="small" onClick={openBallotFYI}>View more on Ballot.Fyi</button>
        <button className="small" onClick={openVoterGuide}>View more on VoterGuide</button>
      </section>
    );
  } else if (embed ==='youtube') {
    return (
      <section>
        <div>
          {title}
        </div>
        <button className="small" onClick={openBallotFYI}>View more on Ballot.Fyi</button>
        <button className="small" onClick={openVoterGuide}>View more on VoterGuide</button>
      </section>
      );
  } else {
    return (<div>Error</div>);
  }

};

export default Video;
