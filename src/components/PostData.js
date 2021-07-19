import React , {useEffect , useState} from 'react'


function PostData(){
    const [datos ,setPost ] = useState([])
    useEffect(() =>{
        fetch("/api").then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => setPost(data)
        )
        
    },[])

    return(
        <div>
            <h1>{datos}</h1>
        </div>
    )
}

export default PostData;