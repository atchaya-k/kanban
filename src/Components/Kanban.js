import React, { useState,useEffect } from "react";
import {Button,Modal,Input,Select} from "antd";
import {useDispatch,useSelector} from 'react-redux'
import {requestUpdate,addUpdate,getUser,getTaskDetails,existUpdate} from '../action'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {PlusSquareOutlined} from '@ant-design/icons'
const { TextArea } = Input;

function Kanban() {
  const dispatch=useDispatch()
  const allcolum=useSelector((state)=>state.columns)
  const users=useSelector((state)=>state.users)
  const taskdetail=useSelector((state)=> state.taskdetail)
  //const requested=useState(Object.entries(allcolum)[0][1].items)
  const [newtask,setNewtask]=useState(null)
  const [newdesc,setNewdesc]=useState(null)
  const [assigned,setAssigned]=useState(null)
  const [columns, setColumns] = useState(allcolum);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updtask,setupdtask]=useState(null)
  const [upddesc,setupddesc]=useState(null)
  const [updid,setupdid]=useState(null)
  const [updcol,setupdcol]=useState(null)
  const [updassigned,setupdAssigned]=useState(null)
  const [isUpdModalOpen, setIsUpdModalOpen] = useState(false);
  useEffect(()=>{
    setupdcol(taskdetail.columnname)
       setupdid(taskdetail.id)
       setupdtask(taskdetail.content)
       setupddesc(taskdetail.description)
       setupdAssigned(taskdetail.assigned)
  },[taskdetail])
  useEffect(()=>{
    dispatch(getUser())
  },[])
  useEffect(() => {
    dispatch(requestUpdate(columns));
  },[columns,allcolum]);

  const showModal = () => {
     setIsModalOpen(true);
  };
  const handleOk = () => {
    dispatch(addUpdate(newtask,newdesc,assigned,columns))
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
 const handleUpdOk = () => {
   dispatch(existUpdate(updid,updtask,upddesc,updassigned,updcol,columns))
   setIsUpdModalOpen(false);
 };
 const handleUpdCancel = () => {
  setIsUpdModalOpen(false);
 };
const updatetask=(value,columnid)=>{
  setIsUpdModalOpen(true)
   dispatch(getTaskDetails(value,columns,columnid))
}
const onDragEnd = (result, columns, setColumns) => {
    //result has source and dest with droppable id and index
//this goonna reoder after drop like delete thst from prev one and order in current one
if (!result.destination) return;
const { source, destination } = result;

if (source.droppableId !== destination.droppableId) {
const sourceColumn = columns[source.droppableId];
const destColumn = columns[destination.droppableId];
const sourceItems = [...sourceColumn.items];
const destItems = [...destColumn.items];
const [removed] = sourceItems.splice(source.index, 1);
destItems.splice(destination.index, 0, removed);
setColumns({
  ...columns,
  [source.droppableId]: {
    ...sourceColumn,
    items: sourceItems
  },
  [destination.droppableId]: {
    ...destColumn,
    items: destItems
  }
});
} else {
   //if not have destination and dragged within column
const column = columns[source.droppableId];
const copiedItems = [...column.items];
const [removed] = copiedItems.splice(source.index, 1);
copiedItems.splice(destination.index, 0, removed);
setColumns({
  ...columns,
  [source.droppableId]: {
    ...column,
    items: copiedItems
  }
});
}
};

const newtaskChange=(e)=>{
  setNewtask(e.target.value)
}
const newdescChange=(e)=>{
  setNewdesc(e.target.value)
}
const onChange = (value) => {
  setAssigned(value);
};
const updtaskChange=(e)=>{
  setupdtask(e.target.value)
}
const upddescChange=(e)=>{
  setupddesc(e.target.value)
}
const onupdChange = (value) => {
  setupdAssigned(value);
};
  return (
    <div className="todoboards">
    <DragDropContext
    onDragEnd={result => onDragEnd(result, columns, setColumns)}
  >
    {Object.entries(columns).map(([columnId, column], index) => {
         /* create column*/
      return (
        <div
         className="todocolumn"
          key={columnId}
        >
          <span className="column-head">{column.name}</span>
          
          <div style={{ margin: 8 ,background:"#000"}}>
            
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => {
                return (
                  <div
                  className="todotask"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver
                        ? "lightblue"
                        : "#ffffff",                        
                    }}
                  >
                    {column.name == "Requested" ? <Button  className="todoaddrange" onClick={showModal}>
      <PlusSquareOutlined className="addicon"/> New Task 
       </Button>:null}
                    {column.items.map((item, index) => {
                           /*draggle id is string from uuid ,index to tell what index we drag from to to*/
                       /*return div simlar to droppable*/ 
                       /*creates individual elemt in the column created above*/ 
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                              className="todoindividual">
                              <div
                              onClick={()=>updatetask(item.id,columnId)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  backgroundColor: snapshot.isDragging
                                    ? "#263B4A"
                                    : "#456C86",
                                  ...provided.draggableProps.style
                                }}
                              >
                                {item.content}
                              </div>
                              <div className="assigned"><span className="dot">{item.assigned[0]}</span>{item.assigned}</div>
                              </div>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </div>
      );
    })}
  </DragDropContext>
  <Modal title="New Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div style={{margin:5}}>  Task Name :  </div>
      <Input placeholder="Basic usage" onChange={(val)=>newtaskChange(val)}/>
      <div style={{margin:5}}>  Description :  </div>
      <TextArea rows={4} onChange={(val)=>newdescChange(val)}/>
      <div style={{margin : 5}}>Assinged To</div>
      <Select
      style={{width :"100%"}}
      value={assigned}
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={users}
  />
  </Modal>
  <Modal title="View Task" open={isUpdModalOpen} footer={false} onCancel={handleUpdCancel}>
      <div style={{margin:5}}><b>  Task Name : </b>{updtask}   </div>
      {/*<Input placeholder="Basic usage" value={updtask} onChange={(val)=>updtaskChange(val)}/>*/}
      <div style={{margin:5}}><b>  Description : </b>{upddesc}  </div>
     {/* <TextArea rows={4} value={upddesc} onChange={(val)=>upddescChange(val)}/>*/}
      <div style={{margin : 5}}><b>Assinged To : </b> {updassigned}</div>
      {/*<Select
      style={{width :"100%"}}
      value={updassigned}
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onupdChange}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={users}
  />*/}
  </Modal>
  </div>
  );
}

export default Kanban;
