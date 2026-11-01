import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";

const chapters: {
  title: string;
  body: string;
  icon: IconName;
  label: string;
  detail: string;
  to: string;
  cta: string;
}[] = [
  {
    title: "Every opportunity, in view.",
    body: "Bring calls, forms, messages, and campaign inquiries into one CRM. Know who reached out, what they need, and where the conversation stands.",
    icon: "capture",
    label: "Capture",
    detail: "Inquiries → Your CRM",
    to: "/crm-automation",
    cta: "Connect your lead sources",
  },
  {
    title: "Follow-up that follows through.",
    body: "Build timely acknowledgments, personal outreach, appointment reminders, and a clear next step. Give promising conversations the attention they deserve.",
    icon: "message",
    label: "Connect",
    detail: "Your CRM → Consistent follow-up",
    to: "/lead-follow-up",
    cta: "Explore the follow-up system",
  },
  {
    title: "Real people. More possibility.",
    body: "Put a trained Philippines-based Virtual Assistant behind the process. Keep the daily work moving while you focus on your customers and your next chapter.",
    icon: "headset",
    label: "Grow",
    detail: "Your team → Room to grow",
    to: "/virtual-assistant-services",
    cta: "Find your support team",
  },
];

export default function ConnectedStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(min-width: 920px)");
    let observer: IntersectionObserver | undefined;
    const sync = () => {
      observer?.disconnect();
      if (reduced.matches || !desktop.matches) return;
      const ratios = new Map<Element, number>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries)
            ratios.set(
              entry.target,
              entry.isIntersecting ? entry.intersectionRatio : 0,
            );
          const visible = [...ratios].sort((a, b) => b[1] - a[1])[0];
          if (visible?.[1])
            setActive(Number((visible[0] as HTMLElement).dataset.chapter));
        },
        { rootMargin: "-22% 0px -30% 0px", threshold: [0, 0.15, 0.4, 0.7, 1] },
      );
      element
        .querySelectorAll("[data-chapter]")
        .forEach((chapter) => observer?.observe(chapter));
    };
    sync();
    reduced.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      observer?.disconnect();
      reduced.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);
  return (
    <section
      id="connected-story"
      className="connected-story section-gmg"
      ref={root}
      aria-labelledby="story-title"
    >
      <div className="container-gmg">
        <div className="story-intro">
          <span className="eyebrow">Less friction. More forward.</span>
          <h2 id="story-title">
            A better rhythm
            <br />
            for your business.
          </h2>
          <p>Your tools and your team, finally working together.</p>
        </div>
        <div className="story-layout">
          <figure className="story-visual" data-story-stage={active}>
            <div className="story-window" aria-hidden="true">
              <div className="story-window-top">
                <span className="story-window-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span>THE CONNECTED BUSINESS</span>
                <Icon name="lock" size={13} />
              </div>
              <div className="story-diagram">
                <div className="story-orbit" />
                <div className="story-orbit story-orbit-inner" />
                <div className="story-brand">
                  <img
                    src="/assets/images/gmg-headset-logo.webp"
                    alt=""
                    width="128"
                    height="128"
                  />
                  <span>YOUR GROWTH SYSTEM</span>
                </div>
                <div className="story-signal signal-inquiry">
                  <Icon name="capture" size={24} />
                  <span>New inquiry</span>
                </div>
                <div className="story-signal signal-followup">
                  <Icon name="message" size={24} />
                  <span>Follow-up</span>
                </div>
                <div className="story-signal signal-person">
                  <Icon name="headset" size={24} />
                  <span>Your people</span>
                </div>
                <span className="story-connection connection-one" />
                <span className="story-connection connection-two" />
                <span className="story-connection connection-three" />
              </div>
              <div className="story-stage-label">
                <span className="story-status-dot" />
                <span>{chapters[active].detail}</span>
                <span className="story-stage-number">0{active + 1} / 03</span>
              </div>
            </div>
            <figcaption>
              One possible workflow. Built around your business.
            </figcaption>
            <ol className="story-progress" aria-label="The connected workflow">
              {chapters.map((chapter, index) => (
                <li
                  className={index === active ? "is-current" : ""}
                  key={chapter.label}
                >
                  <span>0{index + 1}</span>
                  {chapter.label}
                </li>
              ))}
            </ol>
          </figure>
          <div className="story-chapters">
            {chapters.map((chapter, index) => (
              <article
                className="story-chapter"
                data-chapter={index}
                key={chapter.label}
              >
                <span className="chapter-number">
                  0{index + 1}
                  <span>{chapter.label}</span>
                </span>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <Link className="text-link" to={chapter.to}>
                  {chapter.cta}
                  <Icon name="arrow" size={18} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
