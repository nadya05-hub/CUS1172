document.addEventListener('DOMContentLoaded', () => {
    
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Event listener for form submission
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const titleInput = document.getElementById('task-title');
        const prioritySelect = document.getElementById('task-priority');
        const statusRadio = document.querySelector('input[name="task-status"]:checked');

        const title = titleInput.value.trim();
        const priority = prioritySelect.value;
        const status = statusRadio.value;

        if (title === "") {
            alert("Please enter a task name.");
            return;
        }

        
        const listItem = document.createElement('li');
        
        
        listItem.className = `list-group-item d-flex justify-content-between align-items-center ${status === 'completed' ? 'completed-task' : ''}`;
        
      
        listItem.innerHTML = `
            <div class="d-flex flex-column flex-grow-1">
                <span class="task-title ${status === 'completed' ? 'strike-through' : ''}">${title}</span>
                <small class="${priority}">Priority: ${priority.replace('-', ' ')}</small>
                <small class="task-status">${status}</small>
            </div>
            
            <div class="task-controls">
                <button class="btn btn-sm btn-success mark-complete-btn me-2">
                    Mark Complete
                </button>

                <button class="btn btn-sm btn-danger remove-btn">
                    Remove
                </button>
            </div>
        `;

        taskList.appendChild(listItem);
        taskForm.reset();
        document.getElementById('status-pending').checked = true;
        registerTaskEvents(listItem);
    });
});

function registerTaskEvents(listItem) {

    const completeBtn = listItem.querySelector('.mark-complete-btn');
    const removeBtn = listItem.querySelector('.remove-btn');
    const taskTitle = listItem.querySelector('.task-title');

    completeBtn.addEventListener('click', () => {
      
        if (!listItem.classList.contains('completed-task')) {
            listItem.classList.add('completed-task');
            taskTitle.classList.add('strike-through'); 
            listItem.querySelector('.task-status').textContent = 'completed'; 

            
            completeBtn.remove();
            const badge = document.createElement('span');
            badge.className = 'badge bg-success me-2';
            badge.textContent = 'Completed';
            listItem.querySelector('.task-controls').prepend(badge);

        }
    });

    // Remove Task Event
    removeBtn.addEventListener('click', () => {
        listItem.remove(); 
    });
}
