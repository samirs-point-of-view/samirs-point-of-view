// Morning Routine Tracker - Admin Dashboard Component
class MorningRoutineTracker {
    constructor() {
        this.routineSteps = [
            { id: 1, name: "Hydrate", duration: "5 minutes" },
            { id: 2, name: "Move", duration: "10-15 minutes" },
            { id: 3, name: "Plan", duration: "5 minutes" },
            { id: 4, name: "Learn", duration: "10 minutes" },
            { id: 5, name: "Focus", duration: "5 minutes" }
        ];

        this.motivationMessages = [
            "Start your morning routine to boost productivity!",
            "Great start! Keep going!",
            "You're halfway there!",
            "Almost done! You're doing great!",
            "Amazing! You've completed your morning routine!",
            "Perfect! You're ready for a productive day!"
        ];

        this.state = {
            completed: [],
            streak: 0,
            totalCompleted: 0,
            lastCompletedDate: null
        };

        this.init();
    }

    init() {
        this.loadState();
        this.setupEventListeners();
        this.render();
        console.log('Morning Routine Tracker initialized');
    }

    loadState() {
        try {
            const savedState = localStorage.getItem('morningRoutineTracker');
            if (savedState) {
                this.state = JSON.parse(savedState);
                
                const today = this.getTodayString();
                if (this.state.lastCompletedDate !== today) {
                    this.handleNewDay();
                }
            }
        } catch (error) {
            console.error('Error loading state:', error);
            this.state = { completed: [], streak: 0, totalCompleted: 0, lastCompletedDate: null };
        }
    }

    saveState() {
        try {
            this.state.lastCompletedDate = this.getTodayString();
            localStorage.setItem('morningRoutineTracker', JSON.stringify(this.state));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    getTodayString() {
        return new Date().toDateString();
    }

    getYesterdayString() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toDateString();
    }

    handleNewDay() {
        const yesterday = this.getYesterdayString();
        
        if (this.state.lastCompletedDate === yesterday && 
            this.state.completed.length === this.routineSteps.length) {
            // Maintain streak
        } else if (this.state.lastCompletedDate !== yesterday) {
            this.state.streak = 0;
        }
        
        this.state.completed = [];
    }

    toggleStep(stepId) {
        const index = this.state.completed.indexOf(stepId);
        
        if (index === -1) {
            this.state.completed.push(stepId);
            this.state.totalCompleted++;
            
            if (this.state.completed.length === this.routineSteps.length) {
                this.updateStreak();
            }
        } else {
            this.state.completed.splice(index, 1);
            this.state.totalCompleted = Math.max(0, this.state.totalCompleted - 1);
        }
        
        this.saveState();
        this.render();
    }

    updateStreak() {
        const yesterday = this.getYesterdayString();
        const today = this.getTodayString();
        
        if (this.state.lastCompletedDate === yesterday) {
            this.state.streak++;
        } else if (this.state.lastCompletedDate !== today) {
            this.state.streak = 1;
        }
    }

    resetDay() {
        if (confirm("Are you sure you want to reset today's progress?")) {
            this.state.completed = [];
            this.saveState();
            this.render();
        }
    }

    render() {
        this.renderProgress();
        this.renderStats();
        this.renderSteps();
        this.renderCompletedList();
        this.renderMotivation();
    }

    renderProgress() {
        const progressPercentage = (this.state.completed.length / this.routineSteps.length) * 100;
        const progressBar = document.getElementById('progress-bar');
        const progressPercent = document.getElementById('progress-percent');
        
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        if (progressPercent) {
            progressPercent.textContent = `${Math.round(progressPercentage)}%`;
        }
    }

    renderStats() {
        const completedCount = document.getElementById('completed-count');
        const streakCount = document.getElementById('streak-count');
        const totalCount = document.getElementById('total-count');
        
        if (completedCount) completedCount.textContent = this.state.completed.length;
        if (streakCount) streakCount.textContent = this.state.streak;
        if (totalCount) totalCount.textContent = this.state.totalCompleted;
    }

    renderSteps() {
        const trackerContainer = document.getElementById('step-tracker');
        if (!trackerContainer) {
            console.error('Step tracker container not found');
            return;
        }

        trackerContainer.innerHTML = this.routineSteps.map(step => {
            const isCompleted = this.state.completed.includes(step.id);
            
            return `
                <div class="tracker-item ${isCompleted ? 'completed' : ''}" id="step-${step.id}">
                    <div>
                        <strong>${step.name}</strong>
                        <div class="time">${step.duration}</div>
                    </div>
                    <button class="${isCompleted ? 'completed' : ''}" data-step="${step.id}">
                        ${isCompleted ? 'Completed ✓' : 'Mark Complete'}
                    </button>
                </div>
            `;
        }).join('');
    }

    renderCompletedList() {
        const completedList = document.getElementById('completed-list');
        if (!completedList) return;

        if (this.state.completed.length === 0) {
            completedList.innerHTML = '<li>No steps completed yet</li>';
            return;
        }

        const sortedCompleted = [...this.state.completed].sort((a, b) => a - b);
        completedList.innerHTML = sortedCompleted.map(stepId => {
            const step = this.routineSteps.find(s => s.id === stepId);
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            return `
                <li>
                    <span>${step.name}</span>
                    <span class="time">${timeString}</span>
                </li>
            `;
        }).join('');
    }

    renderMotivation() {
        const motivationText = document.getElementById('motivation-text');
        if (!motivationText) return;

        const progress = this.state.completed.length;
        let messageIndex = 0;
        
        if (progress === 0) messageIndex = 0;
        else if (progress === 1) messageIndex = 1;
        else if (progress >= 2 && progress <= 3) messageIndex = 2;
        else if (progress === 4) messageIndex = 3;
        else if (progress === 5) messageIndex = 4;

        motivationText.textContent = this.motivationMessages[messageIndex];
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-step]')) {
                const stepId = parseInt(e.target.getAttribute('data-step'));
                this.toggleStep(stepId);
            }
            
            if (e.target.id === 'reset-button') {
                this.resetDay();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.morningRoutineTracker = new MorningRoutineTracker();
});
