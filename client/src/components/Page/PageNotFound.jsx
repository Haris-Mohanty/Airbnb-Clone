import { Box, Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const PageNotFound = () => {
  return (
    <>
      <Box textAlign="center" mt={6} p={4}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <SentimentDissatisfiedIcon color="error" style={{ fontSize: 60 }} />
          </Grid>
          <Grid item>
            <Typography variant="h4" color="error" fontWeight={"bold"}>
              404 - Not Found
            </Typography>
            <Typography variant="body1" mt={2}>
              Oops! The page you are looking for does not exist.
            </Typography>
            <Box mt={4}>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Go to Home
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PageNotFound;
