import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Write from "./pages/Write";
import Error from "./components/shared/Error";
import Read from "./pages/Read";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/read",
        element: <Read />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
