import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";

import { AuthProvider } from "./components/AuthProvider";
import AppBar from "./components/AppBar";
import Jobs from "./components/Jobs/Jobs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div>
      <SnackbarProvider maxSnack={4}>
        <CssBaseline />
        <AuthProvider>
          <AppBar />
          <Container className={classes.root}>
            <Paper>
              <Jobs />
            </Paper>
          </Container>
        </AuthProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
