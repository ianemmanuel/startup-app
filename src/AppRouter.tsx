import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WizardForm from './components/WizardForm';
import ViewData from './components/ViewData';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WizardForm />} />
      <Route path="/view-data" element={<ViewData />} />
    </Routes>
  );
};

export default AppRouter;