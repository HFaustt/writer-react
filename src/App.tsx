import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Error from "./components/shared/Error";
import Read from "./pages/read/Read";
import { Suspense } from "react";
import CallbackPage from "./pages/callback/CallbackPage";
// import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./components/shared/Loader";
import StoriesPage from "./pages/read/stories/StoriesPage";
import BlogsPage from "./pages/read/blogs/BlogsPage";
import StoryPage from "./pages/read/stories/story/StoryPage";
import Write from "./pages/write/Write";
import Login from "./auth/login/Login";
import { AuthProvider, useAuth } from "./auth/context/FirebaseAuth";
import BlogPage from "./pages/read/blogs/blog/BlogPage";
import FinishSignIn from "./auth/login/FinishSignIn";

function App() {
  // const { isLoading } = useAuth0();
  // if (isLoading) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // }

  // const { currentUser } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* <Route
            path="/write"
            element={currentUser ? <Write /> : <Navigate to="/login" />}
          />   */}
          <Route path="/write" element={<Write />} />

          <Route path="read" element={<Read />} />
          <Route path="/read/stories" element={<StoriesPage />} />
          <Route path="/read/stories/:id" element={<StoryPage />} />
          <Route path="/read/blogs" element={<BlogsPage />} />
          <Route path="/read/blogs/:id" element={<BlogPage />} />
          <Route path="login" element={<Login />} />
          <Route path="finishSignIn" element={<FinishSignIn />} />

          <Route path="callback" element={<CallbackPage />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
