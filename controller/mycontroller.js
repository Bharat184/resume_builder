let model=require('../model/model');

//home page 
function homepage(req,res,next)
{
   let keys=['skill','education','experience','personal','summary','achievement'];
   let completedSection=Object.keys(req.cookies).map((e)=>{if(keys.includes(e) && req.cookies[e]!=undefined && req.cookies[e].length>0){ return e;}});
    console.log(completedSection)
    return res.render('home',{title:"Resume",link:'none',arr:completedSection});
}

//add & save skills
function skillpage(req,res,next)
{

    let data=false;
    if(req.cookies.skill!=undefined)
    {
        data=req.cookies.skill;
    }
    console.log(data);
    return res.render('home',{title:"Resume | skill",link:'skill',data,arr:[]});
}

//save data as cookie function
function savedata(req,res,next)
{
    let obj=new model(req.cookies.id);
    obj.addSkill(res,req.body.key,req.body.value);
    return res.json({status:true});
}

//render education page.
function educationpage(req,res,next)
{
    let data=false,i=1;
    if(req.cookies.education!=undefined)
    {
        i=req.cookies.education.length;
        data=req.cookies.education;
       
    }
    if(req.query.no!=undefined)
    {
        i=parseInt(req.query.no);
    }
    let num=Array(i).fill(1);
    return res.render('home',{title:"Resume | education",link:'education',data,num,arr:[]});
}

//renders experience page
function experiencepage(req,res,next)
{
    let data=false,i=1;
    if(req.cookies.experience!=undefined)
    {
        i=req.cookies.experience.length;
        data=req.cookies.experience;
    }
    if(req.query.no!=undefined)
    {
        i=parseInt(req.query.no);
    }
    let num=Array(i).fill(1);
    return res.render('home',{title:"Resume | experience",link:'experience',data,num,arr:[]});

}

function personalinfo(req,res,next)
{
    let data=false;
    if(req.cookies.personal!=undefined)
    {
        data=req.cookies.personal;
    }
    return res.render('home',{title:"Resume | personal",link:'personal',data,arr:[]});

}

function summarypage(req,res,next)
{
    let data=false;
    if(req.cookies.summary!=undefined)
    {
        data=req.cookies.summary;
    }
    return res.render('home',{title:"Resume | summary",link:'summary',data,arr:[]});
}

//build achievement page.
function achievementpage(req,res,next)
{
    let data=false;
    if(req.cookies.achievement!=undefined)
    {
        data=req.cookies.achievement;
    }
    return res.render('home',{title:"Resume | achievements",link:'achievements',data,arr:[]});

}

//build resume page.
function buildresumepage(req,res,next)
{
    let keys=['personal','skill','summary','education','experience','achievement'];
    const result=[];
    keys.forEach((e)=>{
        if( Object.keys(req.cookies).includes(e))
        {
            
            var obj=req.cookies[e];
            result.push(obj);
        }
        else
        {
           result.push(false);
        }
    })
    return res.render('resume',{title:"Resume | build",result,link:"resume-builder"});
}


//clear all cookies set 
function cleardata(req,res,next)
{
    let arr=[
        'education',
        'experience',
        'personal',
        'skill',
        'summary',
        'achievement'
      ];
      arr.forEach((e)=>{
          res.clearCookie(e);
      });
    return res.render('home',{title:"Resume",link:'none',arr:[]});
}
module.exports={cleardata,buildresumepage,homepage,skillpage,savedata,educationpage,experiencepage,personalinfo,summarypage,achievementpage};