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
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider', height: 64, display: 'flex', alignItems: 'center', bgcolor: 'background.default' }}>
      <Box component="img" src="/car-on-road.svg" alt="Logo" sx={{ height: 40, width: 40, ml: 2, mr: 3 }} />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
        sx={{ maxWidth: 850, mx: 'auto', p: 1, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, transition: 'all 0.3s ease' }}
        TabIndicatorProps={{ style: { transition: 'all 0.3s ease' } }}
      >
        <Tab icon={<Home />} label="Home" sx={{ minWidth: 100, px: 2, mr: 2, transition: 'color 0.3s ease' }} />
        <Tab icon={<Map />} label="Map" sx={{ minWidth: 100, px: 2, mr: 2, transition: 'color 0.3s ease' }} />
        <Tab icon={<BarChart />} label="Stats" sx={{ minWidth: 100, px: 2, mr: 2, transition: 'color 0.3s ease' }} />
        <Tab icon={<History />} label="Sensor History" sx={{ minWidth: 100, px: 2, mr: 2, transition: 'color 0.3s ease' }} />
        <Tab icon={<Warning />} label="Accident Log" sx={{ minWidth: 100, px: 2, mr: 2, transition: 'color 0.3s ease' }} />
        <Tab icon={<Download />} label="Download" sx={{ minWidth: 100, px: 2, transition: 'color 0.3s ease' }} />
      </Tabs>
      <Outlet />
    </Box>
  );
}
