//define ui
let task = document.querySelector('#addtask');
let sub = document.querySelector('#submit');
let tasklist = document.querySelector('#list');
let clear = document.querySelector('#delete');
let filter = document.querySelector('#filter');

//eventlistener
sub.addEventListener('click', addTask);
tasklist.addEventListener('click', deleted);
clear.addEventListener('click',removed);
document.addEventListener('DOMContentLoaded',gettask);
filter.addEventListener('keyup',filtered);

//function define
function addTask(e) {
    if (task.value === '') {
        alert('add a task');
    }
    else {

        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task.value + ' '));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.id = 'example';
        link.style.textDecoration = 'none';


        link.appendChild(document.createTextNode('x'));
        li.appendChild(link)
        tasklist.appendChild(li).style.color='white';
        storeTaskInLocalStorage(task.value);

   
        task.value = '';
    }
    e.preventDefault();
};

function deleted(e){

    if(e.target.hasAttribute('href')){
       let ele = e.target.parentElement;
       ele.remove();

       removeFromLS(ele);
    }
    
}

function removed(e){
    tasklist.innerHTML = "" ;

    localStorage.clear();
}

function filtered(e){
   
    
    let tests = document.querySelectorAll('li');

    // tests.forEach((task) => {
    //     let item = task.firstChild.textContent;
    //     if(item.toLowerCase().indexOf(text)!=-1){
    //         task.style.display = 'block';
    //     }
    //     else{
    //         task.style.display = 'none';
    //     }
    // })
    

   
    //  let item = test.firstChild.textContent;
    //  console.log(item);
    //  console.log(test);
    tests.forEach(matched);
    

}

function matched(i){
        
        // let test = document.querySelectorAll('li');
        let text = filter.value.toLowerCase();
        let item = i.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            i.style.display = 'block';
        }
        else{
            i.style.display = 'none';
        }
    }

function storeTaskInLocalStorage(taske){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taske);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function gettask(){

    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(print);

};

function print(item){
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item + ' '));
    let link = document.createElement('a');
    link.setAttribute('href', '#');
    link.id = 'example';
    link.style.textDecoration = 'none';


    link.appendChild(document.createTextNode('x'));
    li.appendChild(link)
    tasklist.appendChild(li);
}

function removeFromLS(item){
    let tasks;
    if(localStorage.getItem('tasks')=== null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    };
    
    let li = item;

    li.removeChild(li.lastChild);
    

    tasks.forEach((task,index)=> {
        if(li.textContent.trim()=== task){
            tasks.splice(index,1);
        }
    });

    

    localStorage.setItem('tasks',JSON.stringify(tasks));
}





