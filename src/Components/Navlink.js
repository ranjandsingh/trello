import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const Navlink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <div>
      <div>
        <Link
          style={{
            textDecoration: match ? "underline" : "none",
            color: match ? "blue" : "black",
            fontWeight: match ? "bold" : "normal",
          }}
          to={to}
          {...props}
        >
          {children}
        </Link>
      </div>
    </div>
  );
};

export default Navlink;
