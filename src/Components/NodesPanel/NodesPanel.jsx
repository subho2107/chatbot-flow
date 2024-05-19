import React, { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

export default function NodesPanel() {
    const [isDragging, setIsDragging] = useState(false);

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
        setIsDragging(true);//to change cursor to grabbing when dragging
    };

    const onDrag = () => {
        if (!isDragging) {
            setIsDragging(true);
        }
    };//this was a hacky fix to address the issue that if i dragged the message node too fast, the cursor would not change to grabbing

    const onDragEnd = () => {
        setIsDragging(false);//to change cursor back to pointer
    };

    return(
        <div className="border-solid border-2 border-gray-100 h-full w-full border-t-0">
           <div 
                className={`border-solid border-2 border-blue-900 p-4 h-24 w-44 flex items-center justify-center m-8 rounded-lg flex-col ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'}`} 
                onDragStart={(event) => onDragStart(event, 'Text')} //here I have used type as text in future we can use voice, img, etc..
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                draggable
            >
                <BiMessageRoundedDetail color="#1A365D" size={50}/>
                <span className="text-blue-900">Message</span>
           </div>
        </div>
    )
}