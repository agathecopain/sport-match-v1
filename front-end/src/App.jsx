import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/auth.context.jsx";
import SearchPage from "./pages/Search.jsx";
import HomePage from "./pages/Home.jsx";
import PostPage from "./pages/Post.jsx";
import UserPage from "./pages/User.jsx";
import SignInPage from "./pages/Signin.jsx";
import SignUpPage from "./pages/Signup.jsx";
import PostCreatePage from "./pages/Post-create.jsx";
import { PrivateRoute } from "./components/Private-route.jsx";
import VerifyEmailPage from "./pages/VerifyEmailPage.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/verify/:token" element={<VerifyEmailPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/post"
              element={
                <PrivateRoute>
                  <PostPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/:username"
              element={
                <PrivateRoute>
                  <UserPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/post-create"
              element={
                <PrivateRoute>
                  <PostCreatePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
