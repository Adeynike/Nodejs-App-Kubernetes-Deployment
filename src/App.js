// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Users from './pages/Users';
import UserDetails from './pages/userDetails'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/user/:userId" element={<UserDetails />} />
          <Route path="/" element={<Users />} />
          {/* Add other routes if needed */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
