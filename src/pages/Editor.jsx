import {useFiles} from "@/context/FileContext";
//import Preview from "@/components/blocks/BuilderPage/Preview";
import FileTabs from "@/components/ui/filetabs";

export default function EditorPage() {
    const {files, updateFileContent}= useFiles();
    const activeFile = files.find((f)=>f.isActive);

    const handleChange=(e)=>{
        if(activeFile) {
            updateFileContent(activeFile.id, e.target.value);
        }
    };


    return (
        <div className="flex flex-col h-full">
            <FileTabs/>
            <div className="flex-1 overflow-hidden">
                {activeFile ? (
                    <textarea 
                    className="w-full h-full bg-backgorund text-foreground p-4 outline-none resize-none"
                    value={activeFile.content}
                    onChange={handleChange}
                    placeholder="Start writing..."
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        No file open. Create a new file to start editiing.
                    </div>
                )}
                        
            </div>
        </div>
    );
}