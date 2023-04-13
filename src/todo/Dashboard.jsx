import React from "react";
import { Grid } from "@material-ui/core";
import CustomCard from "./CustomCard";
  
const Dashboard = () => {
  
  return (
    <div style={{backgroundColor: '#2196f3'}}>
      <Grid container spacing={3} style={{ justifyContent: "center" }}>
        <CustomCard sectionName="To Do" />
        <CustomCard sectionName="In Progress 2"  />
        <CustomCard sectionName="Done"  />
      </Grid>
    </div>
  );
};

export default Dashboard;
