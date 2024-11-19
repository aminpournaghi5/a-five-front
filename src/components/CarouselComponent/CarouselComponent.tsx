import Carousel from "react-material-ui-carousel";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

export interface VideoCardProps {
  name: string; // نام حرکت
  abzar?: string; // ابزار (اختیاری)
  body?: string; // ناحیه بدن (اختیاری)
  media: string; // URL تصویر یا گیف
}

export interface CarouselComponentProps {
  myvideos: VideoCardProps[]; // آرایه حرکات
}

function CarouselComponent({ myvideos }: CarouselComponentProps) {
  return (
    <Carousel
      sx={{
        width: { xs: "100%", sm: "90%", md: "80%" },
        height: "auto",
        my: 1,
      }}
      animation="slide"
      navButtonsAlwaysInvisible
      navButtonsProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderRadius: "50%",
          padding: "10px",
        },
      }}
    >
      {myvideos.map((item: VideoCardProps, index: number) => (
        <Box key={index}>
          <Box
            sx={{
              borderRadius: 6,
              boxShadow: shadows[2],
              overflow: "hidden",
            }}
          >
            <Card
              sx={{
                boxShadow: "none",
                backgroundColor: "white",
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 6,
              }}
            >
              <CardMedia
                component="img"
                src={item.media}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"; // تصویر پیش‌فرض
                }}
              />
              <CardContent sx={{ py: 1, margin: 0 }}>
                <Typography
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: { xs: "12px", sm: "14px" }, // تنظیم اندازه فونت بر اساس صفحه
                    fontWeight: "bold", // فونت بولد
                  }}
                >
                  {item.name}
                </Typography>

                {/* نمایش ابزار و ناحیه بدن تنها در صورت موجود بودن */}
                <Box
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                  padding={2}
                >
                  {item.abzar && (
                    <Typography
                      sx={{
                        backgroundColor: "grey.300",
                        borderRadius: "5px",
                        fontSize: { xs: "10px", sm: "12px" },
                        padding: "5px",
                        margin: "5px",
                        fontWeight: "bold", // فونت بولد
                      }}
                    >
                      {item.abzar}
                    </Typography>
                  )}
                  {item.body && (
                    <Typography
                      sx={{
                        backgroundColor: "grey.300",
                        borderRadius: "5px",
                        fontSize: { xs: "10px", sm: "12px" },
                        padding: "5px",
                        margin: "5px",
                        fontWeight: "bold", // فونت بولد
                      }}
                    >
                      {item.body}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
