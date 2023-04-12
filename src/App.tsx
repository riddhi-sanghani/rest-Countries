import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./sharedcomponents/Header";
import { ThemeContext, ThemeProvider } from "./components/ThemProvider";
import Countries from "./components/Countries";
import "material-icons/iconfont/material-icons.css";
import CountryDetail from "./components/CountryDetail";
function App() {
  const { mode, setMode } = useContext(ThemeContext);
  const [color, setColor] = useState(mode.background);
  useEffect(() => {
    setColor(mode.background);
  }, [mode]);
  return (
    <div className="main">
      <ThemeProvider>
        <BrowserRouter>
          <Header></Header>
          <div className="App">
            <Routes>
              <Route path="/:name" element={<CountryDetail />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/countries/:country" element={<CountryDetail />} />
              <Route path="/" element={<Navigate to="/countries" replace />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
