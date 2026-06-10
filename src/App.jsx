import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="flex-1 pb-16">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
