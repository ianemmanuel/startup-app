// App.tsx
import React from 'react';
import WizardForm from './components/WizardForm';
import AppRouter from './AppRouter'; // Import AppRouter

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter /> {/* Use AppRouter instead of WizardForm */}
    </div>
  );
};

export default App;