import React, { useEffect, useState } from "react";
import { Box, Card, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme, { fontFamilies } from "../../../theme";
import { Close, Done } from "@mui/icons-material";

function RequestsTab() {
  const [value, setValue] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
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

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleApprove = async (_id: string) => {
    try {
      await axiosInstance.post(
        "/api/requestedexerciselist/approveexerciselist",
        {
          requestId: _id,
        }
      );
      console.log("درخواست تأیید شد:", _id);
    } catch (error) {
      console.error("خطا در تأیید درخواست:", error);
    } finally {
    }
  };

  const handleReject = async (_id: string) => {
    try {
      await axiosInstance.post(
        "/api/requestedexerciselist/rejectexerciselist",
        {
          requestId: _id,
        }
      );
      console.log("درخواست رد شد:", _id);
    } catch (error) {
      console.error("خطا در رد درخواست:", error);
    } finally {
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
            <Card key={request.id} sx={{ marginBottom: 2, padding: 2 }}>
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
                  width: "fit-content",
                  padding: "5px",
                  fontSize: { xs: "10px", md: "18px" },
                  borderRadius: "8px",
                  marginTop: "5px",
                  float: "left",
                }}
              >
                {request.status === "pending"
                  ? "ارسال شده"
                  : request.status === "approved"
                  ? "دریافت شد"
                  : request.status === "rejected"
                  ? "رد شد"
                  : request.status}
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
                  <Done
                    sx={{
                      color: theme.palette.success.main,
                      float: "left",
                      marginTop: "5px",
                      marginRight: "5px",
                    }}
                    onClick={() => handleApprove(request._id)}
                  />
                  <Close
                    sx={{
                      color: theme.palette.error.main,
                      float: "left",
                      marginTop: "5px",
                    }}
                    onClick={() => handleReject(request._id)}
                  />
                </>
              )}
            </Card>
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default RequestsTab;
