import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { site } from "../data/site";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href={`mailto:${site.email}`} data-cursor="disable">
                {site.email}
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a href={site.phoneHref} data-cursor="disable">
                {site.phone}
              </a>
            </p>
            <h4>Location</h4>
            <p>{site.location}</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Github <MdArrowOutward />
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Resume <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>{site.name}</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
