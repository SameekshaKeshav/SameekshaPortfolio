import "./styles/Career.css";

interface CareerItem {
  role: string;
  company: string;
  year: string;
  desc: string;
}

const careers: CareerItem[] = [
  {
    role: "Research Intern",
    company: "Samsung Research Institute",
    year: "2023",
    desc: "Ran big-data analytics on game metadata using Python, t-SNE, and SBERT to power bundle recommendations, collaborating with a 3-person research team.",
  },
  {
    role: "SWE Intern",
    company: "Microsoft India (R&D)",
    year: "2023",
    desc: "Built an Azure Data Explorer dashboard for service reliability trends and deployed an Azure ML pipeline to predict delivery dates for internal orders.",
  },
  {
    role: "AI/ML Intern",
    company: "NividApps",
    year: "2024",
    desc: "Developed a vendor recommendation system to streamline MSME procurement and improve vendor-selection accuracy within ERP workflows.",
  },
  {
    role: "Software Engineer",
    company: "Microsoft (Azure DevDiv)",
    year: "2024",
    desc: "On the observability team, built logs and metrics pipelines for Kubernetes-based distributed systems and engineered a zero-downtime Cosmos DB ETL migration (MongoDB API → Core API).",
  },
  {
    role: "AI Engineering Intern",
    company: "Tavant Technologies",
    year: "NOW",
    desc: "Building an agentic AI travel-planning chatbot in Python with Ollama that reasons over backend data to generate reliable itinerary recommendations.",
  },
];

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careers.map((c) => (
            <div className="career-info-box" key={c.company + c.year}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{c.role}</h4>
                  <h5>{c.company}</h5>
                </div>
                <h3>{c.year}</h3>
              </div>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
