import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import CustomCard from "./CustomCard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#2196f3",
  },
  card: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
  cardGap: {
    marginTop: "10px",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [textFields, setTextFields] = useState([]);
  const [draggedItem, setDraggedItem] = useState();
  const [cardId, setCardId] = useState(0);
  const [targetId, setTargetId] = useState();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ justifyContent: "center" }}>
        <CustomCard
          cardId={cardId}
          targetId={targetId}
          textFields={textFields}
          draggedItem={draggedItem}
          setTextFields={setTextFields}
          setDraggedItem={setDraggedItem}
          setCardId={setCardId}
          setTargetId={setTargetId}
          sectionName="To Do"
        />
        <CustomCard
          cardId={cardId}
          targetId={targetId}
          textFields={textFields}
          draggedItem={draggedItem}
          setTextFields={setTextFields}
          setDraggedItem={setDraggedItem}
          setCardId={setCardId}
          setTargetId={setTargetId}
          sectionName="In Progress"
        />
        <CustomCard
          cardId={cardId}
          targetId={targetId}
          textFields={textFields}
          draggedItem={draggedItem}
          setTextFields={setTextFields}
          setDraggedItem={setDraggedItem}
          setCardId={setCardId}
          setTargetId={setTargetId}
          sectionName="Done"
        />
      </Grid>
    </div>
  );
};

export default Dashboard;
