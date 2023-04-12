import { Children, createContext, useMemo, useState } from "react";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#ffffff",
    lightBgColor: "rgb(234 234 247)",
    type: "Light",
  },
  dark: {
    foreground: "#ffffff",
    background: "#000000",
    lightBgColor: "#2d3748",
    type: "Dark",
  },
};
interface themeI {
  foreground: string;
  background: string;
  lightBgColor: string;
  type: string;
}

export const ThemeContext = createContext<{
  mode: themeI;
  setMode: (mode: themeI) => void;
}>({
  mode: themes.dark,
  setMode: (_mode: themeI) => {},
});

export const useMode = (): {
  mode: themeI;
  setMode: (mode: themeI) => void;
} => {
  const [mode, setMode] = useState<themeI>(themes.dark);
  const modeState = useMemo(() => ({ mode, setMode }), [mode]);
  // console.log(modeState, "modeState");
  return modeState;
};
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const mode = useMode();
  return <ThemeContext.Provider value={mode}>{children}</ThemeContext.Provider>;
};
