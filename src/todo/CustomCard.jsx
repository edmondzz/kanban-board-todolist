import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  Grid,
  CardContent,
  Collapse,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  setTextFields,
  setDraggedItem,
  setCardId,
  setTargetId,
} from "./createSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  card: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#FFFFFF",
  },
  textField: {
    backgroundColor: "#FFFFFF",
  },
}));

const CustomCard = ({ sectionName }) => {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const dispatch = useDispatch();

  const { textFields, draggedItem, cardId, targetId } = useSelector(
    (state) => state.kanban
  );

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  const onDrag = (event, draggedItem) => {
    event.preventDefault();
    dispatch(setDraggedItem(draggedItem));
  };

  const onDragOver = (event, section) => {
    event.preventDefault();
    dispatch(setTargetId(section));
  };

  const onDrop = () => {
    const newTextFields = textFields.filter(
      (item) => item.key !== draggedItem.key
    );

    dispatch(
      setTextFields([
        ...newTextFields,
        {
          key: draggedItem.key,
          value: draggedItem.value,
          section: targetId, // targetId is the section name
        },
      ])
    );

    dispatch(setDraggedItem());
  };

  const saveCard = (section) => {
    if (currentValue.trim() === "") {
      return;
    }
    setShowAddCard(false);
    const existingCard = textFields.find(
      (field) => field.value === currentValue && field.section === section
    );

    if (existingCard) {
      if (existingCard.value !== currentValue) {
        const updatedFields = textFields.map((field) => {
          if (field.key === existingCard.key) {
            return { ...field, value: currentValue };
          } else {
            return field;
          }
        });
        
        dispatch(setTextFields(updatedFields));
      }
    } else {
      const newCard = { key: cardId, value: currentValue, section: section };
      const newFields = [...textFields, newCard];
      dispatch(setTextFields(newFields));
      dispatch(setCardId(cardId + 1));
    }
    setCurrentValue("");
  };
  const handleDeleteCardClick = (item) => {
    const newFields = textFields.filter((field) => field.key !== item.key);
    dispatch(setTextFields(newFields));
  };

  const handleEditCardClick = (item) => {
    setCurrentValue(item.value);
    setShowAddCard(true);
    handleDeleteCardClick(item);
  };

  return (
    <Grid item xs={12} sm={2}>
      <Paper
        className={classes.card}
        onDrop={() => onDrop()}
        onDragOver={(event) => onDragOver(event, sectionName)}
      >
        <Typography
          style={{ display: "flex", justifyContent: "start" }}
          variant="h5"
          gutterBottom
        >
          {sectionName}
        </Typography>
        {textFields
          .filter((field) => field.section === sectionName)
          .map((field) => (
            <Card
            className={classes.card}
              key={field.key}
              draggable
              onDrag={(event) => onDrag(event, field)}
              onDragOver={(event) => onDragOver(event)}
              onDrop={onDrop}
            >
              <CardContent
                className={classes.textField}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: 'auto'
                }}
              >
                <div style={{ flex: 1 }}>{field.value}</div>
                <EditIcon onClick={() => handleEditCardClick(field)} />
                <DeleteIcon onClick={() => handleDeleteCardClick(field)} />
              </CardContent>
            </Card>
          ))}
        <Collapse in={showAddCard}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="dense"
            fullWidth
            placeholder="Add a card"
            value={currentValue}
            onChange={handleChange}
          />
          <Button
            variant="none"
            startIcon={<AddCircleIcon />}
            onClick={() => saveCard(sectionName)}
          >
            {`Add Task`}
          </Button>
        </Collapse>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => setShowAddCard(true)}
          >
            {`Add card`}
          </Button>
      </Paper>
    </Grid>
  );
};
export default CustomCard;
