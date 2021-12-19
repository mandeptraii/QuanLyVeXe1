import React from 'react'
import Body from './Body'

class Home extends React.Component{
    render(){
        return(
            <>
                <Body/>
            </>
        )
    }
}

export default Home

// import React, { useState } from 'react'
// import Body from './Body'

// export default function Home(){
//     const [state, setState] = useState({
//         "name":""
//     })
//     // constructor(){
//     //     super()
//     //     this.state = {"name": ""}
//     // }

//     const changeName=(event) => {
//         setState({"name": event.target.value})
//     }

//     // render(){
//         return(
//             <div>
//                 <input type="text" value={state.name} onChange={changeName} />
//                 <h1>Hello {state.name}</h1>
//             </div>
//             // <>
//             //     <Body/>
//             // </>
//         )
//     // }
// }

// // export default Home