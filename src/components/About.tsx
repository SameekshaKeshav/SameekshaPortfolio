import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I&apos;m a Master&apos;s student in Computer Science (Data Science
          track) at NC State, with 2+ years building production systems across
          software, data engineering, and applied AI/ML. As a Software Engineer
          on Microsoft&apos;s Azure DevDiv observability team, I shipped
          large-scale telemetry pipelines for distributed systems &mdash; and I
          love turning messy data into models and decisions that move real
          metrics.
        </p>
      </div>
    </div>
  );
};

export default About;
