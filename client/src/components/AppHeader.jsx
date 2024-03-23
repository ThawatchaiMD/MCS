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
    <>
      {/* <nav class="navbar navbar-expand-lg bg-body-tertiary"> */}
      <nav class="navbar bg-white navbar-expand-lg" style={{ boxShadow: `0px 1px 4px #9E9E9E` }}>
        <div class="container-fluid">
          <div>
            <IconButton
              onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
              sx={{ color: "black" }}
            >
              <i class="fa-solid fa-house"></i>
            </IconButton>
            <a class="navbar-brand mr-3">Dashboard</a>
          </div>

          {/* <a class="navbar-brand" href="#">Navbar</a> */}
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li> */}
            </ul>
            <div class="d-flex">
              <IconButton title="Notifications" sx={{ mr: 2 }}>
                <Badge className="text-success">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <div className="mt-2">
                <i className="fa-solid fa-user text-success" style={{ marginRight: 7 }}></i>
                <span className="text-dark mr-10"> Admin HypeTex</span>
              </div>
              <IconButton title="Sign Out" className="text-dark" onClick={handleLogout} sx={{
                // color: "white",
                // backgroundColor: "#784734",
                // borderRadius: "50%",
                mr: 3,
                ml: 3
              }}>
                <LogoutIcon />
              </IconButton>
            </div>

          </div>
        </div>
      </nav>

    </>
    // <div position="sticky" sx={styles.appBar}>
    //   <Toolbar>
    //     <IconButton
    //       onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
    //       sx={{ color: "black" }}
    //     >
    //         <i class="fa-solid fa-house"></i>
    //     </IconButton>
    //     <h6 className="ml-10 mt-2 text-dark">Dashboard</h6>
    //     <Box sx={{ flexGrow: 1 }} />
    //     <IconButton title="Notifications" sx={{ mr: 2 }}>
    //       <Badge className="text-success">
    //         <NotificationsIcon />
    //       </Badge>
    //     </IconButton>
    //     <div>
    //       <i className="fa-solid fa-user text-success" style={{ marginRight: 7 }}></i>
    //       <span className="text-dark"> Admin HypeTex</span>
    //     </div>

    //   </Toolbar>
    // </div>
  );
}

const styles = {
  appBar: {
    bgcolor: "rgb(255, 255, 255)",
    boxShadow: 1,
    borderColor: "rgb(255, 255, 255)",
    hight: 50,
  },
  appLogo: {
    borderRadius: 1,
    width: 60,
    marginLeft: 1,
    cursor: "pointer",
  },
};

export default AppHeader;
