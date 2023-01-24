console.log("index js file")
const redux = require('redux')
const createStore=redux.createStore
// import { createStore } from 'redux'
//initialize action
const CAKE_ORDERED='CAKE_ORDERED'

const CAKE_RESTOCKED='CAKE_RESTOCKED'

//actions for icecream
const ICECREAM_ORDERED='ICECREAM_ORDERED'
const ICECREAM_RESTOCKED='ICECREAM_RESTOCKED'
//
function restock(qty=1) {
   return {
        type:CAKE_RESTOCKED,
payload:qty
    }
}

//here ordercake is a action creator
function ordercake () {
   
    //DEFINING ACTION
    return{
        type:CAKE_ORDERED,
        payload:1
    }
}


//action creator for icecream
function ordericecream (qty){
    return{
        type:ICECREAM_ORDERED,
        payload:qty
    }
}

function restockicecream (qty=1){
    return{
        type:ICECREAM_RESTOCKED,
        payload:qty
    }
}


//reducer
//representing initial state in a single obj
const initilState={
    numofCakes:10,
    numoficecream:20 //initial state of icecream
}
const reducer=(state=initilState,action)=>{
switch(action.type){
    case CAKE_ORDERED:
        return{
            ...state, //making copy of the initial state
            numofCakes:state.numofCakes-1
        }
        case CAKE_RESTOCKED:
        return{
            ...state,
            numofCakes:state.numofCakes+action.payload
        }
        case ICECREAM_ORDERED:
        return{
            ...state,
            numoficecream:state.numoficecream-action.payload
        }
        case ICECREAM_RESTOCKED:
        return{
            ...state,
            numoficecream:state.numoficecream+action.payload
        }
        default: return state;
}
}


//1. creating store
const store=createStore(reducer)  //store holds the state of the app

//2.
console.log(store.getState()) //gives state of the app


//4.
const unsubscribe=store.subscribe(()=>{
    console.log(store.getState())  //we are regiustering the listener 
})

//3. dispatch(action)
// store.dispatch(ordercake())  //updates state of the app
// store.dispatch(ordercake()) 
// store.dispatch(ordercake()) 


// store.dispatch(restock(3))

//actionbinder
const actions=redux.bindActionCreators({ordercake,restock,ordericecream,restockicecream},store.dispatch)
actions.ordercake()
actions.ordercake()
actions.ordercake()
actions.restock(3)

actions.ordericecream(3)
actions.restockicecream(4)
//5. unsubscribe
unsubscribe()

store.dispatch(ordercake()) //wont give result as we have unsubscribed from the actiosn