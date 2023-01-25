const { createStore } = require("redux")
const produce=require('immer').produce
const initialState={
name:"aswinee",
address:{
    street:'MIG-76',
    city:'bbsr',
    state:'odi'
}
}

//define action
const STATE_UPDATED='STATE_UPDATED'
const updateStreet=(street)=>{
    return{
        type:STATE_UPDATED,
        payload:street
    }
}

//define reducer
const reducer=(state=initialState,action)=>{
    switch (action.type){
        case STATE_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.address,
            //         street:action.payload
            //     }
            // }
            return produce(state,(draft)=>{
                  draft.address.street=action.payload
            })
            default:{
                return state
            }
    }
}

const store=createStore(reducer)
console.log(store.getState())

const unsubscribe=store.subscribe(()=>{
    console.log('updated state',store.getState())
})

store.dispatch(updateStreet('ghatikia')) 

unsubscribe()