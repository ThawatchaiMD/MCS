import { Avatar, Box, Typography, useTheme, IconButton } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link, useNavigate } from "react-router-dom";

function SideNav() {
  const theme = useTheme();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();

  return (
    
    <Sidebar
      style={{ height: "100%", top: "auto" }}
      breakPoint="md%"
      backgroundColor={theme.palette.neutral.light}
    >
      {/* <Box sx={styles.menuContainer}>
            <IconButton onClick={() => broken ? toggleSidebar() : collapseSidebar()} >
                <MenuIcon  color="primary" />
            </IconButton>
            {!collapsed ? <Typography variant="body2" sx={styles.yourChannel}>Your Channel</Typography> : null}
            {!collapsed ? <Typography variant="overline">React with Masoud</Typography> : null}
        </Box> */}

      <Box sx={styles.avatarContainer}>
        {!collapsed ? (
          <Box
            component={"img"}
            sx={{
              borderRadius: 1,
              width: 100,
              marginLeft: 1,
              cursor: "pointer",
            }}
            src="public/Ennova.png"
          />
        ) : (
          <Box component={"img"} sx={styles.appLogo} src="public/Ennova.png" />
        )}
        {!collapsed ? (
          <Typography variant="body2" sx={styles.yourChannel}>
            HTC Energy
          </Typography>
        ) : null}
      </Box>

      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            return {
              backgroundColor: active
                ? theme.palette.neutral.medium
                : undefined,
            };
          },
        }}
      >
        <MenuItem component={<Link to="/" />} icon={<DashboardOutlinedIcon />}>
          {" "}
          <Typography variant="body2">Dashboard</Typography>{" "}
        </MenuItem>
        <MenuItem
          component={<Link to="/mydevices" />}
          icon={<SourceOutlinedIcon />}
        >
          {" "}
          <Typography variant="body2">My Devices </Typography>
        </MenuItem>
        <MenuItem
          component={<Link to="/historicaldata" />}
          icon={<AnalyticsOutlinedIcon />}
        >
          {" "}
          <Typography variant="body2">Hitorical Data </Typography>
        </MenuItem>
        <MenuItem
          component={<Link to="/energyexport" />}
          icon={<FileDownloadOutlinedIcon />}
        >
          {" "}
          <Typography variant="body2">Energy Export </Typography>
        </MenuItem>
        <MenuItem
          component={<Link to="/systemoverview" />}
          icon={<ViewCompactAltOutlinedIcon />}
        >
          {" "}
          <Typography variant="body2">System Overview </Typography>
        </MenuItem>
        <Box sx={styles.setting}>
          {!collapsed ? <Typography variant="body3">Setting</Typography> : null}
        </Box>
        <MenuItem
          component={<Link to="/user" />}
          icon={<PersonOutlineOutlinedIcon />}
        >
          {" "}
          <Typography variant="body2">User </Typography>
        </MenuItem>
      </Menu>
    </Sidebar>
    
  );
}

export default SideNav;

const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  menuContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 2,
  },
  avatar: {
    width: "10%",
    height: "auto",
  },
  yourChannel: {
    mt: 1,
  },
  setting: {
    mt: 2,
    ml: 3.5,
  },
  appLogo: {
    borderRadius: 1,
    width: 60,
    marginLeft: 1,
    cursor: "pointer",
  },
};
