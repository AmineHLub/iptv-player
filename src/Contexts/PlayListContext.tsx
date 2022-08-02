import React, { createContext, useState } from 'react';

export const PlayListContext = createContext(null);

function PlayListProvider({ children } : {children: React.ReactNode}) {
const [playlist, setPlaylist] = useState(null)

  return (
    <PlayListContext.Provider value={{ playlist, setPlaylist } as any}>
      {children}
    </PlayListContext.Provider>
  );
};

export default PlayListProvider;