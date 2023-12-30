import React, { useState, useEffect } from 'react';

interface Phase {
  phaseName: string;
  tasks: { taskName: string; isChecked: boolean }[];
}

const WizardForm: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>([
    {
      phaseName: '', // Initial empty phase name
      tasks: [{ taskName: '', isChecked: false }, { taskName: '', isChecked: false }],
    },
  ]);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<string>('');
  const [currentTasks, setCurrentTasks] = useState<{ taskName: string; isChecked: boolean }[]>([
    { taskName: '', isChecked: false },
    { taskName: '', isChecked: false },
  ]);

  const addTaskField = () => {
    setCurrentTasks([...currentTasks, { taskName: '', isChecked: false }]);
  };

  const handlePhaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPhase(e.target.value);
  };

  const handleTaskChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const tasks = [...currentTasks];
    tasks[index] = { taskName: e.target.value, isChecked: false };
    setCurrentTasks(tasks);
  };

  const handleNext = () => {
    if (currentPhase.trim() === '' || currentTasks.every(task => task.taskName.trim() === '')) {
      alert('Please provide phase name and at least one task.');
      return;
    }

    // Filtering out empty tasks before saving
    const filteredTasks = currentTasks.filter((task) => task.taskName.trim() !== '');

    if (filteredTasks.length > 0) {
      const phase: Phase = { phaseName: currentPhase, tasks: filteredTasks };

      // Updating phases directly with the filtered tasks
      setPhases((prevPhases) => {
        const updatedPhases = [...prevPhases];
        updatedPhases[currentPhaseIndex] = phase;
        return updatedPhases;
      });

      setCurrentTasks([{ taskName: '', isChecked: false }, { taskName: '', isChecked: false }, { taskName: '', isChecked: false }]);

      setCurrentPhase('');
      setCurrentPhaseIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('Please enter at least one task.');
    }
  };

  const handlePrevious = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex((prevIndex) => prevIndex - 1);
      const previousPhase = phases[currentPhaseIndex - 1];
      setCurrentPhase(previousPhase.phaseName);
      setCurrentTasks(previousPhase.tasks);
    }
  };

  useEffect(() => {
    localStorage.setItem('wizardData', JSON.stringify(phases));
  }, [phases]);

  const handleSubmit = () => {
    //final submission using the phases collected
    if (currentPhase.trim() === '' || currentTasks.every(task => task.taskName.trim() === '')) {
      alert('Please provide phase name and at least one task before submitting.');
      return; // Prevent further execution if conditions aren't met
    }
    console.log('Submitted data:', phases);

    if (currentPhase.trim() !== '' && !currentTasks.every(task => task.taskName.trim() === '')) {
      setCurrentTasks([{ taskName: '', isChecked: false }, { taskName: '', isChecked: false }, { taskName: '', isChecked: false }]); // <-- Added here
      const phase: Phase = { phaseName: currentPhase, tasks: currentTasks };
      setPhases((prevPhases) => [...prevPhases, phase]);
    }

    // Locally storing tasks as objects with taskName and isChecked properties
    const updatedPhases: Phase[] = phases.map((phase) => ({
      ...phase,
      tasks: phase.tasks.map((task) => ({ taskName: task.taskName, isChecked: false })),
    }));

    localStorage.setItem('wizardData', JSON.stringify(updatedPhases));

    
    window.location.href = '/view-data'; 
  };
  
  return (
<div className="wizard-form-container">
    <h2 className="wizard-form-header">My startup creation journey: Phases & Tasks</h2>
    <div className="wizard-form-card">
      <div className="wizard-form-content">
        <div className="phase-input">
          <h3><label htmlFor="phase-name">Phase {currentPhaseIndex + 1}</label></h3>
          <br />
          <input
            type="text"
            id="phase-name"
            value={currentPhase}
            onChange={handlePhaseChange}
          />
        </div>
        <h3><label htmlFor="tasks"> Tasks</label></h3>
        <div className="task-inputs">
          {currentTasks.map((task, taskIndex) => (
            <div key={taskIndex} className="task-input">
              <input
                type="text"
                value={task.taskName}
                placeholder={`Task ${taskIndex + 1}`}
                onChange={(e) => handleTaskChange(taskIndex, e)}
              />
            </div>
          ))}
          <button className="add-task-button" onClick={addTaskField}>
            Add Task
          </button>
        </div>
        <div className="navigation-buttons">
          <button className="previous-button" onClick={handlePrevious} disabled={currentPhaseIndex === 0}>
            Previous
          </button>
          <button className="next-button" onClick={handleNext}>Next</button>
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
  );
};

export default WizardForm;