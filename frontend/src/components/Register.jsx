import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useUserAuth();

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const newUser = {
  //     local: {
  //       username: data.get("username"),
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     },
  //   };

  //   try {
  //     await axios.post("/users/register", newUser);
  //     alert("Success");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleFirebaseSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(user);
    try {
      await signUp(user.email, user.password);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            //onSubmit={handleSubmit}
            onSubmit={handleFirebaseSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  //required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
