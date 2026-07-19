import "./styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing-section" id="landingDiv">
      <div className="landing-container">
        <div className="landing-intro">
          <h2>Hello! I'm</h2>
          <h1>
            SAMEEKSHA
            <br />
            <span>KESHAV</span>
          </h1>
        </div>
        <div className="landing-info">
          <h3>I am a</h3>
          <h2 className="landing-info-h2">
            <div className="landing-h2-1">Data Scientist</div>
            <div className="landing-h2-2">ML Engineer</div>
          </h2>
          <h2>
            <div className="landing-h2-info">Data Scientist</div>
            <div className="landing-h2-info-1">ML Engineer</div>
          </h2>
        </div>
      </div>
      <div className="landing-hero character-loaded">
        <div className="character-rim"></div>
        <div className="landing-image">
          <img
            src="/images/profile.jpg"
            alt="Sameeksha Keshav"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith("profile-placeholder.svg")) {
                img.src = "/images/profile-placeholder.svg";
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
