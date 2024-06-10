import { useMediaQuery } from "@mui/material";

function MediaQueries() {
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

export default MediaQueries;
