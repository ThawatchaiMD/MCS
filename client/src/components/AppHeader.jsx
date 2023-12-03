import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useProSidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  let navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <IconButton
          onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
          sx={{color:"white"}}
        >
          <MenuIcon />
        </IconButton>
        {/* <Box component={"img"} sx={styles.appLogo} src="public/Ennova.png" /> */}
        <Box sx={{ flexGrow: 1 }} />
        {/* 
            <IconButton title="Notifications">
                <Badge badgeContent={21} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton title="Settings" color="black">
                <SettingsIcon />
            </IconButton> */}
        <IconButton title="Sign Out" color="warning" onClick={handleLogout} sx={{
            color: "white",
            // backgroundColor: "#784734",
            // borderRadius: "50%",
          }}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  appBar: {
    bgcolor: "rgb(0, 0, 139)",
    boxShadow: 0,
    borderBottom: 1,
    borderColor: "rgb(0, 0, 139)",
  },
  appLogo: {
    borderRadius: 1,
    width: 60,
    marginLeft: 1,
    cursor: "pointer",
  },
};

export default AppHeader;
