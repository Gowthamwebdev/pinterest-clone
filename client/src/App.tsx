import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#0c0c0c',
            color: '#fff',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
