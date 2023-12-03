import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";
import { Link } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255 255 255 / 1)',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function Popoverdashboard2() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 2,
        left: 2,
        flexGrow: 1,
        px: 3,
      }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid item>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    SMDB2.1
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "SMDB2.1", id: 1 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Air Com 40 Bar
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "Air Com 40 Bar", id: 2 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Air Com 7 Bar
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "Air Com 7 Bar", id: 3 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Chiller 1
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "Chiller 1", id: 4 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid item>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Chiller 2
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "Chiller 2", id: 5 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    LC11-Spare part
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "LC11-Spare part", id: 6 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    LC12-Refrig.
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "LC12-Refrig", id: 7 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid item>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    PPB-Office
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "PPB-Office", id: 8 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Fresh Blower
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "Fresh Blower", id: 9 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    Finish Syrup
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "Finish Syrup", id: 10 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item xs={3} minWidth={300}>
          <StyledPaper
            sx={{
              my: 1,
              mx: "auto",
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
              <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ color: "neutral.normal", ml: 4, mr: 4 }}
                  >
                    Processing Process
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    LC13-R.O. Bd.
                  </Typography>
                  <Box sx={{ float: "left", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Power
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      Total Energy
                    </Typography>
                  </Box>
                  <Box sx={{ float: "right", mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "neutral.normal" }}
                    >
                      kw
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 9 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "neutral.normal",
                        float: "left",
                        mt: 1,
                        ml: 4,
                      }}
                    >
                      Detail
                    </Typography>
                    <IconButton
                      sx={{ float: "right" }}
                      component={Link}
                      to="/realtime"
                      state={{ device: "LC13-R.O. Bd.", id: 11 }}
                      aria-label="delete"
                      size="large"
                    >
                      <ArticleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}
