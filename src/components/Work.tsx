import "./styles/Work.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdArrowOutward, MdClose } from "react-icons/md";
import { smoother } from "./Navbar";

interface Project {
  name: string;
  category: string;
  tools: string;
  details: string;
  highlights?: string[];
  link?: string;
}

const projects: Project[] = [
  {
    name: "Inventory Management System",
    category: "Relational DB · NC State",
    tools: "MySQL, Python, Stored Procedures, Triggers, BCNF/3NF",
    details:
      "A full relational database application for a frozen-meals manufacturer, modeling multi-entity supply-chain workflows across a normalized (BCNF/3NF) schema.",
    highlights: [
      "Stored procedures for transactional batch creation: FEFO lot selection, atomic inventory decrement, and cost computation",
      "Triggers for lot-number computation and expired-lot prevention",
      "Business-rule enforcement: compound-ingredient cycle detection and do-not-combine conflict validation",
      "Role-based access control for Manufacturer, Supplier, and Viewer roles",
    ],
  },
  {
    name: "Student Performance Modeling",
    category: "Machine Learning · NC State",
    tools: "Python, Django, Regression, Classification",
    details:
      "A supervised ML system on a 6,607×20 student-performance dataset spanning academic, socio-economic, and behavioral factors. I led the regression component, predicting continuous exam scores from features like study hours, attendance, sleep, and parental involvement.",
    highlights: [
      "Three predictive tasks: exam-score regression, extracurricular-participation classification, and score-improvement binary classification",
      "Deployed through a Django web app where user forms trigger model inference in the backend",
    ],
  },
  {
    name: "Bat-Eye Bioacoustics",
    category: "Deep Learning · NVIDIA-sponsored",
    tools: "TensorFlow, Signal Processing, Audio Classification",
    details:
      "TensorFlow deep-learning pipelines for 9-class bat-species classification from a 4GB ultrasonic recording dataset, in collaboration with Bat Conservation India Trust and NVIDIA.",
    highlights: [
      "89.5% overall classification accuracy",
      "Misclassification isolated to two acoustically similar species (Hipposideros armiger and H. speoris), showing strong generalization across the other seven",
      "Applied signal-processing techniques to extract features from raw ultrasonic audio",
    ],
  },
  {
    name: "Enchantler Analytics",
    category: "Data Analytics · Microsoft Engage",
    tools: "Pandas, Python, PHP, XAMPP, Regression",
    details:
      "A solo end-to-end analytics application across three datasets (EV registrations ~9K, automobile sales ~15K, make/model ~8K) built with Pandas, Python, PHP, and XAMPP.",
    highlights: [
      "Surfaced insights: Tesla dominated EV market share and California led all states in EV adoption",
      "Built a regression model to predict a competitive market price from car specifications",
      "This project secured selection for the Microsoft Engage Internship 2023",
    ],
  },
  {
    name: "State P-Card Analytics",
    category: "Business Intelligence · Power BI",
    tools: "Power BI, DAX, Power Query M, Anomaly Detection",
    details:
      "A full Power BI project (PBIP/TMDL, Git-trackable format) analyzing 196,806 Delaware state P-Card transactions (~26MB).",
    highlights: [
      "Power Query M transformations for cleaning + feature engineering (CustomerKey proxy, CategoryGroup bucketing)",
      "Statistical anomaly detection via per-category Z-scores (3σ) — flagged 2,789 anomalous transactions (~1.4%)",
      "Star schema with fact table, 291-row customer dimension, and a calculated date table",
      "8 DAX measures and 2 report pages: anomaly-highlighted table, trend charts, KPI cards, and a scatter plot",
    ],
  },
  {
    name: "TimeTable Automation",
    category: "Full-stack · RV College",
    tools: "Django, SQL, Constraint Solving",
    details:
      "A production SQL-backed, Django timetable-generation system in active use across 9 departments at RV College of Engineering (~300–360 faculty).",
    highlights: [
      "Automated constraint-solving for scheduling across courses, faculty, and rooms with conflict resolution and swap suggestions",
      "Reduced timetable admin workload by 60% — a process that took 10 days now takes 4",
    ],
  },
];

const Work = () => {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (smoother) smoother.paused(active !== null);
    return () => {
      if (smoother) smoother.paused(false);
    };
  }, [active]);

  const activeProject = active !== null ? projects[active] : null;

  return (
    <div className="work-section section-container" id="work">
      <h2 className="work-heading">
        My <span>Work</span>
      </h2>
      <div className="work-grid">
        {projects.map((project, index) => (
          <div
            className="work-card"
            key={index}
            onClick={() => setActive(index)}
            data-cursor="disable"
          >
            <div className={`work-thumb work-thumb-${index % 6}`}>
              <span className="work-thumb-num">0{index + 1}</span>
              <span className="work-thumb-name">{project.name}</span>
              <div className="work-thumb-overlay">
                <span className="work-thumb-cta">
                  View details <MdArrowOutward />
                </span>
              </div>
            </div>
            <div className="work-card-info">
              <h4>{project.name}</h4>
              <p className="work-card-cat">{project.category}</p>
              <p className="work-card-tools">{project.tools}</p>
            </div>
          </div>
        ))}
      </div>

      {activeProject &&
        createPortal(
          <div
            className="work-modal-overlay"
            onClick={() => setActive(null)}
            data-cursor="disable"
          >
            <div className="work-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="work-modal-close"
                onClick={() => setActive(null)}
                aria-label="Close"
                data-cursor="disable"
              >
                <MdClose />
              </button>
              <span className="work-modal-num">
                0{(active as number) + 1}
              </span>
              <h3>{activeProject.name}</h3>
              <p className="work-modal-cat">{activeProject.category}</p>
              <p className="work-modal-desc">{activeProject.details}</p>
              {activeProject.highlights && (
                <ul className="work-modal-list">
                  {activeProject.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              <h5>Tools &amp; features</h5>
              <div className="work-modal-tags">
                {activeProject.tools.split(",").map((t) => (
                  <span className="work-tag" key={t}>
                    {t.trim()}
                  </span>
                ))}
              </div>
              {activeProject.link && (
                <a
                  className="work-modal-link"
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="disable"
                >
                  Visit project <MdArrowOutward />
                </a>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Work;
