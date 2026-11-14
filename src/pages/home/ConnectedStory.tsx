import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, type IconName } from "@/components/Icon";
import { storyPhotos } from "@/data/heroMedia";

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
    title: "Every inquiry lands in one place.",
    body: "Bring calls, forms, messages, and campaign inquiries into one CRM. Know who reached out, what they need, and where the conversation stands.",
    icon: "capture",
    label: "Capture",
    detail: "Calls, forms and messages in one CRM",
    to: "/crm-automation",
    cta: "Connect your lead sources",
  },
  {
    title: "Someone follows up, every time.",
    body: "Build timely acknowledgments, personal outreach, appointment reminders, and a clear next step. Give promising conversations the attention they deserve.",
    icon: "message",
    label: "Connect",
    detail: "Reminders and personal outreach",
    to: "/lead-follow-up",
    cta: "Explore the follow-up system",
  },
  {
    title: "A real person keeps the work moving.",
    body: "Put a trained Philippines-based Virtual Assistant behind the process. Keep the daily work moving while you focus on your customers and your next chapter.",
    icon: "headset",
    label: "Grow",
    detail: "Your assistant handles the daily work",
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
          <h2 id="story-title">How it works, day to day</h2>
          <p>
            Your tools and your team working from the same list, so nothing
            waits on someone remembering.
          </p>
        </div>
        <div className="story-layout">
          <figure className="story-visual" data-story-stage={active}>
            <div className="story-photos">
              {storyPhotos.map((src, index) => (
                <img
                  key={src + index}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={index === active ? "is-active" : ""}
                  onError={(event) => {
                    event.currentTarget.hidden = true;
                  }}
                />
              ))}
              <span className="story-photo-caption">
                <Icon name={chapters[active].icon} size={18} />
                {chapters[active].detail}
              </span>
            </div>
            <ol className="story-progress" aria-label="The connected workflow">
              {chapters.map((chapter, index) => (
                <li
                  className={index === active ? "is-current" : ""}
                  key={chapter.label}
                >
                  <span>{index + 1}</span>
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
                  {index + 1}
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
