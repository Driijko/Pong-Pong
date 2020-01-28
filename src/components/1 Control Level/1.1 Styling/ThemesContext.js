import React, {createContext} from 'react';

const ThemesContext = createContext();

function ThemesContextProvider(props) {

  const themes = {
    theme0: {
      color0: "0, 109, 103",
      color1: "0, 255, 242",
      color2: "255, 0, 179",
      color3: "0, 0, 0"
    },
    theme1: [
      "255, 0, 179",
      "180, 0, 100",
      "100, 0, 50"
    ]
  };

  return (
    <ThemesContext.Provider
      value={{themes}}
    >
      {props.children}
    </ThemesContext.Provider>
  )
}

export default ThemesContext;
export {ThemesContextProvider};