

module.exports=theFun=>(reqs,resp,next)=>{
    Promise.resolve(theFun(reqs,resp,next)).catch(next);
}