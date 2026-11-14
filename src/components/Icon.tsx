import React from "react";

const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="M7 4v16l13-8Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  check: <path d="m5 12 4 4L19 6" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2m-8 3h2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v3" />
    </>
  ),
  headset: (
    <>
      <path d="M3 13V11a9 9 0 0 1 18 0v6a4 4 0 0 1-4 4h-3" />
      <rect x="2" y="11" width="5" height="7" rx="2" />
      <rect x="17" y="11" width="5" height="7" rx="2" />
      <path d="M10 21h4" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
    </>
  ),
  chart: <path d="M4 20h17M5 16v-4m5 4V9m5 7V6m5 10V3M4 8l5-3 5 1 6-4" />,
  growth: <path d="M3 17 9 11l4 3 8-10m-6 0h6v6M4 21h17" />,
  workflow: (
    <>
      <rect x="8" y="2" width="8" height="6" rx="1" />
      <rect x="2" y="16" width="7" height="6" rx="1" />
      <rect x="15" y="16" width="7" height="6" rx="1" />
      <path d="M12 8v4M5 16v-4h14v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l4 2" />
    </>
  ),
  phone: (
    <path d="M5 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />
  ),
  message: (
    <>
      <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H8l-6 4V5a2 2 0 0 1 2-2Z" />
      <path d="M7 8h10M7 12h7" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="3" />
      <path d="M8 7V4h8v3M2 12l10 4 10-4m-10 2v4" />
    </>
  ),
  refresh: (
    <path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5" />
  ),
  capture: (
    <>
      <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  report: (
    <path d="M6 2h9l5 5v15H4V4a2 2 0 0 1 2-2Zm8 0v6h6M8 17v-3m4 3v-6m4 6v-4" />
  ),
  bell: (
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-9 12a3 3 0 0 0 6 0" />
  ),
  filter: <path d="M3 4h18l-7 8v7l-4 2v-9Z" />,
  star: (
    <path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7.1-6-3.4-6 3.4.9-7.1-5.1-5 7.1-1Z" />
  ),
  file: <path d="M6 2h9l5 5v15H4V4a2 2 0 0 1 2-2Zm8 0v6h6M8 12h8m-8 4h8" />,
  heart: (
    <path d="M20 4c-3-3-7-1-8 1-1-2-5-4-8-1-4 4 0 9 8 16 8-7 12-12 8-16Z" />
  ),
  megaphone: <path d="m3 10 14-6v15L3 14Zm14-3h4v9h-4M5 15l2 7h4l-2-6" />,
  clipboard: (
    <>
      <rect x="4" y="4" width="16" height="18" rx="2" />
      <rect x="8" y="2" width="8" height="5" rx="1" />
      <path d="m8 13 2 2 5-5m-7 9h8" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 7 7" />
    </>
  ),
  rocket: (
    <path d="M14 3c3-2 7-2 7-2s0 4-2 7l-9 9-5-5ZM8 9H3l-2 5 5 1m9 0 1 5 5-2v-5M4 18l-2 4 4-2" />
  ),
  home: <path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-8h6v8" />,
  building: (
    <path d="M3 22V7l8-5v20m0-16h10v16M1 22h22M6 9h2m-2 4h2m-2 4h2m6-7h3m-3 4h3m-3 4h3" />
  ),
  shield: (
    <>
      <path d="m12 2 9 4v6c0 5-5 8-9 10-4-2-9-5-9-10V6Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  medical: (
    <>
      <path d="m12 2 9 4v6c0 5-5 8-9 10-4-2-9-5-9-10V6Z" />
      <path d="M12 7v9m-4-5h8" />
    </>
  ),
  utensils: (
    <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M20 2c-5 4-5 9 0 10v10m0-20v10" />
  ),
  hands: (
    <path d="m2 12 4-6h5l3 3-3 3-3-2m14 2-4-6h-5M4 11l-2 4 9 7 9-7-2-4M9 15l5 4m-3-7 6 5" />
  ),
  map: (
    <>
      <path d="M20 9c0 6-8 13-8 13S4 15 4 9a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="9" r="3" />
    </>
  ),
  settings: (
    <>
      <path d="m10 2-1 3-3 1-3-1-2 4 3 2v3l-2 2 2 4 3-1 3 1 1 3h4l1-3 3-1 3 1 2-4-3-2v-3l2-2-2-4-3 1-3-1-1-3Z" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  code: <path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 2l-4 20" />,
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 22h8m-4-5v5M2 13h20" />
    </>
  ),
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="3" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4" />
    </>
  ),
  link: (
    <path d="m10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 10a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7L22 6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20M4 6h16M4 18h16" />
    </>
  ),
  book: (
    <path d="M12 5C7 2 2 3 2 3v17s5-1 10 2c5-3 10-2 10-2V3s-5-1-10 2Zm0 0v17" />
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="12" rx="2" />
      <path d="M7 10V6a5 5 0 0 1 10 0v4m-5 5v3" />
    </>
  ),
  print: <path d="M6 8V2h12v6M6 17H2V8h20v9h-4M6 14h12v8H6Zm12-3h1" />,
};

export type IconName = keyof typeof paths;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, size = 24, ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
};

export default Icon;
