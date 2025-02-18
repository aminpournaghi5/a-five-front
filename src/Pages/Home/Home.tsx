import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Grid } from "@mui/material";

import CarouselComponent, {
  VideoCardProps,
} from "../../components/CarouselComponent/CarouselComponent";
import squat from "/landingImage/Squat.gif";
import deadlift from "/landingImage/Deadlift.gif";
import chest from "/landingImage/Chest.gif";
import biceps from "/landingImage/Biceps.gif";
import CarouselComponentSkeleton from "../../components/CarouselComponent/CarouselComponentSkeleton";
import { fontFamilies } from "../../../theme";
import { Helmet } from "react-helmet";

interface CounterProps {
  target: number;
}

const toPersianNumber = (num: number): string => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

const Counter: React.FC<CounterProps> = ({ target }) => {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          intervalRef.current = window.setInterval(() => {
            setCount((prev) => {
              if (prev < target) {
                return prev + 30;
              } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
                return target;
              }
            });
          }, 40);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector("#counter");
    if (element) observer.observe(element);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [target]);

  return <span id="counter">{toPersianNumber(count)}</span>;
};

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const myvideos: VideoCardProps[] = [
    {
      name: "اسکوات هالتر",
      abzar: "هالتر",
      body: "ران",
      media: squat,
    },
    {
      name: "پرس سینه دمبل",
      abzar: "دمبل",
      body: "سینه",
      media: chest,
    },

    {
      name: "ددلیفت رومانیایی",
      body: "ران",
      abzar: "هالتر",
      media: deadlift,
    },
    {
      name: "جلو بازو دمبل تمرکزی ",
      body: "بازو",
      abzar: "دمبل",
      media: biceps,
    },
  ];

  useEffect(() => {
    // شبیه‌سازی بارگذاری
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 ثانیه بعد از بارگذاری

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>A-Five</title>
        <meta
          name="keywords"
          content="برنامه تمرینی آنلاین, برنامه تمرینی, مربیان ورزشی, ورزشکاران حرفه‌ای, طراحی برنامه تمرینی, تمرینات قدرتی, حرکات بدنسازی, خانه, صفحه اصلی, تناسب اندام"
        />
        <meta property="og:title" content="A-Five" />
        <meta
          property="og:description"
          content="طراحی برنامه‌های تمرینی اختصاصی برای ورزشکاران با تصاویر متحرک و راهنمایی مربیان حرفه‌ای."
        />
        <meta property="og:url" content="https://a-five.ir/" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://a-five.ir/" />
      </Helmet>

      {/* Business Theme Section */}
      <Box sx={{ padding: 6 }}>
        <Grid container spacing={1}>
          {/* Text Section */}
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "20px", sm: "30px" },
                  FontFamily: fontFamilies.extraBold,
                }}
                gutterBottom
              >
                <Counter target={4500} />+ <br /> تصویر متحرک
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "justify",
                  fontSize: { xs: "15px", sm: "20px" },
                }}
              >
                تصاویر متحرک از تمرینات ورزشی به شما کمک می‌کنند تا تکنیک‌های
                صحیح و نحوه اجرای هر حرکت را به درستی یاد بگیرید. این مجموعه
                شامل تمرینات قدرتی، تمرینات هوازی، و حرکات انعطاف‌پذیری است که
                به‌صورت بصری شما را با روش اجرای صحیح هر تمرین آشنا می‌کنند.
                استفاده از این تصاویر در برنامه تمرینی‌تان به بهبود تکنیک‌ها و
                دستیابی به نتایج بهتر کمک می‌کند.
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  my: 1,
                }}
              >
                {isLoading ? (
                  <CarouselComponentSkeleton />
                ) : (
                  <CarouselComponent myvideos={myvideos} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
