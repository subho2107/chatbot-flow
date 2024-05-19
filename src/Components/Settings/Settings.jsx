import React, {useState, useEffect} from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { updateNodeLabel, updateSelectedNode } from "../../features/graph/graphSlice";

export default function Settings(){
    const node = useSelector(state => state.graph.currentlySelectedNode);
    const [inputValue, setInputValue] = useState(node.label);//using another local state also for the input value, 
    //otherwise if we would directly use node.label, the input value would not change as each time we type react rerenders 
    //the component and places the cursor back at the end again
    const dispatch = useDispatch();

    useEffect(() => {
        setInputValue(node.label);
    }, [node.label]);//setting the local input value when we select a different node having one node already selected

    useEffect(() => {
        dispatch(updateNodeLabel(inputValue));
    }, [inputValue]);//updating the node label when we change the input value

    const onInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const onBackClick = () => {
        dispatch(updateSelectedNode(null));
    }

    return(
        <div className="border-solid border-2 border-gray-100 h-full w-full border-t-0">
            <div className="items-center justify-center grid-cols-[1fr_5fr] grid p-4 border-b-2">
                <IoMdArrowBack color="gray" size={20} onClick={onBackClick}/>
                <div className="justify-center flex">
                    <span>Message</span>
                </div>
            </div>
            <div className="p-4 flex flex-col">
                <span className="text-gray-400">{node.type}</span>
                <textarea className="h-20 w-full mt-4 rounded-lg p-4 text-left whitespace-pre-wrap overflow-y-auto border-solid border-2 border-gray-200 text-sm outline-none" value={inputValue} onChange={onInputChange}></textarea>
            </div>
        </div>
    )
}