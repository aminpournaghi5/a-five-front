import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/assets/Redux/store";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const location = useLocation();
  const exerciselist = useSelector(
    (state: RootState) => state.exerciseList.exerciselist
  );
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn); // دریافت وضعیت ورود

  // تعریف منو با استفاده از isLoggedIn
  const pages = [
    { name: "خانه", link: "/" },
    { name: "تمرینات ورزشی", link: "/exercises" },
    isLoggedIn
      ? { name: "حساب کاربری", link: "/dashboard" }
      : { name: "ورود / ثبت نام ", link: "/login" },
  ];

  const handleToggleMenu = () => setMenuOpen((prevOpen) => !prevOpen);
  const handleCloseMenu = () => setMenuOpen(false);

  const convertToPersianNumbers = (num: number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num
      .toString()
      .replace(/\d/g, (digit) => persianDigits[parseInt(digit, 10)]);
  };

  return (
    <AppBar position="static" sx={{ overflow: "hidden" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* لوگو در دسکتاپ */}
          <Link to="/" onClick={handleCloseMenu}>
            <Box
              component="img"
              src="/public/whitepng.png"
              alt="A-FIVE LOGO"
              sx={{
                display: { xs: "none", md: "flex" },
                width: 55,
                height: 55,
              }}
            />
          </Link>

          {/* آیکون منو موبایل */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleToggleMenu} color="inherit">
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          {/* لوگو در حالت موبایل */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/" onClick={handleCloseMenu}>
              <Box
                component="img"
                src="/public/whitepng.png"
                alt="A-FIVE LOGO"
                sx={{ width: 50, height: 50, mt: 1 }}
              />
              
            </Link>
          </Box>

          {/* منوی دسکتاپ */}
          <Box
            paddingRight={2}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.link}
                onClick={handleCloseMenu}
                sx={{
                  my: 2,
                  mx: 2,
                  color: "white",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: location.pathname === page.link ? "100%" : 0,
                    height: "2px",
                    backgroundColor: theme.palette.secondary.main,
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* دکمه ایجاد برنامه تمرینی */}
          <Link to="/programming">
            <Button
              onClick={handleCloseMenu}
              sx={{
                my: 2,
                color: "white",
                backgroundColor: theme.palette.secondary.main,
                mx: 2,
                position: "relative",
                fontSize: { xs: "10px", md: "16px" },
              }}
            >
              {exerciselist.length
                ? "مشاهده  برنامه تمرینی"
                : "برنامه تمرینی جدید"}
              {exerciselist.length > 0 && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "absolute",
                    top: -10,
                    right: -10,
                    height: 20,
                    width: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    fontSize: "12px",
                    color: theme.palette.secondary.light,
                  }}
                >
                  {convertToPersianNumbers(exerciselist.length)}
                </Typography>
              )}
            </Button>
          </Link>
        </Toolbar>

        {/* منوی موبایل */}
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <Box
            id="mobile-menu"
            sx={{
              backgroundColor: theme.palette.primary.main,
              display: { xs: "block", md: "none" },
              textAlign: "right",
              width: "100%",
              py: 2,
            }}
          >
            {pages.map((page) => (
              <Box
                key={page.name}
                sx={{ py: 1.5, px: 2 }}
                onClick={handleCloseMenu}
              >
                <Typography
                  component={Link}
                  to={page.link}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  {page.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Collapse>
      </Container>
    </AppBar>
  );
};

export default Navbar;
