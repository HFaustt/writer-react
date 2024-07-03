import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Error from "./components/shared/Error";
import Read from "./pages/read/Read";
import { Suspense } from "react";
import CallbackPage from "./pages/callback/CallbackPage";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./auth/AuthenticationGuard";
import Loader from "./components/shared/Loader";
import StoriesPage from "./pages/read/stories/StoriesPage";
import BlogsPage from "./pages/read/blogs/BlogsPage";
import StoryPage from "./pages/read/stories/story/StoryPage";
import Blogpage from "./pages/read/blogs/blog/Blogpage";
import Write from "./pages/write/Write";

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
          <Route path="/read/stories" element={<StoriesPage />} />
          <Route path="/read/stories/:id" element={<StoryPage />} />
          <Route path="/read/blogs" element={<BlogsPage />} />
          <Route path="/read/blogs/:id" element={<Blogpage />} />

          <Route path="callback" element={<CallbackPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
