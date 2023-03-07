export const requestUpdate=(value) =>dispatch => {
    let type ='requestUpdate'
    dispatch({ type  ,payload:value})
}
export const addUpdate=(newtask,newdescChange,assigned,lists) =>dispatch => {
    let type ='addUpdate'
    dispatch({ type  ,payload:{newtask: newtask,newdescChange:newdescChange,
        assigned:assigned,lists:lists}})
}

export const existUpdate=(updid,updtask,upddesc,updassigned,columnname,lists) =>dispatch => {
    let type ='existUpdate'
    dispatch({ type  ,payload:{updid:updid,updtask: updtask,
        upddesc:upddesc,updassigned:updassigned,columnname:columnname,lists:lists}})
}
export const getUser=() => {
    try{
       return async dispatch=>{
        const response =  await  fetch('https://jsonplaceholder.typicode.com/users')
       .then(response => response.json())
       .then(json => json)
       let type="getUser"   
       dispatch({ type  ,payload:response})   
    }
    }
    catch(error){
         console.log(error)
    }  
}
export const getTaskDetails=(value,list,columnid) =>dispatch => {
    let type ='getTaskDetails'
    dispatch({ type  ,payload:{value: value,list:list,columnid:columnid}})
}
