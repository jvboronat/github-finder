import axios from 'axios';
import GithubContext from '../context/github/GithubContext'
import {useEffect, useContext, useState} from  'react'


function useFetchAxios(url, options, action) {
    
    const {dispatch} = useContext(GithubContext)
    const [notfound, setNotfound] = useState(false);

    const GITHUB_URL = process.env.REACT_APP_GITHUB_URL


    const github = axios.create({
        baseURL: GITHUB_URL,
        options
    
    })

    useEffect(() => {
        const getData = async () => {
            try {

                dispatch({
                    type: 'SET_LOADING'
                })

                const response = await github.get(url)   
  
                setNotfound(false)

                dispatch({
                    type: action
                    , payload: response.data
                })  

            } catch (error) {

                setNotfound(true)

                console.log('error',error)
         
            }
        }

        getData()
        // eslint-disable-next-line 
    },[])
    
    return notfound
}

export default useFetchAxios;
