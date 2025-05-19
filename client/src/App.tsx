import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SnackBarProvider } from './context/SnackbarProvider';
function App() {
  return (
    <BrowserRouter>
      <SnackBarProvider>
        <AppRoutes />
      </SnackBarProvider>
    </BrowserRouter>
  );
}

export default App;
