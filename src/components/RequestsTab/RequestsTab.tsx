import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axiosInstance from "../../api/axiosInstance";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import theme, { fontFamilies } from "../../../theme";
import { Close, Done } from "@mui/icons-material";

function RequestsTab() {
  const [value, setValue] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const receivedResonse = await axiosInstance.get(
          "/api/requestedexerciselist/receivedrequests"
        );
        const sentResponse = await axiosInstance.get(
          "/api/requestedexerciselist/sentrequests"
        );
        await setSentRequests(sentResponse.data.sendedRequests);
        await setReceivedRequests(receivedResonse.data.receivedRequests);
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

    fetchRequests();
  }, []);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleResponse = (
    response: AxiosResponse<any, any>,
    _id: string,
    successMessage: string
  ) => {
    if (response.status === 200) {
      setSnackbar({ open: true, message: successMessage, severity: "success" });
    } else {
      setSnackbar({
        open: true,
        message: response.data?.message || "خطایی رخ داده است.",
        severity: "error",
      });
    }
  };

  const handleError = (error: any) => {
    setSnackbar({
      open: true,
      message: error.response?.data?.message || "خطا در ارتباط با سرور",
      severity: "error",
    });
  };

  const handleApprove = async (_id: any) => {
    setActionLoading(_id);
    try {
      setIsLoading(true);
      await delay(1200);
      const response = await axiosInstance.post(
        "/api/requestedexerciselist/approveexerciselist",
        { requestId: _id }
      );
      if (response.status === 200) {
        setReceivedRequests(
          receivedRequests.filter((request: any) => request._id !== _id)
        );
      }
      handleResponse(
        response,
        _id,
        "برنامه تمرینی با موفقیت تایید و اضافه شد."
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setActionLoading(null);
      window.location.reload();
    }
  };

  const handleReject = async (_id: any) => {
    setActionLoading(_id);
    try {
      setIsLoading(true);
      await delay(1200);
      const response = await axiosInstance.post(
        "/api/requestedexerciselist/rejectexerciselist",
        { requestId: _id }
      );
      if (response.status === 200) {
        setReceivedRequests(
          receivedRequests.filter((request: any) => request._id !== _id)
        );
      }
      handleResponse(response, _id, "درخواست رد شد.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setActionLoading(null);
    }
  };
  const handleResend = async (_id: any) => {
    setActionLoading(_id);
    try {
      setIsLoading(true);
      await delay(1200);
      const response = await axiosInstance.post(
        "/api/requestedexerciselist/resendexerciselist",
        { requestId: _id }
      );
      if (response.status === 200) {
        setSentRequests((prevRequests: any) =>
          prevRequests.map((request: any) =>
            request._id === _id && request.status === "rejected"
              ? { ...request, status: "pending" } // فقط تغییر وضعیت درخواست با آیدی خاص به "pending"
              : request
          )
        );
      }
      handleResponse(response, _id, "برنامه تمرینی با موفقیت مجددا ارسال شد.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setActionLoading(null);
    }
  };

  return (
    <Box width="90%" my={2} mx="auto">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              "& .MuiTab-root": { fontSize: { xs: "9px", sm: "14px" } },
              "& .Mui-selected": { fontWeight: "bold" },
            }}
          >
            <Tab label="درخواست‌های ارسالی" value="1" />
            <Tab label="درخواست‌های دریافتی" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {sentRequests.map((request: any) => (
            <Card key={request._id} sx={{ marginBottom: 2, padding: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "8px", md: "18px" },
                  fontFamily: fontFamilies.medium,
                }}
              >
                برنامه تمرینی با عنوان{" "}
                <Box
                  component="span"
                  sx={{ fontFamily: fontFamilies.extraBold }}
                >
                  {request.exerciseListId.title}
                </Box>{" "}
                به{" "}
                <Box
                  component="span"
                  sx={{ fontFamily: fontFamilies.extraBold }}
                >
                  {request.userIdRequestTo.name}
                </Box>{" "}
                ارسال شده است.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  backgroundColor:
                    request.status === "pending"
                      ? theme.palette.grey[400]
                      : request.status === "approved"
                      ? theme.palette.success.main
                      : request.status === "rejected"
                      ? theme.palette.error.main
                      : "transparent",
                  padding: "5px 8px",
                  fontSize: { xs: "9px", md: "13px" },
                  borderRadius: "20px",
                  marginTop: "5px",
                  float: "left",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {request.status === "pending" ? (
                  "ارسال شده"
                ) : request.status === "approved" ? (
                  "دریافت شد"
                ) : request.status === "rejected" ? (
                  <>
                    {actionLoading === request._id ? (
                      <CircularProgress sx={{ color: "white" }} size={24} />
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: { xs: "9px", md: "13px" },
                          padding: "3px 10px",
                          borderRadius: "20px",
                          backgroundColor: "transparent",
                          color: "white",
                          border: (theme) =>
                            `1px ${theme.palette.secondary.contrastText} solid`,
                        }}
                        onClick={() => handleResend(request._id)} // تابع برای ارسال مجدد
                      >
                        عدم تایید، ارسال مجدد
                      </Button>
                    )}
                  </>
                ) : (
                  request.status
                )}
              </Typography>
            </Card>
          ))}
        </TabPanel>
        <TabPanel value="2">
          {" "}
          {receivedRequests.map((request: any) => (
            <Card key={request._id} sx={{ marginBottom: 2, padding: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "10px", md: "18px" },
                  fontFamily: fontFamilies.medium,
                }}
              >
                برنامه تمرینی با عنوان{" "}
                <Box
                  component="span"
                  sx={{ fontFamily: fontFamilies.extraBold }}
                >
                  {request.exerciseListId.title}
                </Box>{" "}
                از طرف{" "}
                <Box
                  component="span"
                  sx={{ fontFamily: fontFamilies.extraBold }}
                >
                  {request.userIdRequestFrom.name}
                </Box>{" "}
                برای شما ارسال شده است.
              </Typography>

              {request.status === "pending" && (
                <>
                  {actionLoading === request._id ? (
                    <CircularProgress
                      size={24}
                      sx={{ float: "left", marginTop: "5px" }}
                    />
                  ) : (
                    <>
                      <Done
                        sx={{
                          color: theme.palette.success.main,
                          float: "left",
                          margin: "5px",
                        }}
                        onClick={() => handleApprove(request._id)}
                      />
                      <Close
                        sx={{
                          color: theme.palette.error.main,
                          float: "left",
                          margin: "5px",
                        }}
                        onClick={() => handleReject(request._id)}
                      />
                    </>
                  )}
                </>
              )}
            </Card>
          ))}
        </TabPanel>
      </TabContext>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.success.main,
            fontFamily: fontFamilies.medium,
            fontSize: { xs: "10px", md: "18px" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RequestsTab;
