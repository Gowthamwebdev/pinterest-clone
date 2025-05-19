import { createContext, useContext } from 'react';
import type { AlertColor } from '@mui/material/Alert';

export type snackBarType = (message: string, severity?: AlertColor) => void;

export const SnackBarContext = createContext<snackBarType>(() => {});

const useSnackBar = () => useContext(SnackBarContext);

export default useSnackBar;
