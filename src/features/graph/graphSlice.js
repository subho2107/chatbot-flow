import { createSlice } from '@reduxjs/toolkit';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import { MarkerType } from 'reactflow';


const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Text Message 1' , type: 'Text'}, type: 'customNode' },
    { id: '2', position: { x: 300, y: 300 }, data: { label: 'Text Message 2', type: 'Text' }, type: 'customNode' },
];
const initialEdges = [];

const initialState = {
  nodes: initialNodes,
  edges: initialEdges,
  currentlySelectedNode: null//node whose setting page is to be shown
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = state.nodes.concat(action.payload);
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    updateSelectedNode: (state, action) => {
      state.currentlySelectedNode = action.payload;
    },
    updateNodeLabel: (state, action) => {
      state.nodes = state.nodes.map(node => {//updating the label of the selected node based on id
        if (node.id === state.currentlySelectedNode.id) {//creating a new object to let reactflow know of the change saw this in  reactflow documentation
          return {
            ...node,
            data: {
              ...node.data,
              label: action.payload,
            },
          };
        }
        return node;
      });
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      const sourceNodeEdges = state.edges.filter((edge) => edge.source === action.payload.source);//getting all edges from the source node

      if (sourceNodeEdges.length == 0) {//add an edge only if no edges yet
        state.edges = addEdge({ ...action.payload, markerEnd: { type: MarkerType.ArrowClosed } }, state.edges);
      } else {
        alert('Max edges reached');//show alert if max edges reached
      }

    },
  },
});

export const { setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, updateSelectedNode, updateNodeLabel } = graphSlice.actions;

export default graphSlice.reducer;