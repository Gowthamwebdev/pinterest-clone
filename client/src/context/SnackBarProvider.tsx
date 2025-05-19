import { Alert, Snackbar } from '@mui/material';
import type { AlertColor } from '@mui/material/Alert';
import { ReactNode, useState } from 'react';
import { SnackBarContext } from './SnackBarContext';

export const SnackBarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarOptions, setSnackbarOptions] = useState<{
    message: string;
    severity: AlertColor;
    open: boolean;
  }>({
    message: '',
    severity: 'info',
    open: false,
  });

  const showSnackbar = (message: string, severity: AlertColor = 'info') => {
    setSnackbarOptions({
      message,
      severity,
      open: true,
    });
  };

  const handleClose = () => {
    setSnackbarOptions((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackBarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={snackbarOptions.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarOptions.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};
