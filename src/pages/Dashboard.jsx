import React from 'react';
import { Grid } from '@material-ui/core';
import DashboardBarChart from './Dashboard/DashboardBarChart';
import RevenueCard from './Dashboard/RevenueCard';
import CardB from './Dashboard/CardB';

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <RevenueCard />
      </Grid>
      <Grid item xs={12} md={4}>
        <CardB />
      </Grid>
    </Grid>
  );
}
