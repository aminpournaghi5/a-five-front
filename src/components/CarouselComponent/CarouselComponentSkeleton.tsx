import Carousel from "react-material-ui-carousel";
import { Box, Skeleton } from "@mui/material";

function CarouselSkeleton() {
  return (
    <Carousel sx={{ width: { xs: "100%", sm: "80%", md: "70%" }, margin: 2 }}>
      <Box>
        <Box
          sx={{
            overflow: "hidden",
            padding: 2,
          }}
        >
          <Skeleton variant="rectangular" height={200} width="100%" />
          <Box sx={{ padding: 1 }}>
            <Skeleton variant="text" width="60%" sx={{ marginTop: 1 }} />
            <Skeleton variant="text" width="30%" sx={{ marginTop: 0.5 }} />
          </Box>
        </Box>
      </Box>
    </Carousel>
  );
}

export default CarouselSkeleton;
