const { request } = require('express');
const express=require('express');
const author = require('../models/author');
const router=express.Router()
const Author=require('../models/author')

//all authors
router.get('/',async (req,res)=>{
    let searchOpt={}
    if(req.query.name!=null && req.query.name !=="")
    {
        searchOpt.name=new RegExp(req.query.name,'i')
    }
    try{
        const authors=await Author.find(searchOpt)
        res.render('authors/index',{authors:authors,searchOpt:req.query})
    }
    catch{
        res.redirect('/')
    }
})

//new authors
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author()})
})

//create new
router.post('/',async (req,res)=>{
    const author=new Author({
        name:req.body.name
    })
    try{
        const newAuthor= await author.save()
        res.redirect(`authors`)
    }
    catch{
        res.render('authors/new',{
            author:author,
            errorMessage:'errorr'
        })
    }
})

module.exports=router