import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { fontFamilies } from "../../../theme";
// آیکون‌های مورد نیاز

import {
  Email,
  Phone as PhoneIcon,
  Telegram as TelegramIcon,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  const theme = useTheme();
  const footerLinks = [
    { name: "خانه", link: "/" },
    { name: "تمرینات ورزشی", link: "/exercises" },
    { name: "حساب کاربری", link: "/login" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.3)", // سایه برای فوتر
        width: "100%",
        position: "relative",
        bottom: "0px",
        padding: "20px 0px 20px 0px",
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingRight: "12px",
            }}
          >
            {footerLinks.map((link) => (
              <Typography
                key={link.name}
                sx={{
                  fontFamily: fontFamilies.bold,
                  fontSize: { md: "14px", xs: "10px" },
                  color: "white",
                  textTransform: "none",
                  textAlign: "right",
                  cursor: "pointer",
                  my: "10px",
                }}
                component={Link}
                to={link.link}
              >
                {link.name}
              </Typography>
            ))}
          </Grid>

          {/* لوگوی وسط */}
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to={"/"}>
              <Box
                component="img"
                src="/public/whitepng.png"
                alt="A-FIVE LOGO"
                sx={{
                  width: { md: "80px", xs: "50px" },
                  height: "auto",
                }}
              />
            </Link>
          </Grid>

          {/* لینک‌های شبکه‌های اجتماعی */}
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="flex-end"
            alignItems={"end"}
            padding={"15px"}
          >
            <IconButton
              component="a"
              href="mailto:afive.website@gmail.com"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "white" }}
            >
              <Email />
            </IconButton>

            <IconButton
              component="a"
              href="tel:+989034939660"
              rel="noopener noreferrer"
              size="small"
              sx={{ color: "white" }}
            >
              <PhoneIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
