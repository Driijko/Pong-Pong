import React, {createContext} from 'react';

const FontsContext = createContext();

function FontsContextProvider(props) {

  const fonts = {
    font0: "VT323"
  };

  return (
    <FontsContext.Provider
      value={{fonts}}
    >
      {props.children}
    </FontsContext.Provider>
  )
}

export default FontsContext;
export {FontsContextProvider};