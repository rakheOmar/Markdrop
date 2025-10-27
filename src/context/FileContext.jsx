import {createContext, useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";

const FileContext = createContext();

export const FileProvider=({ children})=>{
    const [files, setFiles] = useState([
        {id: uuidv4(), name: "Untitled.md", content:"", blocks:[], isActive: true },
    ]);

const addFile=(fileData= null)=> {
    const newFile ={
        id: uuidv4(),
        name: fileData?.name || `Untitled-${files.length+1}.md`, 
        content: fileData?.content || "",
        blocks: fileData?.blocks || [],
        isActive: true};
    setFiles((prev)=>
    prev.map((f)=>({...f,isActive:false})).concat(newFile)
);
};
const switchFile=(id)=>
    setFiles((prev)=>
    prev.map((f)=> ({...f, isActive: f.id === id}))
);
const updateFileContent=(id,newContent)=>
    setFiles((prev)=>
    prev.map((f)=>(f.id === id? {...f, content: newContent}:f))
);
const updateFileBlocks=(id,newBlocks)=>
    setFiles((prev) =>
        prev.map((f)=>(f.id===id? {...f,blocks: newBlocks}: f))
);
const closeFile=(id)=>
    setFiles((prev)=>{
        const remaining = prev.filter((f) => f.id!==id);
        if(!remaining.length) return [{id: uuidv4(), name: "Untitled.md", content:"", blocks: [], isActive:true},];
        if(!remaining.some((f)=>f.isActive))
            remaining[remaining.length-1].isActive= true;
        return remaining;
    });
return(
    <FileContext.Provider value={{ 
        files,
         addFile, 
         switchFile, 
         updateFileContent, 
         updateFileBlocks,
         closeFile}}>
        {children}
    </FileContext.Provider>
);
};
export const useFiles=()=> useContext(FileContext);