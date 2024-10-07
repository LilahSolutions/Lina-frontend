import { useContext, createContext } from 'react';

export interface AppContextState {
}

/** Initial state of the app context */
export const initialState: AppContextState = {
};

/** General purpose context */
const AppContext = createContext<AppContextState>(initialState);

/** Returns app global shared state. */
export const useAppContext = (): AppContextState => useContext(AppContext);

export default AppContext;
