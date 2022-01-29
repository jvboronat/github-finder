
import axios from "axios"

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


const github = axios.create({
    baseURL: GITHUB_URL,
    headers: {
        Authorization: `token ${GITHUB_TOKEN}`
    }

})
export const searchUsers = async (text) => {

    const params = new URLSearchParams({
        q:text
    })

    const response = await github.get(`/search/users?${params}`)
    return response.data.items
}     

export const getUser = async (login) => {
    try {
    
        const response = await github.get(`/users/${login}`)

        return response.data
    } catch (error) {
        console.log(error)
        
        window.location= '/notfound'
    }
}  

 


 export const getRepos = async (login) => {

    const params = new URLSearchParams({
        sort:'created',
        per_page: 10,
    })  
    
    const response = await github.get(`/users/${login}/repos?${params}`)

    if (response.status === 404) {
        //window.location = '/notfound'
        return[]
    } else {     

        return response.data;                       
    }    
} 