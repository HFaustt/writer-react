import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Write from "./pages/Write";
import Error from "./components/shared/Error";
import Read from "./pages/Read";
import { Suspense } from "react";
import CallbackPage from "./pages/CallbackPage";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./auth/AuthenticationGuard";
import Loader from "./components/shared/Loader";

// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/write",
//         element: <Write />,
//       },
//       {
//         path: "/read",
//         element: <Read />,
//       },
//     ],
//   },
// ]);

function App() {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="write"
            element={<AuthenticationGuard component={Write} />}
          />
          <Route path="read" element={<Read />} />
          <Route path="callback" element={<CallbackPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
export default App;
