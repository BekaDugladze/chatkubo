// Define your initial state
const initialState = {
    userImage: null,
    userName: null,
    userEmail: null,
    activeNavBut: 1,
    active: false,
    user: null
}
export const setSelectedUser = (userImage, userEmail, userName) => ({
    type: 'SET',
    payload: { userImage, userEmail, userName },
  });

  export const clearSelectedUser = () => ({
    type: 'CLEAR',
  });

  export const handleNavBut = (activeNavBut) => ({
    type: 'HANDLE_BUT',
    payload: { activeNavBut }
  })
  
  export const setActive = (active) => ({
    type: 'SET_ACTIVE',
    payload: { active }
  })

  export const setLoginUser = (user) => ({
    type: 'SET_LOGIN_USER',
    payload: { user }
  })
  

export const reducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET': return{
            ...state,
            userImage: action.payload.userImage,
                userEmail: action.payload.userEmail,
                userName: action.payload.userName,
        }
        case 'HANDLE_BUT': return {
            ...state,
            activeNavBut: action.payload.activeNavBut
        }
        case 'SET_ACTIVE': return {
            ...state,
            active: action.payload.active
        }
        case 'SET_LOGIN_USER': return {
          ...state,
          user: action.payload.user
        }
        case 'CLEAR':
            return initialState;
        default: return state
    }
}
