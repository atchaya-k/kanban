export default function (state =[], action = {}) {
    switch (action.type) {
        case 'getUser':
           const newstate= action.payload.map((val,ind)=> {
              let a={value: val.name,label:val.name}
              return a
           })
           return newstate
        default:
            return state;
        }
    }