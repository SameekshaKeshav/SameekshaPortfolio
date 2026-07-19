import "./styles/About.css";

const highlights = [
  { value: "2+ yrs", label: "Industry experience — Microsoft, Samsung" },
  { value: "3", label: "Publications — IEEE & arXiv" },
  { value: "Best Paper", label: "IEEE CSITSS 2023" },
  { value: "9.70/10", label: "Undergrad GPA · Silver Medalist" },
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-highlights">
        {highlights.map((h) => (
          <div className="about-stat" key={h.label}>
            <span className="about-stat-value">{h.value}</span>
            <span className="about-stat-label">{h.label}</span>
          </div>
        ))}
      </div>
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
