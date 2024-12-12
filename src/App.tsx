import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Exercises from "./Pages/Exercises/Exercises";
import Home from "./Pages/Home/Home";
import Exercise from "./Pages/Exersise/Exercise";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Programming from "./Pages/Programming/Programming";
import Footer from "./components/Footer/Footer";
import { Box, Container } from "@mui/material";
import Landing from "./components/Landing/Landing";
import FeatureHome from "./components/FeatureHome/FeatureHome";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { setLoggedIn } from "./assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import axiosInstance from "./api/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ForgotPasswordForm from "./Pages/ForgotPassword/ForgotPassword";
import ResetPasswordPage from "./Pages/ResetPassword/ResetPassword";
import NotFound from "./Pages/NotFound/NotFound";
import ProgramDetails from "./Pages/ProgramDetails/ProgramDetails";
import Contact from "./Pages/Contact/Contact";

const PageContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Container component="main" sx={{ flexGrow: 1 }}>
    {children}
  </Container>
);

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("token"); // گرفتن توکن از localStorage
      if (!token) {
        dispatch(setLoggedIn(false)); // اگر توکن وجود ندارد، وضعیت لاگین false
        return;
      }

      try {
        const response = await axiosInstance.get("/api/auth/check", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          dispatch(setLoggedIn(true)); // اگر احراز هویت موفق بود، وضعیت لاگین true
        } else {
          dispatch(setLoggedIn(false)); // در صورت خطا، وضعیت لاگین false
        }
      } catch (error) {
        dispatch(setLoggedIn(false)); // در صورت خطا، وضعیت لاگین false
      }
    };

    checkAuthStatus(); // فراخوانی تابع چک کردن احراز هویت
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Landing />
              <FeatureHome />
              <PageContainer>
                <Home />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/exercises"
          element={
            <>
              <Navbar />
              <PageContainer>
                <Exercises />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/exercise/:id"
          element={
            <>
              <Navbar />
              <PageContainer>
                <Exercise />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/programming"
          element={
            <>
              <Navbar />
              <PageContainer>
                <Programming />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <PageContainer>
              <Login />
            </PageContainer>
          }
        />
        <Route
          path="/signup"
          element={
            <PageContainer>
              <Signup />
            </PageContainer>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PageContainer>
              <ForgotPasswordForm />
            </PageContainer>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <PageContainer>
              <ResetPasswordPage />
            </PageContainer>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <PageContainer>
                <Dashboard />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <PageContainer>
                <NotFound />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/programming/:id"
          element={
            <>
              <Navbar />
              <PageContainer>
                <ProgramDetails />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <PageContainer>
                <Contact />
              </PageContainer>
              <Footer />
            </>
          }
        />
        <Route
          path="/edit-program/:id"
          element={
            <>
              <Navbar />
              <PageContainer>
                <EditProgram />
              </PageContainer>
              <Footer />
            </>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
