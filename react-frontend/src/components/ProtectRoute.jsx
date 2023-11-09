import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
    // const [state, setState] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        isLoggedInUser()
    }, [])

    const isLoggedInUser = async () => {
        try {
            const data = await axios.get('http://localhost:4004/api/verify');
            console.log('isLoggedInUser:', data.data)
            // if(!data.data){
            // }
        } catch (error) {
            navigate("/")
        }
    }

    return (
        <div>{children}</div>
    )
}

export default ProtectRoute