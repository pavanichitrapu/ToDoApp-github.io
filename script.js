var input=document.getElementById('todoInput');
var button=document.getElementById('add-item');
var todoList=document.getElementById('todo-list');
var todoInsideWrapper=document.getElementById('todoInside-wrapper');
var btnLogin = document.getElementById('login');
var btnSignUp=document.getElementById('signup');
var loginWrapper=document.getElementById('login-wrapper');
var logoutUserDiv=document.getElementById('logout-user');
var logout=document.getElementById("logout");
logout.addEventListener("click",function(){
    
  if(localStorage.getItem('loginStatus')==="true"){
  todoInsideWrapper.style.display='none';
  logoutUserDiv.style.display='none';
  delIcon.style.display='none'; 
  checkbox.style.display='none';
  loginWrapper.style.display='flex';
 }
  loginStatus='';
  loginStatus='false';
//window.location.assign("/logout.html");
});



function initializeTODOList() {
        //call to backend
 
    var http=new XMLHttpRequest();
    http.open('GET','https://5ee9fc4aca5957001602a6b7.mockapi.io/todo',true);
    http.send();
    http.onreadystatechange=function(){
      if(http.readyState===4){
        var response=JSON.parse(http.responseText);
        for (var i = 0; i < response.length; i++) {
          todoList.appendChild(createToDoCard(response[i].id, response[i].message));
        }
      }
  };

  if(localStorage.getItem('loginStatus')==="false"||
    localStorage.getItem('loginStatus')===null){
      todoInsideWrapper.style.display='none';
      logoutUserDiv.style.display='none';
     
    }
    else {
      //btnLogin.style.display = 'none';
      //btnSignUp.style.display='none';
      loginWrapper.style.display='none';
    }
}
  initializeTODOList();
  
 
//create a todo item
function createToDoCard(id,enteredText){
    var todoCard=document.createElement('div');
    todoCard.classList.add('list-item');
    //todoCard.id=new Date().getTime();
    todoCard.id = id;

    var checkbox=document.createElement('div');
    checkbox.classList.add('tick');
    var tick=document.createElement('i');
    tick.classList.add("fas","fa-check-double");

    if(localStorage.getItem('loginStatus')==="false"||
    localStorage.getItem('loginStatus')===null){
      //tick.classList.add('hidden-tick-icon');
      //checkbox.classList.add('hidden-tick-styles');
      checkbox.classList.add('hidden-tick-icon');
    }
    
    
    checkbox.appendChild(tick);
    todoCard.appendChild(checkbox);

    var text=document.createElement('p');
    text.innerText=enteredText;
    todoCard.appendChild(text);

    var del=document.createElement('div');
    del.classList.add('delete');
    var delIcon=document.createElement('i');
    delIcon.classList.add("fas","fa-trash-alt");
    //To hide the delete icon before login
    if(localStorage.getItem('loginStatus')==="false"||
    localStorage.getItem('loginStatus')===null){
      delIcon.classList.add('hidden-del-icon');
    }

    delIcon.addEventListener('click', function(){
    var selectedCard=document.getElementById(todoCard.id);
    var http=new XMLHttpRequest();
    http.open('DELETE','https://5ee9fc4aca5957001602a6b7.mockapi.io/todo/'+todoCard.id,true);
    http.send();
    http.onreadystatechange=function(){
      if(http.readyState===4){
        selectedCard.remove();
      }
    };
    });
    del.appendChild(delIcon);
    todoCard.appendChild(del);

    


    checkbox.addEventListener('click',function(){
        var checkedItem=document.getElementById(todoCard.id);
        text.style.setProperty('text-decoration', 'line-through');
        text.style.color="black";
        text.style.fontSize="24px";
        checkbox.style.color="red";
        checkbox.style.fontSize="22px";
        del.style.color="red";
        del.style.fontSize="22px";
    
    });
    
    
return todoCard;  
}


button.addEventListener('click',function(e){
            if(input.value!==null && input.value!=="" && input.value!== undefined){

                var todoCard = createToDoCard(
                    "todo" + new Date().getTime(),
                    input.value
                  );
                  todoList.appendChild(todoCard);
          // assign the object keys with values
                  var todoData = {
                    id: todoCard.id,
                    message: input.value,
                  };
                  console.log(todoData);
                  input.value = "";
            }
        else{
            alert("Please enter a valid ToDo Item");
        }
   
});

input.addEventListener("keyup",function(e){
    if(e.which===13){
        if(input.value!==null && input.value!=="" && input.value!== undefined){
            //backend obj creation
            
            // assign the object keys with values
                    var todoData = {
                     // id: todoCard.id,//bcz the id was created automatically by the backend
                      message: input.value,
                    };
                    console.log(todoData);

                    //SEND A CALL TO THE BACKEND
                    //create http object or instance
                    var http=new XMLHttpRequest();
                    //configuring the req obj usingopen(http method,api endpoint,asych status)
                    http.open('POST','https://5ee9fc4aca5957001602a6b7.mockapi.io/todo',true);
                    //handling req and set req header AND BACKEND NEEDS TO KNOW THE WHICH TYPE OF DATA
                    http.setRequestHeader("Content-type","application/json;charset=UTF-8");
                    //calling send method
                    http.send(JSON.stringify(todoData));

                    //HANDLING RESPONSE
                    http.onreadystatechange=function(){
                      if(http.readyState===4){
                        var response=JSON.parse(http.responseText);
                        var todoCard=createToDoCard(response.id,response.message);
                        todoList.appendChild(todoCard);
                        
                      }
                    }
                    input.value = "";
                   }
        else{
            alert("Please enter a valid ToDo Item");
        }
    }
});


