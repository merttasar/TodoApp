let gorevList = [];
if (localStorage.getItem("gorevList") !== null){
    gorevList= JSON.parse(localStorage.getItem("gorevList"));
}

const cardList = document.querySelector("#cardList");
const addBtn = document.querySelector("#addBtn");
const headInp = document.querySelector("#headInp"); 
const clearBtn = document.querySelector("#clearBtn"); 
const deleteBtn = document.querySelector("#deleteBtn"); 
const searchInp = document.querySelector("#searchInp");
const  checkInp = document.querySelector("#checkInp");

let changeMod = false;
let changeId = 0;

function gorevListLast() { for (let i = 0; i < gorevList.length; i++) {
        let gorev = `
            <div class="input-group  mb-2">
                <div class="input-group-text">
                  <input id="checkInp${gorevList[i].id}" onclick="checkInp1(${gorevList[i].id})" class="form-check-input mt-0 " type="checkbox"  aria-label="Checkbox for following text input">
                </div>
                <label id="checkLabel${gorevList[i].id}" type="text" class="form-control" aria-label="Text input with checkbox" > ${gorevList[i].gorevAdi} </label>
                <button type="button" onclick="updateGorev(${gorevList[i].id})" class="btn btn-primary">Düzenle</button>
                <button id="deleteBtn" type="button" onclick="deleteGorev(${gorevList[i].id})" class="btn btn-danger">Sil</button>
            </div>
        `
        cardList.insertAdjacentHTML("beforeend",gorev);
    }
}

gorevListLast();

clearBtn.addEventListener("click",function(){
    let clearConfirm=confirm("Tümünü silmek istediğinize emin misin?");
    if(clearConfirm==true){ 
        cardList.innerHTML="";
        localStorage.setItem("gorevList", JSON.stringify(gorevList));
    };
})

addBtn.addEventListener("click",function(){
    if (changeMod==true) {
        for (let i = 0; i < gorevList.length; i++) {
            if (changeId == gorevList[i].id) {
                gorevList[i].gorevAdi = headInp.value;
            }
        }  
        cardList.innerHTML="";
        gorevListLast();
        headInp.value="";
        changeMod=false;
        changeId=0;
        changeText();
        localStorage.setItem("gorevList", JSON.stringify(gorevList));
    }else{
    let lastId;
    for (let i = 0; i < gorevList.length; i++) {
        lastId = i+1;
    }
    cardList.innerHTML="";
    let gorev1 = headInp.value;
    let nextGorev = { "id": lastId, "gorevAdi": gorev1 }
    gorevList.push(nextGorev);
    headInp.value="";
    gorevListLast();
    localStorage.setItem("gorevList", JSON.stringify(gorevList));
    }
})



function updateGorev(id){
    changeMod = true;
    changeId = id;
    for (let i = 0; i < gorevList.length; i++) {
        if (id == gorevList[i].id) {
            headInp.value = gorevList[i].gorevAdi;
            headInp.focus();
        }
    }
    changeText();
}

function changeText(){
    if (changeMod==true) {
        addBtn.textContent="Düzenle";
    }else{
        addBtn.textContent="Ekle";
    }
}
function deleteGorev(id){
    let deleteConfirm = confirm("Silmek istediğinize emin misiniz?");
    if (deleteConfirm == true) {
        for (let i = 0; i < gorevList.length; i++) {
            if (id == gorevList[i].id) {
                gorevList.splice(gorevList[i],1);
                localStorage.setItem("gorevList", JSON.stringify(gorevList));
            }
        }
    }
    cardList.innerHTML="";
    gorevListLast();
}

function checkInp1(id){
    if(document.querySelector("#checkInp"+id).checked == true){
        document.querySelector("#checkLabel"+id).style = "text-decoration:line-through";
    }else{
        document.querySelector("#checkLabel"+id).style = "text-decoration:none";
    }
}
