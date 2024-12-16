import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,

} from "@mui/material";
import {  SetStateAction, useEffect, useState } from "react";
import { logoutUser } from "../../services/loginAuth";
import { setLoggedIn } from "../../assets/Redux/reduxfeatures/ExerciseList/AuthSlice";
import { useDispatch } from "react-redux";
import  { fontFamilies } from "../../../theme";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import "moment/locale/fa";
import "moment-jalaali";
import "moment-timezone";

import moment from "moment";
import {  FitnessCenter, Person } from "@mui/icons-material";


import { format } from "date-fns-jalali";
import {
  setInitialState,
  unsetInitialState,
} from "../../assets/Redux/reduxfeatures/ExerciseList/ExerciseListSlice";
import { Helmet } from "react-helmet";
import MyExerciseList from "../../components/MyExerciseList/MyExerciseList";

export default function Dashboard() {
  
  const [userInfo, setUserInfo] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
 const navigate = useNavigate();
  


  const handleLogout = async () => {
    try {
      await logoutUser();
      setOpenDialog(false);
      setLogoutError(null);
      dispatch(setLoggedIn(false));
    } catch (error) {
      if (error instanceof Error) {
        setLogoutError(error.message);
      } else {
        setLogoutError("خطای ناشناخته رخ داده است.");
      }
    }
  };

  const handleDialogOpen = () => setOpenDialog(true);

  const handleDialogClose = (confirmed: boolean) => {
    if (confirmed) {
      handleLogout();
    } else {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    const fetchName = async () => {
      try {
        setIsLoading(true);

        const userInfo = await axiosInstance.get(`/api/profile/info`);
        await setUserInfo(userInfo.data.name);

      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate("/login");
        }
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate("/404");
        } else {
          console.error(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  
 
  const NAVIGATION = [
    {
      segment: "exercises",
      title: "پروفایل",
      icon: <Person fontSize="small" color="inherit" />,
      component:<div>hi</div>
    },
    {
      segment: "dashboard",
      title: "برنامه‌های تمرینی",
      icon: <FitnessCenter fontSize="small" color="inherit" />,
      component:<MyExerciseList/>
    },
  ];

  const NavigationMenu = () => {
    const [activeSegment, setActiveSegment] = useState("exercises");
  
    const handleClick = (segment: SetStateAction<string>) => {
      setActiveSegment(segment);
    };
  
    // پیدا کردن کامپوننت مربوط به صفحه فعال
    const activeComponent = NAVIGATION.find(
      (nav) => nav.segment === activeSegment
    )?.component;



  return (
    <>
      <Helmet>
        <title>حساب کاربری</title>
        <meta name="keywords" content="حساب کاربری, پنل کاربری, داشبورد" />
        <link rel="canonical" href="https://a-five.ir/dashboard" />
      </Helmet>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            my: 2,
            width: "25%",
            display: "flex",
            flexDirection: "column",
            minHeight: "70vh",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontFamily: fontFamilies.bold,
              textAlign: "right",
              fontSize: { xs: "12px", sm: "16px" },
              py: "10px",
              px: "5px",
            }}
          >
            {userInfo} عزیز،
            <br />
            خوش آمدید!
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            {NAVIGATION.map((item, index) => (
              <Box key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#e0e0e0" },
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", ml: "2px" }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      fontFamily: fontFamilies.bold,
                      textAlign: "right",
                      alignItems: "center",
                      fontSize: { xs: "10px", sm: "16px" },
                      py: "10px",
                      px: "5px",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              py: "10px",
              px: "5px",
            }}
          >
            <Button
              sx={{
                width: "80%",
                fontSize: { xs: "10px", md: "16px" },
                fontFamily: fontFamilies.bold,
              }}
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleDialogOpen}
            >
              خروج
            </Button>
          </Box>
        </Box>

        

        {/* Logout Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent>
            <Typography
              variant="body1"
              sx={{
                fontFamily: fontFamilies.bold,
                fontSize: { xs: "10px", md: "16px" },
              }}
            >
              آیا می‌خواهید از حساب خود خارج شوید؟
            </Typography>
            {logoutError && (
              <Typography color="error">{logoutError}</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => handleDialogClose(true)}
              sx={{
                mx: 2,
                fontFamily: fontFamilies.bold,
                fontSize: { xs: "10px", md: "16px" },
              }}
            >
              بله
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDialogClose(false)}
              color="secondary"
              sx={{
                mx: 2,
                fontFamily: fontFamilies.bold,
                fontSize: { xs: "10px", md: "16px" },
              }}
            >
              خیر
            </Button>
          </DialogActions>
        </Dialog>
        
      </Box>
    </>
  );
};

export default Dashboard;
