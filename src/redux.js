import redux, {createStore} from 'redux';

const OPEN_CHAT = 'OPEN_CHAT';

function createChat() {
    return{
        type: OPEN_CHAT,
        info: 'create chat',
    }
}

const initialState = {
    user: null
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case OPEN_CHAT: return{
            ...state,
            user: {
                email: user.email,
                name: user.name,
                picture: user.picture
            }
        }
        default: return state
    }
}

const store = createStore(reducer);
store.dispatch(createChat())

export default store;