import {
  Skeleton,
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const ProgramDetailsSkeleton = () => {
  return (
    <Box
      sx={{
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          my: 2,
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
        }}
      >
        <Skeleton width="40%" height={30} />
        <Skeleton width="10%" height={30} />
      </Box>

      {/* Skeleton for exercises */}
      {[...Array(3)].map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
            margin: "5px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box display={"flex"} alignItems={"center"} flexGrow={1}>
            <Box sx={{ textAlign: "center", width: "10%", mx: 1 }}>
              <Skeleton width={30} height={30} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  margin: 1,
                }}
              >
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton
                  variant="rectangular"
                  sx={{ mx: 2 }}
                  width={150}
                  height={20}
                />
              </Card>
            </Box>
          </Box>

          <Box sx={{ alignItems: "center" }}>
            <Table
              sx={{
                marginRight: "10%",
                my: 2,
                width: "45%",
                borderCollapse: "collapse",
              }}
            >
              <TableBody>
                <TableRow sx={{ borderBottom: "1px solid #ccc" }}>
                  <TableCell
                    sx={{
                      textAlign: "right",
                      fontSize: { xs: "10px", md: "16px" },
                      py: "2px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    <Skeleton width="40%" height={25} />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      fontSize: { xs: "10px", md: "16px" },
                      py: "2px",
                      border: "none",
                      width: "50%",
                    }}
                  >
                    <Skeleton width="40" height={25} />
                  </TableCell>
                </TableRow>

                {/* Skeleton for rows */}
                {[...Array(3)].map((_, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{ borderBottom: "1px solid #ccc" }}
                  >
                    <TableCell
                      sx={{
                        textAlign: "right",
                        fontSize: { xs: "10px", md: "16px" },
                        py: "4px",
                        border: "none",
                      }}
                    >
                      <Skeleton width="30%" height={20} />
                    </TableCell>
                    <TableCell
                      sx={{ py: "4px", border: "none", textAlign: "center" }}
                    >
                      <Skeleton width="40%" height={20} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider sx={{ display: "block" }} />
          </Box>
        </Box>
      ))}

      {/* Skeleton for description */}
      <Box
        my={3}
        sx={{
          backgroundColor: "#f5f5f5",
          display: "block",
          padding: "20px",
          width: "100%",
          boxShadow: "1px 1px 5px 1px rgba(128, 128, 128, 0.3)",
        }}
      >
        <Skeleton width="30%" height={20} />
        <Skeleton width="100%" height={100} />
      </Box>
    </Box>
  );
};

export default ProgramDetailsSkeleton;
