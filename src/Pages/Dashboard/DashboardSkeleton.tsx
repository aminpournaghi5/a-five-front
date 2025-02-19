import { Box, Skeleton, Grid, Card } from "@mui/material";

export default function DashboardSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
      }}
    >
      {/* Sidebar Skeleton */}
      <Box
        sx={{
          my: 2,
          width: "25%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="80%"
          height={35}
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {[...Array(1)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width="80%"
              height={20}
              sx={{ marginBottom: 1 }}
            />
          ))}
        </Box>
        <Skeleton variant="rectangular" width="80%" height={35} />
      </Box>

      {/* Main Content Skeleton */}
      <Box
        sx={{
          width: "75%",
          my: 2,
          borderRight: "1px solid #ccc",
        }}
      >
        <Grid container spacing={2} padding={2}>
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  padding: "20px",
                  borderRadius: "20px",
                  margin: "10px",
                  height: "150px",
                  boxShadow: "7px 6px 6px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "transparent",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  gap={2}
                  height="100%"
                >
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={30}
                    sx={{ alignSelf: "flex-start" }}
                  />
                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    sx={{ alignSelf: "flex-start" }}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
