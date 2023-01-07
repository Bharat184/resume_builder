
var download = document.querySelector('#download');
if(download)
{
    download.addEventListener("click", function () {   
        download.style.display="none";
        window.print();
        download.style.display="block";
         
     
     });
}

//save as cookie send post req to server
function saveascookie(data,flag=false)
{
    let a=new URL(window.location.href);
    let url=a.protocol+"//"+a.hostname+":"+a.port+"/save";
    fetch(url,{
        method:"POST",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data),
    }).then((res)=>res.json())
    .then((data)=>{
        if(data)
        {
            if(!flag)
            {
                window.location.href="/";
            }
        }
    });
}

//function to check whether date is valid or not
function checkDate(d)
{
    let regExp=/[^-^0-9]/g;
    if(regExp.test(d))
    {
        return false;
    }
    d=d.split('-');
    if(d.length!=3)
    {
        return false;
    }
    if(d[0]<1 || d[1]<1 || d[2].length<4)
    {
        return false;
    }
    if(d[0]>31 || d[1]>12 || d[2].length>4)
    {
        return false;
    }
    return true;
}

//add skill data
function addskill()
{
    let target=document.getElementById('skill');
    let html=document.querySelector(".added-skills").innerHTML; 
    html+=`<div><p class='skill'>${target.value}</p><i onclick="saveSkill(this)"></i></div>`;
    document.querySelector(".added-skills").innerHTML=html;
    target.value='';

}

//save skill
function saveSkill(target=false)
{
    if(target)
    {
        target.parentElement.remove();
    }
    let e=document.querySelectorAll(".skill"); 
    const arr=[];
    Array.from(e).forEach(e=>{
        arr.push(e.innerText);
    });
    let data={key:"skill",value:arr};
    saveascookie(data,target);
}

//add more experience/education
function addAnother(no,loc)
{
    window.location.href=`/${loc}?no=${+no+1}`;

}

//save the data from resume form as cookie.
function saveEducation(no,nme)
{
    let i=1,arr=[],flag=true,dateFlag=true;
    while(i<=no)
    {
        let e=document.querySelectorAll(`.input${i}`);
        console.log(e)
        let obj={};
        Array.from(e).forEach((e)=>{
            if(e.value=='')
            {
               flag=false;
               e.style.border="2px solid red";                
            }
            else
            {
                e.style.border="none";
            }
            if(e.name=='start_date'|| e.name=='end_date')
            {
                if(!checkDate(e.value))
                {
                    e.style.border="2px solid red";
                    dateFlag=false;
                }
                else
                {
                    e.style.border="none";
                }
            }
            obj[e.name]=e.value;
        });
        i++;
        arr.push(obj);
    }
    if(!flag)
    {
        alert("Input can't be empty!");
    }
    else if(!dateFlag)
    {
        alert("Invalid Date");
    }
    else
    {
        let data={key:nme,value:arr};
        saveascookie(data);
    }
}

//image to base64url
let img=document.getElementById("img");
let statusImg=document.getElementById("status");
if(statusImg)
{
    if(localStorage.getItem('img_url')!='null')
    {
        statusImg.innerHTML=`<img src='${localStorage.getItem("img_url")}' height='40px' width='40px' alt='no image selected'>`;
    }
}
if(img)
{
    img.addEventListener('change',(e)=>{
        const file=e.target.files[0];
        let arr=['image/jpeg','image/jpg','image/png'];
        if(arr.includes(file.type))
        {
            const reader=new FileReader();
            reader.addEventListener('load',()=>{
                localStorage.setItem('img_url',reader.result);
                if(statusImg.classList[0]!='img_uploaded')
                {
                    statusImg.innerHTML=`<img src='${localStorage.getItem("img_url")}' height='40px' width='40px' >`;
                }
                
            })
            reader.readAsDataURL(file);

        }
        else
        {
            alert("INVALID FILETYPE")
        }
    })
}

let resume_profile_pic=document.getElementById("resume_profile_pic");
if(resume_profile_pic)
{
    resume_profile_pic.src=localStorage.getItem("img_url");
}
if(window.location.pathname=='/clear-resume')
{
    localStorage.removeItem("img_url");
}