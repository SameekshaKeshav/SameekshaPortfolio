import "./styles/Publications.css";
import { MdArrowOutward } from "react-icons/md";

interface Paper {
  authors: string;
  title: string;
  venue: string;
  award?: string;
  link?: string;
}

const papers: Paper[] = [
  {
    authors: "Nayak A., Prajwal N. J., Sameeksha Keshav, et al.",
    title:
      "Popularity Estimation and New Bundle Generation using Content and Context based Embeddings",
    venue: "arXiv:2412.17310 [cs.IR], 2024",
    link: "https://arxiv.org/abs/2412.17310",
  },
  {
    authors: "N. J. Prajwal, Sameeksha Keshav, et al.",
    title: "Emotion Based Carnatic Music Recommendation System",
    venue: "IEEE CSITSS 2023 · doi:10.1109/CSITSS60515.2023.10334239",
    award: "Best Paper Award",
    link: "https://doi.org/10.1109/CSITSS60515.2023.10334239",
  },
  {
    authors: "N. J. Prajwal, Sameeksha Keshav, et al.",
    title:
      "Automating Registration of Executables as Commands on the Ubuntu-Linux Platform",
    venue: "IEEE INCET 2024 · doi:10.1109/INCET61516.2024.10593197",
    link: "https://doi.org/10.1109/INCET61516.2024.10593197",
  },
];

const honors: string[] = [
  "Silver Medallist — 2nd Rank, Information Science (2023)",
  "Best Paper Award — IEEE CSITSS 2023",
  "Microsoft Certified: Azure Data Fundamentals (DP-900) & Azure Fundamentals (AZ-900)",
  "AWS: Cloud Practitioner Essentials, Amazon EMR, Amazon Athena (2026)",
];

const Publications = () => {
  return (
    <div className="publications-section section-container" id="publications">
      <h2 className="pub-heading">
        Publications <span>&</span> Honors
      </h2>
      <div className="pub-flex">
        <div className="pub-papers">
          {papers.map((p) => (
            <a
              className="pub-card"
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
            >
              {p.award && <div className="pub-award">{p.award}</div>}
              <h3 className="title">{p.title}</h3>
              <p className="pub-authors">{p.authors}</p>
              <p className="pub-venue">
                {p.venue}
                {p.link && <MdArrowOutward />}
              </p>
            </a>
          ))}
        </div>
        <div className="pub-honors">
          <h4>Honors &amp; Certifications</h4>
          <ul>
            {honors.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Publications;
