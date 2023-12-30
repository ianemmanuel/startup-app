import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Assuming you're using 'react-modal'

interface Phase {
  phaseName: string;
  tasks: { taskName: string; isChecked: boolean }[];
  isDone: boolean;
  isLocked: boolean;
}

const ViewData: React.FC = () => {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [unlockedPhaseIndex, setUnlockedPhaseIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [randomFact, setRandomFact] = useState('');

  // Define fetchRandomFact outside of useEffect
  const fetchRandomFact = async () => {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json');
    const data = await response.json();
    setRandomFact(data.text);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('wizardData');

    if (storedData) {
      try {
        const storedPhases = JSON.parse(storedData) as Phase[];
        setPhases(storedPhases);

        // Check for completion and open modal only if all phases are done
        if (storedPhases.every((phase) => phase.isDone)) {
          fetchRandomFact(); // Fetch fact if needed
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('Error parsing data from localStorage:', error);
      }
    } else {
      setPhases([]);
    }
  }, []);

  // UseEffect to trigger fetchRandomFact when modal is opened
  useEffect(() => {
    fetchRandomFact();
  }, [isModalOpen]); // Fetch fact only when modal is triggered

  const handleTaskCheck = (phaseIndex: number, taskIndex: number) => {
    const updatedPhases = [...phases];
    const updatedTasks = [...updatedPhases[phaseIndex].tasks];
    updatedTasks[taskIndex].isChecked = !updatedTasks[taskIndex].isChecked;

    // Uncheck subsequent tasks in the same phase if unchecked
    for (let i = taskIndex + 1; i < updatedTasks.length; i++) {
      updatedTasks[i].isChecked = false;
    }

    const isPhaseCompleted = updatedTasks.every((task) => task.isChecked);

    if (isPhaseCompleted) {
      updatedPhases[phaseIndex].isDone = true;

      if (phaseIndex < updatedPhases.length - 1) {
        updatedPhases[phaseIndex + 1].isLocked = false;
      }

      setUnlockedPhaseIndex(Math.min(phaseIndex + 1, updatedPhases.length - 1));

      // Only check for completion of all phases here, after updating isDone
      if (updatedPhases.every((phase) => phase.isDone)) {
        setIsModalOpen(true);
      }
    } else {
      for (let i = phaseIndex + 1; i < updatedPhases.length; i++) {
        updatedPhases[i].isDone = false;
        updatedPhases[i].isLocked = true;
        updatedPhases[i].tasks.forEach((task) => (task.isChecked = false));
      }
    }

    setPhases(updatedPhases);
  };

  return (
    <div className="view-data-container">
    <div className="view-data-card">
      <h2 className="view-data-header">My startup progress :)</h2>
      {phases.map((phase, index) => (
        <div key={index} className={`phase-container ${phase.isLocked ? 'is-locked' : ''}`}>
          <h3 className="phase-name">{phase.phaseName}</h3>
          <ul className="task-list">
            {phase.tasks.map((task, taskIndex) => (
              <li key={taskIndex} className="task-item">
                {task.taskName}
                <input
                  type="checkbox"
                  checked={task.isChecked}
                  disabled={phase.isLocked || index > unlockedPhaseIndex}
                  onChange={() => handleTaskCheck(index, taskIndex)}
                  className="task-checkbox"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Random Fact"
        className="custom-modal"
      >
        <div className="modal-content">
          <h2>Congratulations! You've completed all phases!</h2>
          <p>Here's a random fact for your accomplishment:</p>
          <p>{randomFact}</p>
        </div>
        
      </Modal>
    </div>
  </div>
  );
};

export default ViewData;

