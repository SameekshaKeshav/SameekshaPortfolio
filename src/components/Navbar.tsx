import { useEffect, useState, type MouseEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { site } from "../data/site";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const navLinks = [
  { href: "#about", text: "ABOUT" },
  { href: "#work", text: "WORK" },
  { href: "#publications", text: "RESEARCH" },
  { href: "#contact", text: "CONTACT" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = element.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    setOpen(false);
  };

  const goTo = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMenu();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className={`header ${open ? "nav-open" : ""}`}>
        <a href="/#" className="navbar-title" data-cursor="disable" onClick={closeMenu}>
          SK
        </a>
        <a
          href={`mailto:${site.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {site.email}
        </a>
        <button
          type="button"
          className={`nav-toggle ${open ? "is-open" : ""}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a data-href={link.href} href={link.href}>
                <HoverLinks text={link.text} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={`nav-menu ${open ? "is-open" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={goTo(link.href)}>
                {link.text}
              </a>
            </li>
          ))}
          <li>
            <a href={site.resume} target="_blank" rel="noreferrer" onClick={closeMenu}>
              RESUME
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer" onClick={closeMenu}>
              LINKEDIN
            </a>
          </li>
          <li>
            <a href={site.github} target="_blank" rel="noreferrer" onClick={closeMenu}>
              GITHUB
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
