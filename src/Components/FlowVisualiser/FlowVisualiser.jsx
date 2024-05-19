import React from "react";
import ReactFlow, {
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
import { useCallback } from "react";
import CustomNode from "../CustomNode/CustomNode";
import { useRef } from "react";
import { useState } from "react";
import NodesPanel from "../NodesPanel/NodesPanel";
import { setNodes, setEdges, onNodesChange, onEdgesChange, onConnect } from "../../features/graph/graphSlice";
import { useSelector, useDispatch } from 'react-redux';
import Settings from "../Settings/Settings";

const nodeTypes = { customNode: CustomNode };

export default function FlowVisualiser() {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const dispatch = useDispatch();

    const nodes = useSelector(state => state.graph.nodes);
    const edges = useSelector(state => state.graph.edges);
    const isNodeSelected = useSelector(state => state.graph.currentlySelectedNode);

    const handleNodesChange = (changes) => {
        dispatch(onNodesChange(changes));
    };

    const handleEdgesChange = (changes) => {
        dispatch(onEdgesChange(changes));
    };

    const handleConnect = (connection) => {
        dispatch(onConnect(connection));
    };

    const addNode = (node) => {
        dispatch(setNodes(node));
    }
    let id = 2;//mostly boilerplate codes from reactflow documentation
    const getId = () => `${++id}`;
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            const type = event.dataTransfer.getData('application/reactflow');
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type: 'customNode',
                position,
                data: { label: `${type} message ${id}`, type: type },//sending type also so that we can later add voice, audio and other forms of messages
            };

            addNode(newNode);//adding new node using redux
        },
        [reactFlowInstance],
    );
    return (
        <ReactFlowProvider>
            <div className='grid-cols-[5fr_2fr] grid'>
                <div className="reactflow-wrapper" style={{ width: '70vw', height: '100vh' }} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={handleNodesChange}
                        onEdgesChange={handleEdgesChange}
                        onConnect={handleConnect}
                        nodeTypes={nodeTypes}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                    >
                    </ReactFlow>
                </div>
                {isNodeSelected ? (
                   <Settings/>
                ) :  <NodesPanel />}
            </div>
        </ReactFlowProvider>
    )
}
//5fr 2fr
