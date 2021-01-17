import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
  },
  selectedItem: {
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    borderWidth: 1,
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

export default function JobList({ jobs, selectedJobId, handleClick }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folders">
        {jobs.map((job) => (
          <ListItem
            button
            key={job.id}
            onClick={handleClick(job)}
            className={job.id === selectedJobId ? classes.selectedItem : ""}
          >
            <ListItemText primary={job.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
