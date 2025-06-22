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
let tabs = document.querySelectorAll(".taskTabs div");
let underLine = document.getElementById("underLine");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
for(let i = 1; i<tabs.length;i++){//underLine을 제외하기위해
  tabs[i].addEventListener("click",function(event){
    filter(event);
  })
}

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
  //1. 내가 선택한 탭에 따라서
  let list=[]
  if(mode=="all"){
    list = taskList;
  }else if(mode=="ongoing" || mode=="done"){
    list = filterList;
  }
  //2. 리스트를 달리 보여준다
  //all은 taskList
  //ongoing, done은 filterList
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
                    <div class = "taskDone">${list[i].taskContent}</div>
                        <div>
                            <button onclick="toggleComplete('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
                        </div>
                    </div>`;
    } else {
      resultHTML += `<div class="task">
                    ${list[i].taskContent}
                        <div>
                            <button onclick="toggleComplete('${list[i].id}')">Check</button>
                            <button onclick="deleteTask('${list[i].id}')">Delete</button>
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

function filter(event){
  mode = event.target.id;
  filterList = [];
  if(mode == "all"){
    //전체 리스트를 보여준다
    render();
    //underLine
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight-4 +"px";
  }else if(mode == "ongoing"){
    //진행중인 아이템을 보여준다.
    //task.isComplete == false
    for(let i = 0; i<taskList.length;i++){
      if(taskList[i].isComplete==false){
        filterList.push(taskList[i]);
      }
    }
    render(filterList);
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight-4 +"px";
  }else if(mode == "done"){
    //끝나는 케이스
    //ask.isComplete == true
    for(let i = 0; i<taskList.length;i++){
      if(taskList[i].isComplete==true){
        filterList.push(taskList[i]);
      }
    }
    render(filterList);
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight-4 +"px";
  }
}