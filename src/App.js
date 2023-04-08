
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Layout/Routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className='max-w-[1200px] mx-auto'>
       <RouterProvider router={router}></RouterProvider>
       <Toaster position="top-center"></Toaster>
    </div>
  );
}

export default App;
