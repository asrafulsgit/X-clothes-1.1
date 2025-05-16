const Expenses = require("../Models/expenses.model");



const addExpenses = async(req,res)=>{
    // console.log(req.body)
    const {id} = req.adminInfo;
    const {expenses} = req.body;
    try {
        const {type,amount,description} = expenses;
        const newExpenses = new Expenses({
            type,
            amount,
            description,
            createdBy : id
        })
        await newExpenses.save();
        return res.status(201).send({
            success : true,
            message : 'Added Expenses.'
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 
        success: false, 
        message: "Something broke!" 
       });
    }
}

module.exports ={
    addExpenses
}