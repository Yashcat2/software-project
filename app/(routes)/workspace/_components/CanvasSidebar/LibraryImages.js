import React from 'react'
import { useDrag } from 'react-dnd';

function LibraryImages({id,name,svg}) {
    const [{isDragging},drag] = useDrag(()=>({
        type:"images",
        item:{id: id},
        collect:(monitor)=>({
            isDragging:!!monitor.isDragging(),
        }),
    }));
  return (
    <img
    ref={drag}
    src={svg}
    width="100px"
    style={{border:isDragging? "5px solid pink":"0px"}}
    />
  );
}

export default LibraryImages