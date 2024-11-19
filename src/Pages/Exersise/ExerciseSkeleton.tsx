import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Skeleton } from "@mui/material";

function ExerciseSkeleton() {
  return (
    <Box
      sx={{
        mt: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Skeleton for Image */}
      <Skeleton variant="rectangular" width={300} height={300} />

      {/* Skeleton for Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "20px",
          marginTop: "20px",
          width: "100%",
          maxWidth: 600,
        }}
      >
        <Table size="medium">
          <TableBody>
            {/* Skeleton for Name */}
            <TableRow>
              <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                <Skeleton width="80%" height={40} />
              </TableCell>
            </TableRow>

            {/* Skeleton for Equipment */}
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton width="50%" height={30} />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton width="50%" height={30} />
              </TableCell>
            </TableRow>

            {/* Skeleton for Target */}
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton width="50%" height={30} />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton width="50%" height={30} />
              </TableCell>
            </TableRow>

            {/* Skeleton for Synergist */}
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton width="50%" height={30} />
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Skeleton width="50%" height={30} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Skeleton for Switch */}
      <Skeleton
        variant="rectangular"
        width={60}
        height={30}
        sx={{ marginTop: "20px" }}
      />
    </Box>
  );
}

export default ExerciseSkeleton;
