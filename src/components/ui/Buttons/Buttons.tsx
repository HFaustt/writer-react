import {
  Button,
  Popover,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/context/FirebaseAuth";
import {
  DeleteBtnProps,
  PostPageButtonProps,
  ReadPageButtonsProps,
  WritePageButtonsProps,
} from "../../../types";
import { useState } from "react";

function HomePageButtons() {
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2809f4",
        dark: "#8204ff",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => {
            navigate("/read/stories");
          }}
          variant="contained"
          size="small"
          sx={{
            padding: "5px 15px",
          }}
        >
          Read Stories
        </Button>

        <Button
          onClick={() => {
            navigate("/read/blogs");
          }}
          variant="contained"
          size="small"
          sx={{
            padding: "5px 15px",
          }}
        >
          Read Blogs
        </Button>
      </Stack>
    </ThemeProvider>
  );
}

function LogButtons({
  ariaDescribedBy,
}: {
  ariaDescribedBy: string | undefined;
}) {
  const navigate = useNavigate();
  const { signOut, currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2809f4",
        dark: "#8204ff",
      },
      secondary: {
        main: "#ff1100",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack>
        {!currentUser ? (
          <Button
            onClick={() => navigate("login")}
            style={{ cursor: "pointer" }}
            variant="contained"
            size="small"
            color="primary"
            sx={{
              padding: "5px 15px",
            }}
          >
            Log in
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              aria-describedby={ariaDescribedBy}
              onClick={handleClick}
              sx={{
                padding: "5px 15px",
              }}
            >
              Log Out
            </Button>
            <Popover
              id={ariaDescribedBy}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Typography sx={{ p: 2 }}>
                Are you sure you want to sign out?
              </Typography>
              <Button onClick={signOut}>Yes</Button>
              <Button onClick={handleClose}>No</Button>
            </Popover>
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}

function ReadPageButtons({ children, onClick }: ReadPageButtonsProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2809f4",
        dark: "#8204ff",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        variant="text"
        size="large"
        sx={{
          padding: "15px 15px",
          color: "white",
          fontWeight: "800",
          borderRadius: "10px",
          border: "1px solid #ffffff",
          ":hover": {
            backgroundColor: "#eaeaea",
            color: "black",
            transition: "ease-in-out 0.5s",
          },
        }}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}

function WritePageButtons({
  children,
  onClick,
  disabled,
}: WritePageButtonsProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2809f4",
        dark: "#8204ff",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="contained"
        size="small"
        sx={{
          padding: "5px 15px",
        }}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}

function DeleteBtn({
  id,
  onDelete,
  ariaDescribedBy,
  onClick,
  sx,
}: DeleteBtnProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff1100",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });

  const handleDelete = () => {
    if (id) {
      onDelete(id);
    } else {
      console.error("ID is undefined");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        aria-describedby={ariaDescribedBy}
        onClick={onClick || handleDelete}
        variant="contained"
        size="small"
        sx={{ padding: "5px 15px", ...sx }}
      >
        Delete post
      </Button>
    </ThemeProvider>
  );
}

function GoBackBtn({ onClick }: { onClick: () => void }) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2809f4",
        dark: "#8204ff",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        variant="text"
        size="small"
        sx={{
          padding: "5px 15px",
        }}
      >
        ← go back
      </Button>
    </ThemeProvider>
  );
}

function PostPageButton({ link, children }: PostPageButtonProps) {
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#2809f4",
        dark: "#8204ff",
      },
    },
    typography: {
      fontSize: 12,
      fontFamily: "monospace",
      fontWeightMedium: "bolder",
    },
    shape: {
      borderRadius: 7,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() => {
          navigate(link);
        }}
        variant="contained"
        size="medium"
        sx={{
          padding: "5px 15px",
        }}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
}

export {
  HomePageButtons,
  LogButtons,
  ReadPageButtons,
  DeleteBtn,
  GoBackBtn,
  WritePageButtons,
  PostPageButton,
};
