import {useFiles} from "@/context/FileContext";
import {X} from "lucide-react";


export default function FileTabs() {
    const {files, addFile, switchFile, closeFile}= useFiles();

    return (
        <div className="flex items-center gap-2 bg-muted p-2 border-b border-border">
            {files.map((file)=>(
                <div
                key={file.id}
                className={`px-3 py-1 rounded-t-md cursor-pointer flex items-center gap-2 ${
                    file.isActive?"bg-background shadow-sm": "opacity-70"
                } `}
                onClick={()=>switchFile(file.id)}
                >
                <span>{file.name}</span>
                <X 
                    size={14}
                    className="hover:text-destructive"
                    onClick={(e)=>{
                        e.stopPropagation();
                        closeFile(file.id);
                    }}
                />
                </div>
            ))}
            <button
                onClick={()=>addFile()}
                className="ml-auto text-sm px-2 py-1 border rounded hover:bg-accent"
            >
                + New File
            </button>
        </div>
    );
}