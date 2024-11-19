import React, { useState } from "react";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import theme from "../../../theme";

interface OffCanvasMenuProps {
  Options: string[];
  ButtonText: string;
  setSelectedFilter: (filter: string) => void; // تابعی برای به روزرسانی فیلتر انتخاب شده
}

function OffCanvasMenu({ Options, ButtonText, setSelectedFilter }: OffCanvasMenuProps) {
  const [open, setOpen] = useState(false);
  const [buttonText, setButtonText] = useState(ButtonText);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleItemClick = (item: string) => {
    setButtonText(item);
    setSelectedFilter(item); // به‌روزرسانی فیلتر انتخاب شده
    toggleDrawer(false)(); // بسته شدن دراور پس از انتخاب
  };

  const handleResetFilter = () => {
    setButtonText(ButtonText); // بازگشت به نام پیش‌فرض دکمه
    setSelectedFilter(""); // تنظیم فیلتر به رشته خالی
    toggleDrawer(false)(); // بسته شدن دراور پس از انتخاب
  };

  return (
    <>
      <Button
        sx={{ width: "40%", borderRadius: "20px" }}
        variant="contained"
        onClick={toggleDrawer(true)}
      >
        {buttonText}
      </Button>

      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          style: {
            height: "60vh",
            borderRadius: "60px 60px 0px 0px",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            overflow:"scroll",
          },
        }}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* آیتم ثابت برای بازگشت به نام پیش‌فرض */}
          <ListItem
            onClick={handleResetFilter}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              my: 1,
            }}
          >
            <ListItemText primary={ButtonText} />
          </ListItem>
          <Divider sx={{ backgroundColor: "white", width: "90%", mx: "auto" }} /> {/* جداکننده */}

          {Options.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                onClick={() => handleItemClick(item)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  my: 1,
                }}
              >
                <ListItemText primary={item} />
              </ListItem>
              {index < Options.length - 1 && (
                <Divider
                  sx={{ backgroundColor: "white", width: "90%", mx: "auto" }} // برای وسط چین کردن
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default OffCanvasMenu;
