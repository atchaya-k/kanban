import { v4 as uuid } from 'uuid'
const init={
    [uuid()]: {
      name: "Requested",
      items: [{ id: uuid(), content: "First task",description: "Describe",assigned :'Leanne Graham' }]
    },
    [uuid()]: {
      name: "To do",
      items: []
    },
    [uuid()]: {
      name: "In Progress",
      items: []
    },
    [uuid()]: {
      name: "Testing",
      items: []
    },
    [uuid()]: {
        name: "Accepted",
        items: []
    },
   [uuid()]: {
        name: "Closed",
        items: []
     }
  }
export default function (state =init, action = {}) {
    switch (action.type) {
        case 'requestUpdate':
            return state;
        case 'addUpdate' :
           state = Object.entries(action.payload.lists).map((val,ind)=>{
                if(val[1].name == "Requested"){
                 val[1].items.push({ id: uuid(), content: action.payload.newtask,
                  description: action.payload.newdescChange ,assigned:action.payload.assigned})
                  return val;
                }
                else{
                  return val
                }
              })
            return state;  
        case 'existUpdate' :
           state = Object.entries(action.payload.lists).map((lists,ind)=>{
            if(lists[1].name == action.payload.columnname){
              let a;
              let selId;
              lists[1].items.map((val,ind)=>{                
                if(val.id == action.payload.updid){
                  a= [lists[0],Object.assign({name: lists[1].name,items:[
                    Object.assign({  id: action.payload.updid, content: action.payload.updtask,
                description: action.payload.upddesc ,assigned:action.payload.updassigned})
                   ] })]
                }
              })
              return a;
            }
            else{
              return lists
            }
          })
          return state; 
        default:
            return state;
    }
}