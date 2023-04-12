import { useContext } from "react";
import { ThemeContext, themes } from "../components/ThemProvider";
// import DarkModeIcon from "@mui/icons-material/DarkMode";

function Header() {
  const { mode, setMode } = useContext(ThemeContext);
  return (
    <div className="navbar" style={{ background: mode.background }}>
      <div className="nav-box">
        <div className="nav-right-box">
          <h1 style={{ color: mode.foreground }}>Where in the world?</h1>
        </div>
        <div>
          <button
            type="button"
            className="button"
            style={{ background: mode.foreground, color: mode.background }}
            onClick={() => {
              setMode(mode.type === "Light" ? themes.dark : themes.light);
            }}
          >
            <div className="btn-box">
              <span className="material-icons-sharp">dark_mode</span>
              <span>{mode.type === "Light" ? "Dark" : "Light"} Mode</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
