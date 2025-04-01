"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { data } from "./data";

export default function Home() {
  const name = data.name.split(" ");
  let job = data.job.split(" ");
  let index = job.length - 1;
  job.splice(index, 0, job[index].charAt(0));
  job.splice(index + 1, 1, job[index + 1].substring(1));
  index = job.length - 1;

  const [pageHeight, setPageHeight] = useState(297);

  useEffect(() => {
    function getPageHeightInMM() {
      const pageHeightPx = document.querySelector(".page")?.scrollHeight || 0;
      const mmPerPx = 25.4 / 96;
      return (pageHeightPx * mmPerPx).toFixed(0);
    }

    setPageHeight(getPageHeightInMM());
  }, []);

  useEffect(() => {
    const portal = document.getElementsByTagName("nextjs-portal")[0];
    if (portal && portal.parentNode) {
      portal.parentNode.removeChild(portal);
    }
  }, []);

  // Function to create SVG circle path based on rating
  const circle = (rating) => {
    // This is a simplified implementation - in a real app you'd need proper arc calculation
    // The original function was imported from ./common but not provided
    // This is a placeholder that creates a partial circle based on rating
    const radius = 16;
    const center = 19;
    const percentage = rating / 5;
    const endAngle = percentage * 2 * Math.PI;

    return `M ${center} ${center - radius} A ${radius} ${radius} 0 ${
      endAngle > Math.PI ? 1 : 0
    } 1 
            ${center + radius * Math.sin(endAngle)} ${
      center - radius * Math.cos(endAngle)
    }`;
  };

  return (
    <div className="page">
      {/* --------------------------------------------------------------------------- */}
      {/* ----------------------------------TOP-------------------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="top">
        <div className="top-left">
          <img
            src="/ellipse1.png"
            alt="Background ellipse"
            className="ellipse ellipse1"
          />
          <img
            src="/ellipse2.png"
            alt="Background ellipse"
            className="ellipse ellipse2"
          />
          <div className="top-image">
            <img src={data.profile} alt="Profile" className="profile" />
          </div>
        </div>
        <div className="top-right">
          <div className="top-row">
            <div className="links">
              <div className="link">
                <img
                  src="/fb.png"
                  alt="Facebook icon"
                  className="social-icon"
                />
                <Link
                  target="_blank"
                  href={data.fb}
                  className="social-text font"
                >
                  Facebook
                </Link>
              </div>
              <div className="link">
                <img
                  src="/globe.png"
                  alt="Website icon"
                  className="social-icon"
                />
                <Link
                  target="_blank"
                  href={data.web}
                  className="social-text font"
                >
                  Portfolio
                </Link>
              </div>
            </div>
            {job ? (
              <div className="job-title">
                {job.map((j, i) => {
                  if (i === index - 1) return null;
                  else if (i === index)
                    return (
                      <div key={i} className="job-row">
                        <span className="job-text" style={{ paddingRight: 0 }}>
                          {job[index - 1]}
                        </span>
                        <span className="job-text job-bg">{j}</span>
                      </div>
                    );
                  else
                    return (
                      <span
                        key={i}
                        className="job-text"
                        style={{ paddingRight: 0 }}
                      >
                        {j}
                      </span>
                    );
                })}
              </div>
            ) : null}
          </div>
          <div className="name-cont">
            {name.map((n, i) => {
              if (i === 0)
                return (
                  <span key={i} className="top-name underline">
                    {n}
                  </span>
                );
              else
                return (
                  <div key={i} style={{ flexDirection: "row" }}>
                    <span className="top-name">&nbsp;</span>
                    <span className="top-name">{n}</span>
                  </div>
                );
            })}
          </div>
          <p className="font top-description">{data.about}</p>
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* ---------------------------------CONTACTS---------------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="contact">
        <div className="contact-cont">
          <div className="contact-icont">
            <img src="/phone.png" alt="Phone icon" className="contact-icon" />
          </div>
          <div className="contact-text">
            <p className="font contact-text1">Phone:</p>
            {/* <p className="font contact-text2">+977 {data.phone}</p> */}
            <Link
              target="_blank"
              href={`tel:+977${data.phone}`}
              className="font contact-text2"
            >
              +977&nbsp;{data.phone}
            </Link>
          </div>
        </div>
        <div className="contact-cont">
          <div className="contact-icont">
            <img src="/email.png" alt="Email icon" className="contact-icon" />
          </div>
          <div className="contact-text">
            <p className="font contact-text1">Email:</p>
            {/* <p className="font contact-text2">{data.email}</p> */}
            <Link
              target="_blank"
              href={`mailto:${data.email}`}
              className="font contact-text2"
            >
              {data.email}
            </Link>
          </div>
        </div>
        <div className="contact-cont">
          <div className="contact-icont">
            <img
              src="/address.png"
              alt="Address icon"
              className="contact-icon"
            />
          </div>
          <div className="contact-text">
            <p className="font contact-text1">Address:</p>
            <p className="font contact-text2">{data.address}</p>
          </div>
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* ----------------------------------EXPERIENCE------------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="exp">
        <div className="exp-iconc">
          <img src="/head.png" alt="Experience icon" className="exp-icon" />
        </div>
        <h2 className="font exp-exp">Experience</h2>
        {data.experience.map((e, i) => (
          <div key={i} className="exp-cont">
            <div className="exp-titlec">
              <h3 className="font exp-title">{e.jobTitle}</h3>
              <div className="exp-date">
                <img
                  src="/calender.png"
                  alt="Calendar icon"
                  className="exp-cal"
                />
                <span className="font exp-datet">
                  {e.startDate} - {e.endDate}
                </span>
              </div>
              <img src="/tick.png" alt="Tick icon" className="exp-tick" />
            </div>
            <h4 className="font exp-org">{e.organization}</h4>
            {e.description.map((d, i) => (
              <div key={i} className="exp-desc">
                <div className="exp-cir"></div>
                <p className="font exp-des">{d}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* --------------------------------------------------------------------------- */}
      {/* --------------------------------------EDUCATION---------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="edu">
        <div className="edu-left"></div>
        <div className="exp edu-edu">
          <div className="exp-iconc">
            <img src="/head.png" alt="Education icon" className="exp-icon" />
          </div>
          <h2 className="font exp-exp">Education</h2>
          {data.education.map((e, i) => (
            <div key={i} className="exp-cont">
              <div className="exp-titlec">
                <h3 className="font exp-title">{e.title}</h3>
                <div className="exp-date">
                  <img
                    src="/calender.png"
                    alt="Calendar icon"
                    className="exp-cal"
                  />
                  <span className="font exp-datet">
                    {e.startDate} - {e.endDate}
                  </span>
                </div>
                <img src="/tick.png" alt="Tick icon" className="exp-tick" />
              </div>
              <h4 className="font exp-org">{e.organization}</h4>
            </div>
          ))}
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* -----------------------------------SKILLS---------------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="skills">
        <div className="skill">
          <div className="skill-box">
            <div className="skill-iconc">
              <img src="/head.png" alt="Skills icon" className="exp-icon" />
            </div>
            <h2 className="font skill-htext">SKILLS</h2>
          </div>
          <div className="skill-line"></div>
        </div>
        <div className="skill-row">
          {data.skills.map((s, i) => (
            <div key={i} className="skill-cont">
              <div className="svg-cont">
                <svg className="svg" width="38" height="38" viewBox="0 0 38 38">
                  <circle
                    cx="19"
                    cy="19"
                    r="16"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="5"
                    className="skill-circle"
                  />
                  {s.rating === 5 ? (
                    <circle
                      cx="19"
                      cy="19"
                      r="16"
                      fill="none"
                      stroke="#373D48"
                      strokeWidth="5"
                      className="skill-circle"
                    />
                  ) : (
                    <path
                      d={circle(s.rating)}
                      stroke="#373D48"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  )}
                </svg>
              </div>
              <div className="skill-namec">
                <span className="font skill-name">{s.name}</span>
                <div className="stars">
                  {[...Array(parseInt(s.rating))].map((_, j) => (
                    <img
                      key={j}
                      src="/stary.png"
                      alt="Filled star"
                      className="star"
                    />
                  ))}
                  {[...Array(5 - parseInt(s.rating))].map((_, j) => (
                    <img
                      key={j}
                      src="/starb.png"
                      alt="Empty star"
                      className="star"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* ------------------------------------PROJECTS------------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="exp" style={{ marginTop: "1.5rem" }}>
        <img src="/ell2.png" alt="Background ellipse" className="ell ell2" />
        <img src="/ell1.png" alt="Background ellipse" className="ell ell1" />
        <div className="exp-iconc">
          <img src="/head.png" alt="Projects icon" className="exp-icon" />
        </div>
        <h2 className="font exp-exp">Projects</h2>
        {data.projects.map((e, i) => (
          <div key={i} className="exp-cont">
            <div className="exp-titlec">
              <Link
                target="_blank"
                href={e.link}
                className="font exp-title no-underline"
              >
                {e.title}
              </Link>
              <img
                src="/tick.png"
                alt="Tick icon"
                className="exp-tick"
                style={{ top: "1.5pt" }}
              />
            </div>
            <h4 className="font exp-org">{e.expertise}</h4>
            {e.description.map((d, i) => (
              <div key={i} className="exp-desc">
                <div className="exp-cir"></div>
                <p className="font exp-des" style={{ paddingRight: "90pt" }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* --------------------------------------TRAININGS---------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      {data.trainings && data.trainings.length > 0 ? (
        <div className="edu">
          <div className="edu-left"></div>
          <div className="exp edu-edu">
            <div className="exp-iconc">
              <img src="/head.png" alt="Trainings icon" className="exp-icon" />
            </div>
            <h2 className="font exp-exp">COURSES/ TRAININGS</h2>
            {data.trainings.map((e, i) => (
              <div key={i} className="exp-cont">
                <div className="exp-titlec">
                  <h3 className="font exp-title">{e.title}</h3>
                  {e.github ? (
                    <Link target="_blank" href={e.github} className="exp-date">
                      <span className="font exp-datet">Github Link</span>
                      <img
                        src="/external-link.png"
                        // src="/link.png"
                        alt="Link icon"
                        className="exp-cal"
                        style={{
                          opacity: 0.7,
                          marginRight: 0,
                          marginLeft: "5pt",
                        }}
                      ></img>
                    </Link>
                  ) : (
                    <div style={{ height: "37pt" }} />
                  )}
                  <img src="/tick.png" alt="Tick icon" className="exp-tick" />
                </div>
                <h4 className="font exp-org">{e.organization}</h4>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {/* --------------------------------------------------------------------------- */}
      {/* ------------------------------HOBBY/INTEREST/LANG-------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="hobby">
        {data.hobbies && data.hobbies.length > 0 && (
          <div className="hobby-hobbyc">
            <div className="hobby-hobby" style={{ height: "150pt" }}>
              {data.hobbies.map((h, i) => (
                <div key={i} className="hobby-item">
                  <span className="font hobby-text">{h}</span>
                </div>
              ))}
            </div>
            <div className="hobby-hobbytc">
              <div className="skill-box">
                <div className="skill-iconc">
                  <img
                    src="/head.png"
                    alt="Hobbies icon"
                    className="exp-icon"
                  />
                </div>
                <h2 className="font skill-htext">HOBBIES</h2>
              </div>
            </div>
          </div>
        )}
        {data.interests && data.interests.length > 0 && (
          <div className="hobby-hobbyc">
            <div className="hobby-hobby" style={{ height: "150pt" }}>
              {data.interests.map((h, i) => (
                <div key={i} className="font hobby-item">
                  <span className="hobby-text">{h}</span>
                </div>
              ))}
            </div>
            <div className="hobby-hobbytc">
              <div className="skill-box">
                <div className="skill-iconc">
                  <img
                    src="/head.png"
                    alt="Interests icon"
                    className="exp-icon"
                  />
                </div>
                <h2 className="font skill-htext">INTERESTS</h2>
              </div>
            </div>
          </div>
        )}
        {data.languages && data.languages.length > 0 && (
          <div className="hobby-hobbyc" style={{ marginRight: 0 }}>
            <div className="hobby-hobby" style={{ height: "150pt" }}>
              {data.languages.map((h, i) => (
                <div key={i} className="font hobby-item">
                  <span className="hobby-text">{h}</span>
                </div>
              ))}
            </div>
            <div className="hobby-hobbytc">
              <div className="skill-box">
                <div className="skill-iconc">
                  <img
                    src="/head.png"
                    alt="Languages icon"
                    className="exp-icon"
                  />
                </div>
                <h2 className="font skill-htext">LANGUAGES</h2>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* ----------------------------------CERTIFICATES----------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="exp">
        <div className="exp-iconc">
          <img src="/head.png" alt="Certification icon" className="exp-icon" />
        </div>
        <h2 className="font exp-exp">Certification</h2>
        {data.certificates.map((e, i) => (
          <div key={i} className="exp-cont">
            <div className="exp-titlec">
              <h3 className="font exp-title">{e.title}</h3>
              <div className="exp-date">
                <img
                  src="/calender.png"
                  alt="Calendar icon"
                  className="exp-cal"
                />
                <span className="font exp-datet">
                  {e.startDate} - {e.endDate}
                </span>
              </div>
              <img src="/tick.png" alt="Tick icon" className="exp-tick" />
            </div>
          </div>
        ))}
      </div>
      {/* --------------------------------------------------------------------------- */}
      {/* ----------------------------------REFERENCES------------------------------- */}
      {/* --------------------------------------------------------------------------- */}
      <div className="ref">
        <div className="ref-left">
          <img src="/el1.png" alt="Background element" className="el el1" />
          <img src="/el2.png" alt="Background element" className="el el2" />
        </div>
        <div className="ref-right">
          <div className="skill-box">
            <div className="skill-iconc">
              <img src="/head.png" alt="References icon" className="exp-icon" />
            </div>
            <h2 className="font skill-htext">REFERENCES</h2>
          </div>
          {data.references.map((r, i) => (
            <div
              key={i}
              className="ref-ref"
              style={
                i === data.references.length - 1 ? { borderBottomWidth: 0 } : {}
              }
            >
              <div className="ref-row" style={{ margin: "0 auto" }}>
                <span className="font ref-text1">{`${r.name},`}&nbsp;</span>
                <span className="font ref-text2">{`${r.job},`}&nbsp;</span>
                <span className="font ref-text2">{`${r.company}`}</span>
              </div>
              <div className="ref-row" style={{ margin: "0 auto" }}>
                <div className="ref-row" style={{ marginRight: "40pt" }}>
                  <span className="font ref-text3">Contact:&nbsp;</span>
                  <Link
                    target="_blank"
                    href={`tel:${r.tel}`}
                    className="font ref-text4"
                  >
                    {r.tel}
                  </Link>
                </div>
                <div className="ref-row">
                  <span className="font ref-text3">Email:&nbsp;</span>
                  <Link
                    target="_blank"
                    href={`mailto:${r.email}`}
                    className="font ref-text4"
                  >
                    {r.email}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
          @media print {
            @page {
              size: 210mm ${pageHeight}mm;
              margin: 0;
            }
            .print_btn {
              display: none;
            }
          }
        `}</style>
    </div>
  );
}
