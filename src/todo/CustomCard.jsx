import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Collapse,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#2196f3",
  },
  card: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    backgroundColor: "#f5f4f4",
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#FFFFFF",
  },
  textField: {
    backgroundColor: "#FFFFFF",
  },
}));

const CustomCard = ({
  cardId,
  targetId,
  textFields,
  draggedItem,
  setTextFields,
  setDraggedItem,
  setCardId,
  setTargetId,
  sectionName,
}) => {
  const classes = useStyles();
  const [currentValue, setCurrentValue] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);

  const handleChange = (event) => {
    setCurrentValue(event.target.value);
  };

  const onDrag = (event, draggedItem) => {
    event.preventDefault();
    setDraggedItem(draggedItem);
  };

  const onDragOver = (event, section) => {
    event.preventDefault();
    setTargetId(section);
  };

  const onDrop = () => {
    const newTextFields = textFields.filter(
      (item) => item.key !== draggedItem.key
    );

    setTextFields([
      ...newTextFields,
      {
        key: draggedItem.key,
        value: draggedItem.value,
        section: targetId,
      },
    ]);

    setDraggedItem();
  };

  const saveCard = (section) => {
    if (currentValue.trim() === "") {
      return;
    }

    const existingCard = textFields.find((field) => {
      return field.value === currentValue && field.section === section;
    });

    if (existingCard) {
      const updatedFields = textFields.map((field) => {
        if (field.key === existingCard.key) {
          return { ...field, value: currentValue };
        } else {
          return field;
        }
      });

      setTextFields(updatedFields);
    } else {
      const newCard = { key: cardId, value: currentValue, section: section };
      const newFields = [...textFields, newCard];
      setTextFields(newFields);
      setCardId(cardId + 1);
    }

    setCurrentValue("");
    setShowAddCard(false);
  };

  const handleEditCardClick = (item) => {
    setCurrentValue(item.value);
    setShowAddCard(true);
    handleDeleteCardClick(item);
  };

  const handleDeleteCardClick = (item) => {
    const newFields = textFields.filter((field) => field.key !== item.key);
    setTextFields(newFields);
  };

  return (
    <Grid item xs={12} sm={2}>
      <Paper
        className={classes.card}
        onDrop={() => onDrop()}
        onDragOver={(event) => onDragOver(event, sectionName)}
      >
        <div>
          <Typography
            className={classes.textField}
            style={{ display: "flex", justifyContent: "start" }}
            variant="h5"
            component="h2"
            gutterBottom
          >
            {sectionName}
          </Typography>
          <div>
            {textFields
              .filter((field) => field.section === sectionName)
              .map((field) => (
                <>
                  <Card
                    className={classes.card}
                    draggable
                    onDrag={(event) => onDrag(event, field)}
                  >
                    <CardContent
                      className={classes.textField}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        maxHeight: "none",
                        overflow: "auto",
                      }}
                    >
                      <div style={{ flex: 1 }}>{field.value}</div>
                      <div>
                        <EditIcon onClick={() => handleEditCardClick(field)} />
                        <DeleteIcon
                          onClick={() => handleDeleteCardClick(field)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </>
              ))}
          </div>
        </div>
        <Collapse in={showAddCard}>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Task name"
            autoFocus
            value={currentValue}
            onChange={handleChange}
          />
          <Button
            variant="none"
            className={classes.button}
            startIcon={<AddCircleIcon />}
            onClick={() => saveCard(sectionName)}
          >
            Add Task
          </Button>
        </Collapse>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={() => setShowAddCard(!showAddCard)}
        >
          Add Card
        </Button>
      </Paper>
    </Grid>
  );
};

export default CustomCard;
