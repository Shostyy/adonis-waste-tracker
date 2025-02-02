import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  ThemeProvider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CoffeeIcon from "@mui/icons-material/Coffee";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import HomePage from "./pages/HomePage/HomePage";
import Clothing from "./pages/Closing/Closing";
import Settings from "./pages/Settings/Settings";
import Drinks from "./pages/Drinks/Drinks";
import cn from "classnames";
import { theme } from "./themes/theme";
import FortuneWheel from "./pages/FortuneWheel/FortuneWheel";
import "./App.css";
import PrizeResults from "./PrizeResults/PrizeResults";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

function App() {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box flexGrow={1}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/complete" element={<Clothing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/drinks" element={<Drinks />} />
              <Route path="/fortune-wheel" element={<FortuneWheel />} />
              <Route path="/prize-results" element={<PrizeResults />} />
            </Routes>
          </Box>

          <AppBar
            position="static"
            component="footer"
            sx={{ borderRadius: "0" }}
          >
            <Toolbar sx={{ maxWidth: "400px", margin: "0 auto" }}>
              {" "}
              {/* Center the Toolbar within the AppBar */}
              <Box display="flex" justifyContent="space-around" width="100%">
                {/* Adjust justifyContent to space-around for equal spacing */}
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cn("navigation__link", {
                      "navigation__link--active": isActive,
                    })
                  }
                  style={{ textAlign: "center", flex: 1 }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <DeleteIcon />
                    <Typography variant="body2">Списання</Typography>
                  </IconButton>
                </NavLink>

                <NavLink
                  to="/complete"
                  className={({ isActive }) =>
                    cn("navigation__link", {
                      "navigation__link--active": isActive,
                    })
                  }
                  style={{ textAlign: "center", flex: 1 }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <DeleteForeverIcon />
                    <Typography variant="body2">Закриття</Typography>
                  </IconButton>
                </NavLink>
                <NavLink
                  to="/fortune-wheel"
                  className={({ isActive }) =>
                    cn("navigation__link", {
                      "navigation__link--active": isActive,
                    })
                  }
                  style={{ textAlign: "center", flex: 1 }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <EmojiEventsIcon />
                    <Typography variant="body2">Колесо фортуни</Typography>
                  </IconButton>
                </NavLink>

                <NavLink
                  to="/drinks"
                  className={({ isActive }) =>
                    cn("navigation__link", {
                      "navigation__link--active": isActive,
                    })
                  }
                  style={{ textAlign: "center", flex: 1 }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CoffeeIcon />
                    <Typography variant="body2">Напої</Typography>
                  </IconButton>
                </NavLink>

                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    cn("navigation__link", {
                      "navigation__link--active": isActive,
                    })
                  }
                  style={{ textAlign: "center", flex: 1 }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <SettingsIcon />
                    <Typography variant="body2">Settings</Typography>
                  </IconButton>
                </NavLink>
                <NavLink
                  to="/prize-results"
                  className={({ isActive }) =>
                    cn("navigation__link", {
                      "navigation__link--active": isActive,
                    })
                  }
                  style={{ textAlign: "center", flex: 1 }}
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <PlaylistAddCheckIcon />
                    <Typography variant="body2">Результати</Typography>
                  </IconButton>
                </NavLink>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
