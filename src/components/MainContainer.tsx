import { useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import Publications from "./Publications";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import TechStack from "./TechStack";
import setSplitText from "./utils/splitText";
import { setProgress } from "./Loading";
import { useLoading } from "../context/LoadingProvider";

const MainContainer = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    const progress = setProgress((value) => setLoading(value));
    const done = () => progress.loaded();
    if (document.readyState === "complete") {
      const t = setTimeout(done, 400);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", done);
    const fallback = setTimeout(done, 3500);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <TechStack />
            <Publications />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
