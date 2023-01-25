console.log("index js file")
const redux = require('redux')
const createStore=redux.createStore
const combinereducer=redux.combineReducers

const reduxLogger=require('redux-logger')
const logger=reduxLogger.createLogger()
const applymiddleware=redux.applyMiddleware


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
// const initilState={
//     numofCakes:10,
//     numoficecream:20 //initial state of icecream
// }

const initialCakeState={
    numofCakes:10,
}

const initialIcecreamState={
    numoficecream:20
}
const reducercake=(state=initialCakeState,action)=>{
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
      
        default: return state;
}
}



const reducericecream=(state=initialIcecreamState,action)=>{
    switch(action.type){
       
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
//combining reducers
const rootreducer=combinereducer({
    cake:reducercake,
    icecream:reducericecream
})
const store=createStore(rootreducer,applymiddleware(logger))  
//store holds the state of the app

//2.
console.log(store.getState()) //gives state of the app


//4.
const unsubscribe=store.subscribe(()=>{})

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