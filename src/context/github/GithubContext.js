import { createDevServerConfigProviderProxy } from "@craco/craco"
import { createContext, useReducer } from "react"
import githubReducer from "./GithubReducer"


const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer,initialState)



     const searchUsers = async (text) => {

        setLoding()

        const params = new URLSearchParams({
            q:text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`
        , {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        }
        )

        const {items} = await response.json()

       dispatch({
           type: 'GET_USERS'
           , payload: items
       })
        
    }     

    const getUser = async (login) => {

        setLoding()

        const response = await fetch(`${GITHUB_URL}/users/${login}`
        , {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        }
        )

        if (response.status === 404) {
            window.location = '/notfound'
        } else {

            const data = await response.json()

            //const repos = await getRepos(login)

            //console.log('repos in Context', repos)
            dispatch({
                type: 'GET_USER'
                , payload: data
                
            })            
        }        
    }  
    
    const getRepos = async (login) => {

        setLoding()



        const response = await fetch(`${GITHUB_URL}/users/${login}/repos`
        , {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        }
        )

        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            
            const data = await response.json()
 
            dispatch({
                type: 'GET_REPOS'
                , payload: data,
            })                     
            
        }        
    }      

    const setLoding = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,        
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos
    }}>
        {children}

    </GithubContext.Provider>   
    

}

export default GithubContext