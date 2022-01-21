import {useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'


function User() {

    const {getUser, user} = useContext(GithubContext)
    const params = useParams()

    useEffect(() => {
        getUser(params.login)
    }, [])

    
    
    return (
        <div>
            {user.avatar_url}
        </div>
    )
}

export default User
