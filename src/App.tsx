import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/shared/AppLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Error from "./components/shared/Error";
import Read from "./pages/read/Read";
import { Suspense } from "react";
import CallbackPage from "./pages/callback/CallbackPage";
import Loader from "./components/shared/Loader";
import StoriesPage from "./pages/read/stories/StoriesPage";
import BlogsPage from "./pages/read/blogs/BlogsPage";
import StoryPage from "./pages/read/stories/story/StoryPage";
import Write from "./pages/write/Write";
import Login from "./auth/login/Login";
import { useAuth } from "./auth/context/FirebaseAuth";
import BlogPage from "./pages/read/blogs/blog/BlogPage";
import FinishSignIn from "./auth/login/FinishSignIn";
import { Toaster } from "react-hot-toast";

function App() {
  const { currentUser } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route
            path="/write"
            element={currentUser ? <Write /> : <Navigate to="/login" />}
          />
          {/* <Route path="/write" element={<Write />} /> */}

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

      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "12px", backgroundColor: "none" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 7000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
        reverseOrder={false}
      />
    </Suspense>
  );
}

export default App;
