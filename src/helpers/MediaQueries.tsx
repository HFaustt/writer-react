import { useMediaQuery } from "@mui/material";
import { MediaQueries } from "../types";

export function useMediaQueries(): MediaQueries {
  const isXXLargeScreen = useMediaQuery("(min-width: 1601px)");
  const isXLargeScreen = useMediaQuery(
    "(min-width: 1441px) and (max-width: 1600px)"
  );
  const isLargeScreen = useMediaQuery(
    "(min-width: 1025px) and (max-width: 1440px)"
  );
  const isMediumScreen = useMediaQuery(
    "(min-width: 769px) and (max-width: 1024px)"
  );
  const isSmallScreen = useMediaQuery(
    "(min-width: 476px) and (max-width: 768px)"
  );
  const isXSmallScreen = useMediaQuery("(max-width: 475px)");

  return {
    isXXLargeScreen,
    isXLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
    isXSmallScreen,
  };
}

export function imgStyle({
  isLargeScreen,
  isMediumScreen,
  isSmallScreen,
  isXSmallScreen,
}: MediaQueries): React.CSSProperties {
  if (isLargeScreen) {
    return {
      width: 550,
      height: "auto",
    };
  } else if (isMediumScreen) {
    return {
      width: 500,
      height: "auto",
    };
  } else if (isSmallScreen) {
    return {
      width: 400,
      height: "auto",
    };
  } else if (isXSmallScreen) {
    return {
      width: 380,
      height: "auto",
    };
  } else {
    return {
      width: "auto",
      height: "auto",
    };
  }
}

export function svgStyle({
  isMediumScreen,
  isSmallScreen,
  isXSmallScreen,
}: MediaQueries): React.CSSProperties {
  if (isMediumScreen) {
    return {
      height: 50,
      width: 50,
    };
  } else if (isSmallScreen) {
    return {
      height: 30,
      width: 30,
    };
  } else if (isXSmallScreen) {
    return {
      height: 29,
      width: 29,
    };
  } else {
    return {
      height: 70,
      width: 70,
    };
  }
}

export function iconStyle({
  isLargeScreen,
  isSmallScreen,
  isXSmallScreen,
}: MediaQueries): "small" | "medium" | "large" {
  if (isLargeScreen || isSmallScreen) {
    return "medium";
  } else if (isSmallScreen || isXSmallScreen) {
    return "small";
  } else {
    return "large";
  }
}
