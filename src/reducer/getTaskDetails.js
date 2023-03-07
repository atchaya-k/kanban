export default function (state =[], action = {}) {
    switch (action.type) {
        case 'getTaskDetails':
          let a;
          Object.entries(action.payload.list).map((list,ind)=>{
                if(action.payload.columnid == list[0]){
                    list[1].items.map((val,ind)=>{
                        if(val.id == action.payload.value){
                            a= Object.assign({columnname: list[1].name},val)
                         }
                    })
                }            
            })
           return a;
        default:
          return state;
        }
    }