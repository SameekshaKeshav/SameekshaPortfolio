import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface Project {
  name: string;
  category: string;
  tools: string;
  link?: string;
}

const projects: Project[] = [
  {
    name: "Inventory Management System",
    category: "Relational DB · NC State",
    tools: "MySQL, Python, Stored Procedures, Triggers, BCNF/3NF",
  },
  {
    name: "Student Performance Modeling",
    category: "Machine Learning · NC State",
    tools: "Python, Django, Regression, Classification",
  },
  {
    name: "Bat-Eye Bioacoustics",
    category: "Deep Learning · NVIDIA-sponsored",
    tools: "TensorFlow, Signal Processing, 9-class Audio Classification",
  },
  {
    name: "Enchantler Analytics",
    category: "Data Analytics · Microsoft Engage",
    tools: "Pandas, Python, PHP, Regression",
  },
  {
    name: "State P-Card Analytics",
    category: "Business Intelligence",
    tools: "Power BI, DAX, Power Query M, Anomaly Detection",
  },
  {
    name: "TimeTable Automation",
    category: "Full-stack · RV College",
    tools: "Django, SQL, Constraint Solving",
  },
];

const Work = () => {
  useGSAP(() => {
    function getTranslateX(): number {
      const box = document.getElementsByClassName("work-box");
      const container = document.querySelector(".work-container");
      if (!box.length || !container) return 0;
      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return Math.max(
        0,
        rect.width * box.length - (rectLeft + parentWidth) + padding
      );
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <div className="work-image">
                <div className={`work-thumb work-thumb-${index % 6}`}>
                  <span className="work-thumb-num">0{index + 1}</span>
                  <span className="work-thumb-name">{project.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
