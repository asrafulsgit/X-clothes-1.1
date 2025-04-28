


const productsPagination =async({model,query={},sort={createdAt : -1},page = 1,limit = 10})=>{
    page = Math.max(1,parseInt(page) || 1)
    limit = Math.min(50,parseInt(limit) || 10)
    const skip = (page - 1)* limit;
    const [totalDocuments,documents] = await Promise.all([
        model.countDocuments(query),
        model.find(query).sort(sort).skip(skip).limit(limit)
    ])
    const totalPage = Math.ceil(totalDocuments / limit)
    return{
        documents,
        totalPage
    }
}

module.exports = {productsPagination}