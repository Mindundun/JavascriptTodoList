//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
//DELETE버튼을 누르면 할일이 삭제된다.
//CHECK버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. check 버튼을 클릭하는 순간 ture/false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false면 안끝난걸로 간주하고 그대로
//진행중 완료 탭을 누르면 언더바가 이동한다
//완료 탭은 완료된 아이템만 진행중 탭은 진행중인 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `<div class="task">
                    <div class = "taskDone">${taskList[i].taskContent}</div>
                        <div>
                            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                        </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task">
                    ${taskList[i].taskContent}
                        <div>
                            <button onclick="toggleComplete('${taskList[i].id}')">Check</button>
                            <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                        </div>
                    </div>`;
    }
  }

  document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i,1);
      break;
    }
  }
  render();
}