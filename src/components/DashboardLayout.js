import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Home, Map, BarChart, History, Download, Warning } from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Map current path to tab index
  const pathToIndex = {
    '/': 0,
    '/map': 1,
    '/stats': 2,
    '/sensor-history': 3,
    '/accident-history': 4,
    '/download': 5,
  };

  // Map index to path for navigation
  const indexToPath = {
    0: '/',
    1: '/map',
    2: '/stats',
    3: '/sensor-history',
    4: '/accident-history',
    5: '/download',
  };

  const currentTab = pathToIndex[location.pathname] ?? 0;

  const handleChange = (event, newValue) => {
    navigate(indexToPath[newValue]);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={currentTab}
        onChange={handleChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3, maxWidth: 900, mx: 'auto' }}
      >
        <Tab icon={<Home />} label="Home" />
        <Tab icon={<Map />} label="Map" />
        <Tab icon={<BarChart />} label="Stats" />
        <Tab icon={<History />} label="Sensor History" />
        <Tab icon={<Warning />} label="Accident Log" />
        <Tab icon={<Download />} label="Download" />
      </Tabs>
      <Outlet />
    </Box>
  );
}
