import React from "react";
import "./logo.less";
import { StaticImage } from "gatsby-plugin-image";

export default function Logo() {
  return (
    <div className="logo-container">
      {typeof window !== "undefined" && window.innerWidth >= 768 && (
        <StaticImage
          src="../../../static/logo.png"
          alt="WeWater Logo"
          height={60}
          width={60}
          quality={100}
          loading="eager"
          placeholder="none"
        />
      )}
      {typeof window !== "undefined" && window.innerWidth < 768 && (
        <StaticImage
          src="../../../static/logo.png"
          alt="WeWater Logo"
          height={44}
          width={44}
          quality={100}
          loading="eager"
          placeholder="none"
        />
      )}
    </div>
  );
}
