import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/auth.context.jsx";
import SearchPage from "./pages/Search.jsx";
import HomePage from "./pages/Home.jsx";
import PostPage from "./pages/Post.jsx";
import UserPage from "./pages/User.jsx";
import SignInPage from "./pages/Signin.jsx";
import SignUpPage from "./pages/Signup.jsx";
import PostCreatePage from "./pages/Post-create.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/post-create" element={<PostCreatePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
