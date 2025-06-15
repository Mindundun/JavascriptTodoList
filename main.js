//유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
//DELETE버튼을 누르면 할일이 삭제된다.
//CHECK버튼을 누르면 할일이 끝나면서 밑줄이 간다
//진행중 완료 탭을 누르면 언더바가 이동한다
//완료 탭은 완료된 아이템만 진행중 탭은 진행중인 아이템만
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  let task = {
    taskContent:taskInput.value,
    isComplete:false
  }
  taskList.push(task);
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `<div class="task">
                    ${taskList[i]}
                        <div>
                            <button>Check</button>
                            <button>Delete</button>
                        </div>
                    </div>`;
  }

  document.getElementById("taskBoard").innerHTML = resultHTML;
}
