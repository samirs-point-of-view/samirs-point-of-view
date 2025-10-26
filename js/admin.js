<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Morning Routine Tracker</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #3498db;
        }
        .routine-container {
            background: white;
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        .routine-step {
            margin-bottom: 15px;
            padding: 15px;
            border-left: 4px solid #3498db;
            background-color: #f8f9fa;
        }
        .tracker {
            background: white;
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .step-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: #f8f9fa;
        }
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        button:hover {
            background-color: #2980b9;
        }
        button.completed {
            background-color: #27ae60;
        }
        .progress-bar {
            height: 20px;
            background-color: #ecf0f1;
            border-radius: 10px;
            margin: 20px 0;
            overflow: hidden;
        }
        .progress {
            height: 100%;
            background-color: #3498db;
            width: 0%;
            transition: width 0.5s;
        }
        .stats {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .stat-box {
            text-align: center;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 5px;
            flex: 1;
            margin: 0 5px;
        }
        code {
            background-color: #f1f1f1;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
    </style>
</head>
<body>
    <h1>Creating a Simple Morning Routine for Productivity</h1>
    
    <div class="routine-container">
        <h2>The 5-Step Morning Routine</h2>
        
        <div class="routine-step">
            <h3>1. Hydrate (5 minutes)</h3>
            <p>Start your day with a glass of water to rehydrate after sleep. Add lemon for an extra boost.</p>
        </div>
        
        <div class="routine-step">
            <h3>2. Move (10-15 minutes)</h3>
            <p>Engage in light physical activity like stretching, yoga, or a brisk walk to wake up your body.</p>
        </div>
        
        <div class="routine-step">
            <h3>3. Plan (5 minutes)</h3>
            <p>Review your calendar and identify your top 3 priorities for the day.</p>
        </div>
        
        <div class="routine-step">
            <h3>4. Learn (10 minutes)</h3>
            <p>Read an industry article, listen to a podcast, or watch an educational video.</p>
        </div>
        
        <div class="routine-step">
            <h3>5. Focus (5 minutes)</h3>
            <p>Complete one small but meaningful task to build momentum for the rest of your day.</p>
        </div>
    </div>
    
    <div class="tracker">
        <h2>Track Your Routine</h2>
        <p>Use this simple tracker to monitor your consistency:</p>
        
        <div id="routine-tracker">
            <!-- Steps will be added here by JavaScript -->
        </div>
        
        <div class="progress-bar">
            <div class="progress" id="progress-bar"></div>
        </div>
        
        <div class="stats">
            <div class="stat-box">
                <h3 id="completed-count">0</h3>
                <p>Completed Today</p>
            </div>
            <div class="stat-box">
                <h3 id="streak-count">0</h3>
                <p>Day Streak</p>
            </div>
            <div class="stat-box">
                <h3 id="total-count">0</h3>
                <p>Total Completed</p>
            </div>
        </div>
        
        <button id="reset-button">Reset Day</button>
    </div>

    <script>
        // Morning routine steps
        const routineSteps = [
            { id: 1, name: "Hydrate", duration: "5 minutes" },
            { id: 2, name: "Move", duration: "10-15 minutes" },
            { id: 3, name: "Plan", duration: "5 minutes" },
            { id: 4, name: "Learn", duration: "10 minutes" },
            { id: 5, name: "Focus", duration: "5 minutes" }
        ];

        // Initialize tracker state
        let trackerState = {
            completed: [],
            streak: 0,
            totalCompleted: 0
        };

        // Load state from localStorage if available
        function loadState() {
            const savedState = localStorage.getItem('morningRoutineTracker');
            if (savedState) {
                trackerState = JSON.parse(savedState);
                
                // Check if we need to reset for a new day
                const lastCompletedDate = localStorage.getItem('lastCompletedDate');
                const today = new Date().toDateString();
                
                if (lastCompletedDate !== today) {
                    // New day, reset completed steps but keep streak if yesterday was completed
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    if (lastCompletedDate === yesterday.toDateString() && 
                        trackerState.completed.length === routineSteps.length) {
                        // Maintain streak
                    } else if (lastCompletedDate !== yesterday.toDateString()) {
                        // Break streak
                        trackerState.streak = 0;
                    }
                    
                    trackerState.completed = [];
                }
            }
            updateDisplay();
        }

        // Save state to localStorage
        function saveState() {
            localStorage.setItem('morningRoutineTracker', JSON.stringify(trackerState));
            localStorage.setItem('lastCompletedDate', new Date().toDateString());
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
                    const lastCompletedDate = localStorage.getItem('lastCompletedDate');
                    const today = new Date().toDateString();
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    if (lastCompletedDate === yesterday.toDateString()) {
                        trackerState.streak++;
                    } else if (lastCompletedDate !== today) {
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
            trackerState.completed = [];
            saveState();
            updateDisplay();
        }

        // Update the display
        function updateDisplay() {
            const trackerElement = document.getElementById('routine-tracker');
            const progressBar = document.getElementById('progress-bar');
            const completedCount = document.getElementById('completed-count');
            const streakCount = document.getElementById('streak-count');
            const totalCount = document.getElementById('total-count');
            
            // Clear existing steps
            trackerElement.innerHTML = '';
            
            // Add each step
            routineSteps.forEach(step => {
                const stepElement = document.createElement('div');
                stepElement.className = 'step-item';
                
                const isCompleted = trackerState.completed.includes(step.id);
                
                stepElement.innerHTML = `
                    <div>
                        <strong>${step.name}</strong> - ${step.duration}
                    </div>
                    <button class="${isCompleted ? 'completed' : ''}" data-id="${step.id}">
                        ${isCompleted ? '✓ Completed' : 'Mark Complete'}
                    </button>
                `;
                
                trackerElement.appendChild(stepElement);
            });
            
            // Update progress bar
            const progressPercentage = (trackerState.completed.length / routineSteps.length) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            
            // Update stats
            completedCount.textContent = trackerState.completed.length;
            streakCount.textContent = trackerState.streak;
            totalCount.textContent = trackerState.totalCompleted;
            
            // Add event listeners to buttons
            document.querySelectorAll('#routine-tracker button').forEach(button => {
                button.addEventListener('click', function() {
                    const stepId = parseInt(this.getAttribute('data-id'));
                    toggleStep(stepId);
                });
            });
        }

        // Initialize the tracker
        document.addEventListener('DOMContentLoaded', function() {
            loadState();
            
            // Add event listener to reset button
            document.getElementById('reset-button').addEventListener('click', resetDay);
        });
    </script>
</body>
</html>
