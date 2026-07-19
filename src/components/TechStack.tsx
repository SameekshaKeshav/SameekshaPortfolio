import { useEffect, useRef } from "react";
import "./styles/TechStack.css";

const techs: string[] = [
  "Python",
  "C#",
  "SQL",
  "KQL",
  "JavaScript",
  "TensorFlow",
  "NLP",
  "SBERT",
  "t-SNE",
  "Ollama",
  "Pandas",
  "NumPy",
  "Azure",
  "AWS",
  "Kubernetes",
  "Cosmos DB",
  "Data Factory",
  "ETL / ELT",
  ".NET",
  "Django",
  "Power BI",
  "Git & CI/CD",
];

// Distribute N points evenly on a sphere (Fibonacci sphere).
function fibonacciSphere(n: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    points.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  return points;
}

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const base = fibonacciSphere(techs.length);
    const radius =
      Math.min(window.innerWidth * 0.34, 300) * (window.innerWidth < 600 ? 0.8 : 1);

    let rotX = -0.3;
    let rotY = 0;
    // auto-spin velocity; nudged by pointer position
    let velX = 0.0006;
    let velY = 0.0016;
    let targetVelX = velX;
    let targetVelY = velY;

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      targetVelY = dx * 0.02;
      targetVelX = -dy * 0.02;
    };
    const onLeave = () => {
      targetVelX = 0.0006;
      targetVelY = 0.0016;
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const render = () => {
      velX += (targetVelX - velX) * 0.05;
      velY += (targetVelY - velY) * 0.05;
      rotX += velX;
      rotY += velY;

      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);

      for (let i = 0; i < base.length; i++) {
        const [bx, by, bz] = base[i];
        // rotate around Y then X
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const px = x1 * radius;
        const py = y2 * radius;
        const depth = (z2 + 1) / 2; // 0 (back) .. 1 (front)
        const scale = 0.55 + depth * 0.6;
        const opacity = 0.25 + depth * 0.75;

        const tag = tagsRef.current[i];
        if (tag) {
          tag.style.transform = `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0) scale(${scale})`;
          tag.style.opacity = `${opacity}`;
          tag.style.zIndex = `${Math.round(depth * 100)}`;
          tag.style.filter = depth < 0.4 ? `blur(1px)` : "none";
        }
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="techstack" id="techstack">
      <h2>My Tech Stack</h2>
      <div className="tech-sphere-wrap">
        <div className="tech-sphere" ref={containerRef}>
          {techs.map((t, i) => (
            <span
              className="tech-tag"
              key={t}
              ref={(el) => (tagsRef.current[i] = el)}
              data-cursor="disable"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
