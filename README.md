The application is implemented using react, I chose to do the front-end implementation. 

Soon after loading the application in the browser, the user interacts with a wizard form that allows the user to input each phase of setting up his/her startup. 

Each phase has subsequent tasks. A phase can have unlimited tasks.

Empowering users to define the phases and tasks provides them with the ability to precisely articulate and oversee the process of establishing their startup. I implemented this feature with the understanding that startups can vary significantly and possess unique characteristics. Consequently, the method employed to set up one startup may diverge from that used for another, acknowledging the diversity within the startup landscape.

The user is redirected to the 'progress page' once he/she clicks on the submit button. The progress page tracks and documents the progress in setting up the startup. 

Initially all the phases are locked with the lone exception of the first phase. Once a user completes all the tasks of a phase, the next phase is unlocked. The user completes a task by clicking the checkbox beside the task. unchecking the checkbox of a task reopens that task and locks all the phases that come after that task. This action also reopens all the tasks of the locked phases and all the tasks that follow the reopened task. 

Once a user completes all the tasks in all phases he is presented with a random fact from https://uselessfacts.jsph.pl/random.json. 

/----------------------------------------------STEPS ON HOW TO RUN THE CODE:----------------------------------------------------/

 
1. Clone the Repository:

--Open your terminal or command prompt.

--Navigate to the directory where you want to store the project.

--Run the following command to clone the repository: 

	git clone https://github.com/ianemmanuel/startup-app.git


3. Use the cd command to navigate into the newly cloned project directory


4. Run the following command to install all the required dependencies for the project:

	npm install
	

5. Run the following command to start the React development server:

	npm start




 
