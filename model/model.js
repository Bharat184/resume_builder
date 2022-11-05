
module.exports=class Resume{
    constructor(id)
    {
        this.id=id;
    }
    addSkill(res,key,value)
    {
        res.cookie(key,value);
    }
}