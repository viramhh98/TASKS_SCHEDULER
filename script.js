function add(quadrantId) {
    console.log("Clicked quadrant ID:", quadrantId);
    var userInput = prompt("Please enter the task for " + quadrantId + ":", "viram shah");
    if (userInput !== null) {
        // User entered a value
        console.log("User entered: " + userInput);
        
        // Create a new task element
        var taskElement = document.createElement('div');
        taskElement.textContent = userInput;
        taskElement.classList.add('task'); // Add a class for styling

        // Get the tasks container element inside the quadrant
        var tasksContainer = document.querySelector("#" + quadrantId + " .tasks");

        // Insert the task element into the tasks container
        tasksContainer.appendChild(taskElement);
        saveTasksToLocalStorage();



        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button'); // Add a class for styling
        // document.getElementsByClassName("delete-button").innerText="X";

        // Add event listener to the delete button
        deleteButton.addEventListener('click', function() {
            // Prevent the click event from propagating to the parent elements
            event.stopPropagation();
            // Remove the task element when the button is clicked
            taskElement.remove();
            saveTasksToLocalStorage();

        });

        // Append the delete button to the task element
        taskElement.appendChild(deleteButton);  
    } else {
        // User clicked Cancel
        console.log("User clicked Cancel");
    }
}

function saveTasksToLocalStorage() {
    localStorage.clear();    
    var taskData = {};

    // Get all the quadrants
    var quadrants = document.querySelectorAll('.quadrant');

    // Iterate through each quadrant
    quadrants.forEach(function(quadrant) {
        // Get the quadrant ID
        var quadrantId = quadrant.id;

        // Get the tasks container inside the quadrant
        var tasksContainer = quadrant.querySelector('.tasks');

        // Get all the task elements inside the tasks container
        var tasks = tasksContainer.querySelectorAll('.task');

        // Store the tasks' inner text in the taskData object
        taskData[quadrantId] = [];

        tasks.forEach(function(task) {
            taskData[quadrantId].push(task.innerText);
        });
    });

    // Convert task data to a JSON string and store it in localStorage
    localStorage.setItem('taskData', JSON.stringify(taskData));
}

// Call saveTasksToLocalStorage whenever you want to save the tasks

function removeXFromString(array) {
    // Iterate over each element in the array
    for (var i = 0; i < array.length; i++) {
        // Replace "\nX" with an empty string in the current element
        array[i] = array[i].replace(/\nX/g, '');
    }
}

let impandurg=[]
let notimpandurg=[]
let impandnoturg=[]
let notimpandnoturg=[]
function loadTasksFromLocalStorage() {
    // Get the task data from localStorage
    var taskDataString = localStorage.getItem('taskData');

    // Check if there's any data stored
    if (taskDataString) {
        // Parse the JSON string to get the task data object
        var taskData = JSON.parse(taskDataString);
        console.log(taskData)
        // Iterate through each quadrant in the task data

        impandurg = taskData["urgent-important"] || [];
        impandnoturg = taskData["not-urgent-important"] || [];
        notimpandurg = taskData["urgent-not-important"] || [];
        notimpandnoturg = taskData["not-urgent-not-important"] || [];
        removeXFromString(impandurg);
        removeXFromString(impandnoturg);
        removeXFromString(notimpandurg);
        removeXFromString(notimpandnoturg);
        taskData["urgent-important"]=impandurg||[];
        taskData["not-urgent-important"]=impandnoturg||[];
        taskData["urgent-not-important"]=notimpandurg||[];
        taskData["not-urgent-not-important"]=notimpandnoturg ||[];

        for (var quadrantId in taskData) {
            if (taskData.hasOwnProperty(quadrantId)) {
                // Get the tasks container inside the corresponding quadrant
                var tasksContainer = document.querySelector('#' + quadrantId + ' .tasks');



                // Iterate through each task in the quadrant
                taskData[quadrantId].forEach(function(taskText) {
                    // Create a new task element
                    var taskElement = document.createElement('div');
                    taskElement.textContent = taskText;
                    taskElement.classList.add('task'); // Add a class for styling

                    // Create a delete button for the task
                    var deleteButton = document.createElement('button');
                    deleteButton.textContent = 'X';
                    deleteButton.classList.add('delete-button'); // Add a class for styling

                    // Add event listener to the delete button
                    deleteButton.addEventListener('click', function(event) {
                        event.stopPropagation();
                        // Remove the task element when the button is clicked
                        taskElement.remove();
                        // Update localStorage after removing the task
                        saveTasksToLocalStorage();
                    });

                    // Append the delete button to the task element
                    taskElement.appendChild(deleteButton);

                    // Append the task element to the tasks container
                    tasksContainer.appendChild(taskElement);
                });
            }
        }
    }
}

// Call loadTasksFromLocalStorage when the website loads
window.addEventListener('load', loadTasksFromLocalStorage);
