<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morning Routine Tracker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            color: white;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
        }
        
        .card {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            padding: 25px;
            margin-bottom: 25px;
        }
        
        h2 {
            color: #4a5568;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }
        
        .routine-step {
            display: flex;
            align-items: center;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 10px;
            background-color: #f7fafc;
            transition: all 0.3s ease;
            border-left: 4px solid #4299e1;
        }
        
        .routine-step:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .step-number {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: #4299e1;
            color: white;
            border-radius: 50%;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }
        
        .step-content {
            flex-grow: 1;
        }
        
        .step-content h3 {
            margin-bottom: 5px;
            color: #2d3748;
        }
        
        .step-content p {
            color: #718096;
        }
        
        .tracker-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        @media (max-width: 768px) {
            .tracker-container {
                grid-template-columns: 1fr;
            }
        }
        
        .step-tracker {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .tracker-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: #f7fafc;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .tracker-item.completed {
            background: #c6f6d5;
            border-left: 4px solid #38a169;
        }
        
        .tracker-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        button {
            background: #4299e1;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        button:hover {
            background: #3182ce;
            transform: translateY(-2px);
        }
        
        button.completed {
            background: #38a169;
        }
        
        button.completed:hover {
            background: #2f855a;
        }
        
        .progress-container {
            margin-top: 20px;
        }
        
        .progress-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .progress-bar {
            height: 20px;
            background: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            background: linear-gradient(90deg, #4299e1, #38a169);
            width: 0%;
            transition: width 0.5s ease;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 25px;
        }
        
        .stat-box {
            text-align: center;
            padding: 20px;
            background: #f7fafc;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #4299e1;
            margin-bottom: 5px;
        }
        
        .stat-label {
            color: #718096;
            font-size: 0.9rem;
        }
        
        .controls {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 25px;
        }
        
        .reset-btn {
            background: #e53e3e;
        }
        
        .reset-btn:hover {
            background: #c53030;
        }
        
        .motivation {
            text-align: center;
            margin-top: 20px;
            font-style: italic;
            color: #718096;
        }
        
        .completed-steps {
            margin-top: 20px;
            padding: 15px;
            background: #f0fff4;
            border-radius: 10px;
            border-left: 4px solid #38a169;
        }
        
        .completed-steps h3 {
            color: #2d3748;
            margin-bottom: 10px;
        }
        
        .completed-list {
            list-style-type: none;
        }
        
        .completed-list li {
            padding: 8px 0;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
        }
        
        .completed-list li:last-child {
            border-bottom: none;
        }
        
        .time {
            color: #718096;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Morning Routine Tracker</h1>
            <p class="subtitle">Start your day right with a productive morning routine</p>
        </header>
        
        <div class="card">
            <h2>The 5-Step Productivity Routine</h2>
            
            <div class="routine-step">
                <div class="step-number">1</div>
                <div class="step-content">
                    <h3>Hydrate (5 minutes)</h3>
                    <p>Drink a glass of water to rehydrate your body after sleep. Add lemon for an extra boost.</p>
                </div>
            </div>
            
            <div class="routine-step">
                <div class="step-number">2</div>
                <div class="step-content">
                    <h3>Move (10-15 minutes)</h3>
                    <p>Light stretching, yoga, or a brisk walk to wake up your body and increase blood flow.</p>
                </div>
            </div>
            
            <div class="routine-step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <h3>Plan (5 minutes)</h3>
                    <p>Review your calendar and identify your top 3 priorities for the day.</p>
                </div>
            </div>
            
            <div class="routine-step">
                <div class="step-number">4</div>
                <div class="step-content">
                    <h3>Learn (10 minutes)</h3>
                    <p>Read an industry article, listen to a podcast, or watch an educational video.</p>
                </div>
            </div>
            
            <div class="routine-step">
                <div class="step-number">5</div>
                <div class="step-content">
                    <h3>Focus (5 minutes)</h3>
                    <p>Complete one small but meaningful task to build momentum for the rest of your day.</p>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h2>Track Your Progress</h2>
            
            <div class="tracker-container">
                <div class="step-tracker">
                    <div class="tracker-item" id="step-1">
                        <div>
                            <strong>Hydrate</strong>
                            <div class="time">5 minutes</div>
                        </div>
                        <button data-step="1">Mark Complete</button>
                    </div>
                    
                    <div class="tracker-item" id="step-2">
                        <div>
                            <strong>Move</strong>
                            <div class="time">10-15 minutes</div>
                        </div>
                        <button data-step="2">Mark Complete</button>
                    </div>
                    
                    <div class="tracker-item" id="step-3">
                        <div>
                            <strong>Plan</strong>
                            <div class="time">5 minutes</div>
                        </div>
                        <button data-step="3">Mark Complete</button>
                    </div>
                    
                    <div class="tracker-item" id="step-4">
                        <div>
                            <strong>Learn</strong>
                            <div class="time">10 minutes</div>
                        </div>
                        <button data-step="4">Mark Complete</button>
                    </div>
                    
                    <div class="tracker-item" id="step-5">
                        <div>
                            <strong>Focus</strong>
                            <div class="time">5 minutes</div>
                        </div>
                        <button data-step="5">Mark Complete</button>
                    </div>
                </div>
                
                <div class="progress-container">
                    <div class="progress-header">
                        <span>Today's Progress</span>
                        <span id="progress-percent">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" id="progress-bar"></div>
                    </div>
                    
                    <div class="stats">
                        <div class="stat-box">
                            <div class="stat-value" id="completed-count">0</div>
                            <div class="stat-label">Completed Today</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value" id="streak-count">0</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-value" id="total-count">0</div>
                            <div class="stat-label">Total Completed</div>
                        </div>
                    </div>
                    
                    <div class="completed-steps">
                        <h3>Today's Completed Steps</h3>
                        <ul class="completed-list" id="completed-list">
                            <li>No steps completed yet</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="controls">
                <button id="reset-button" class="reset-btn">Reset Today's Progress</button>
            </div>
            
            <div class="motivation" id="motivation-text">
                Start your morning routine to boost productivity!
            </div>
        </div>
    </div>

    <script>
        // Morning routine steps data
        const routineSteps = [
            { id: 1, name: "Hydrate", duration: "5 minutes" },
            { id: 2, name: "Move", duration: "10-15 minutes" },
            { id: 3, name: "Plan", duration: "5 minutes" },
            { id: 4, name: "Learn", duration: "10 minutes" },
            { id: 5, name: "Focus", duration: "5 minutes" }
        ];

        // Motivational messages
        const motivationMessages = [
            "Start your morning routine to boost productivity!",
            "Great start! Keep going!",
            "You're halfway there!",
            "Almost done! You're doing great!",
            "Amazing! You've completed your morning routine!",
            "Perfect! You're ready for a productive day!"
        ];

        // Initialize tracker state
        let trackerState = {
            completed: [],
            streak: 0,
            totalCompleted: 0,
            lastCompletedDate: null
        };

        // DOM elements
        const progressBar = document.getElementById('progress-bar');
        const progressPercent = document.getElementById('progress-percent');
        const completedCount = document.getElementById('completed-count');
        const streakCount = document.getElementById('streak-count');
        const totalCount = document.getElementById('total-count');
        const completedList = document.getElementById('completed-list');
        const motivationText = document.getElementById('motivation-text');
        const resetButton = document.getElementById('reset-button');

        // Load state from localStorage
        function loadState() {
            const savedState = localStorage.getItem('morningRoutineTracker');
            if (savedState) {
                trackerState = JSON.parse(savedState);
                
                // Check if we need to reset for a new day
                const today = new Date().toDateString();
                if (trackerState.lastCompletedDate !== today) {
                    // Check if we should maintain the streak
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    if (trackerState.lastCompletedDate === yesterday.toDateString() && 
                        trackerState.completed.length === routineSteps.length) {
                        // Maintain streak - yesterday was fully completed
                    } else if (trackerState.lastCompletedDate !== yesterday.toDateString()) {
                        // Break streak if not consecutive days
                        trackerState.streak = 0;
                    }
                    
                    // Reset completed steps for the new day
                    trackerState.completed = [];
                }
            }
            updateDisplay();
        }

        // Save state to localStorage
        function saveState() {
            trackerState.lastCompletedDate = new Date().toDateString();
            localStorage.setItem('morningRoutineTracker', JSON.stringify(trackerState));
        }

        // Toggle completion of a step
        function toggleStep(stepId) {
            const index = trackerState.completed.indexOf(stepId);
            
            if (index === -1) {
                // Add to completed
                trackerState.completed.push(stepId);
                trackerState.totalCompleted++;
                
                // Check if all steps are completed for the first time today
                if (trackerState.completed.length === routineSteps.length) {
                    // Check if this is a consecutive day
                    const today = new Date();
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    if (trackerState.lastCompletedDate === yesterday.toDateString()) {
                        trackerState.streak++;
                    } else if (trackerState.lastCompletedDate !== today.toDateString()) {
                        trackerState.streak = 1;
                    }
                }
            } else {
                // Remove from completed
                trackerState.completed.splice(index, 1);
                trackerState.totalCompleted = Math.max(0, trackerState.totalCompleted - 1);
            }
            
            saveState();
            updateDisplay();
        }

        // Reset the current day's progress
        function resetDay() {
            if (confirm("Are you sure you want to reset today's progress?")) {
                trackerState.completed = [];
                saveState();
                updateDisplay();
            }
        }

        // Update the display
        function updateDisplay() {
            // Update progress bar
            const progressPercentage = (trackerState.completed.length / routineSteps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            progressPercent.textContent = `${Math.round(progressPercentage)}%`;
            
            // Update stats
            completedCount.textContent = trackerState.completed.length;
            streakCount.textContent = trackerState.streak;
            totalCount.textContent = trackerState.totalCompleted;
            
            // Update step buttons and styling
            routineSteps.forEach(step => {
                const stepElement = document.getElementById(`step-${step.id}`);
                const button = stepElement.querySelector('button');
                const isCompleted = trackerState.completed.includes(step.id);
                
                if (isCompleted) {
                    stepElement.classList.add('completed');
                    button.textContent = 'Completed ✓';
                    button.classList.add('completed');
                } else {
                    stepElement.classList.remove('completed');
                    button.textContent = 'Mark Complete';
                    button.classList.remove('completed');
                }
            });
            
            // Update completed list
            updateCompletedList();
            
            // Update motivation text
            updateMotivationText();
        }

        // Update the completed steps list
        function updateCompletedList() {
            completedList.innerHTML = '';
            
            if (trackerState.completed.length === 0) {
                completedList.innerHTML = '<li>No steps completed yet</li>';
                return;
            }
            
            // Sort completed steps by ID to maintain order
            const sortedCompleted = [...trackerState.completed].sort((a, b) => a - b);
            
            sortedCompleted.forEach(stepId => {
                const step = routineSteps.find(s => s.id === stepId);
                const listItem = document.createElement('li');
                
                // Create a timestamp (simulated)
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                listItem.innerHTML = `
                    <span>${step.name}</span>
                    <span class="time">${timeString}</span>
                `;
                
                completedList.appendChild(listItem);
            });
        }

        // Update motivation text based on progress
        function updateMotivationText() {
            const progress = trackerState.completed.length;
            let messageIndex = 0;
            
            if (progress === 0) {
                messageIndex = 0;
            } else if (progress === 1) {
                messageIndex = 1;
            } else if (progress >= 2 && progress <= 3) {
                messageIndex = 2;
            } else if (progress === 4) {
                messageIndex = 3;
            } else if (progress === 5) {
                messageIndex = 4;
            }
            
            motivationText.textContent = motivationMessages[messageIndex];
        }

        // Initialize the application
        function init() {
            // Load state from localStorage
            loadState();
            
            // Add event listeners to step buttons
            document.querySelectorAll('.step-tracker button').forEach(button => {
                button.addEventListener('click', function() {
                    const stepId = parseInt(this.getAttribute('data-step'));
                    toggleStep(stepId);
                });
            });
            
            // Add event listener to reset button
            resetButton.addEventListener('click', resetDay);
            
            // Simulate some completed steps for demo (remove in production)
            // setTimeout(() => {
            //     toggleStep(1);
            //     setTimeout(() => toggleStep(2), 500);
            // }, 1000);
        }

        // Start the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);
    </script>
</body>
</html>
