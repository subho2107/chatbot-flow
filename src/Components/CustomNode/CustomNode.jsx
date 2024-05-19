import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import whatsapp from "../../assets/whatsapp.jpg";
import { Handle, Position } from "reactflow";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedNode } from "../../features/graph/graphSlice";

export default function CustomNode(props) {
    const { data, id } = props;
    const dispatch = useDispatch();
    const selectedNode = useSelector(state => state.graph.currentlySelectedNode);
    const onNodeClicked = () => {
        if(id === selectedNode?.id){//adding this check so that updateSelectedNode is not called multiple times for same node
            return;
        }
       dispatch(updateSelectedNode({id, type: data.type, label: data.label}));//updating selected node
    }
    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div>
                <div className={`shadow-2xl rounded-lg ${selectedNode?.id === id? 'border-solid border-2 border-blue-900': ''}`} onClick={onNodeClicked}>
                    <div className="bg-teal-100 grid-cols-[1fr_10fr_1fr] grid items-center p-1 rounded-tl-lg rounded-tr-lg px-2">
                        <BiMessageRoundedDetail className="text-sm mr-2" />
                        <span className="font-bold">Send Message</span>
                        <img src={whatsapp} className="rounded-3xl" width="15" height="15" />
                    </div>
                    <div className="p-4">
                        <span className="text-sm">{data.label}</span>
                    </div>
                </div>
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    )
}
