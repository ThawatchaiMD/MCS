import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

  const MySwal = withReactContent(Swal)

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      username: data.get("email"),
      password: data.get("password"),
    };

    // if (jsonData.email === 'adminJCA@gmail.com' && jsonData.password === 'admin1111') {
    //   localStorage.setItem("token", jsonData.email);
    //   navigate('/dashboard')
    // } else {
    //     MySwal.fire({
    //         title: "Login",
    //         text: "User or Password Incorrect",
    //         icon: 'error'
    //       })
    // }

    fetch( import.meta.env.VITE_APP_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.status === "ok") {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        backgroundColor: 'rgba(223, 228, 225, 1)', height: "100vh",display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        marginTop: "auto",
        marginBottom: "auto", 
      }}>

        <Box sx={{
          height: 700,
          width: 600,
          borderRadius: '0.6em',
          boxShadow: '5px 5px 10px 1px grey',
          backgroundColor: 'rgba(255, 255, 255, 1)'
        }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                height: 100,
                width: 200,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              component={'img'}
              src="public/MCS+.png"
            />
            <h4 className="login">
              Monitoring Platform
            </h4>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 7 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ backgroundColor: 'rgba(223, 228, 225, 1)' }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={{ backgroundColor: 'rgba(223, 228, 225, 1)' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"

                sx={{ mt: 1, mb: 2, borderRadius: '0.6em' }}
              >
                Log In
              </Button>
              <Copyright sx={{ mt: 10 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
