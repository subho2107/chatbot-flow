import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
export default function Header(){
    const edges = useSelector(state => state.graph.edges);
    const nodes = useSelector(state => state.graph.nodes);
    const [showAlert, setShowAlert] = useState('');

    const onSaveClick = () => {
        const targetNodes = new Set(edges.map(edge => edge.target));//from all edges finding their target nodes
        const nodesWithEmptyTargetHandle = nodes.filter(node => !targetNodes.has(node.id));//finding nodes which don't have any target handle, by checking iterating on all nodes and check if a given node was part of nodes with target connected(targetNodes)
        if(nodesWithEmptyTargetHandle.length > 1){
            setShowAlert('failed');//show save failed message
        } else {
            setShowAlert('success');//show save success message
        }
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert('');
            }, 1500);//show the notification for 1.5 seconds
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <div className="bg-slate-100 h-16 grid grid-cols-[5fr_1fr]">
            <div className="flex justify-center">
                {showAlert !== '' && <div className={`h-14 rounded-lg font-bold text-lg mr-8 p-8 items-center flex ${showAlert === 'failed'? 'bg-red-400': 'bg-green-400'}`}>{showAlert === 'failed' ? 'Cannot save Flow': 'Flow saved successfully'}</div>}
            </div>
           <button className="text-blue-900 font-bold border-blue-900 border-solid border-2 h-12 w-52 bg-white rounded-lg p-1 mr-8 self-center" onClick={onSaveClick}>Save Changes</button>
        </div>
    );
}