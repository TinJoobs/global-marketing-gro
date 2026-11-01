import { Navigate, useLocation } from "react-router-dom";
export default function LegacyRedirect() {
  const { pathname, search, hash } = useLocation();
  const name = pathname.slice(1, -5);
  const aliases: Record<string, string> = {
    index: "",
    "about-us": "about",
    "privacy-policy": "privacy",
    "terms-and-conditions": "terms",
    "refund-policy": "refund",
  };
  return (
    <Navigate replace to={"/" + (aliases[name] ?? name) + search + hash} />
  );
}
