import fetch from  'node-fetch'
const post =  async (url,body) => {
    let response = await fetch(`https://cantainer.herokuapp.com/${url}`,{
      method : "POST",
      headers : { "Content-Type":"application/json" },
      body : JSON.stringify(body)
    })
    response = await response.json()
    return response
}
const remove = async (url,body) => {
   let response = await fetch(`https://cantainer.herokuapp.com/${url}`,{
     method : "delete",
     headers : { "Content-Type":"application/json" },
     body : JSON.stringify(body)
   })
   response = await response.json()
   return response
}
const get = async (url) => {
  let response = await fetch(`https://cantainer.herokuapp.com/${url}`)
    response = await response.json()
    return response.data
}
const put = async (url,body) => {
  let response = await fetch(`https://cantainer.herokuapp.com/${url}`,{
    method : "put",
    headers : { "Content-Type":"application/json" },
    body : JSON.stringify(body)
  })
  response = await response.json()
  return response.data
}
export default { post,get , remove,put}
