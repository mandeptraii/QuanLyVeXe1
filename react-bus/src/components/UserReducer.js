export const reducer = (state=null, action) => {
    if(action.type === 'login')
        return action.payload
    else
        return state
}