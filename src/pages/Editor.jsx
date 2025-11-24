import {useFiles} from "@/context/FileContext";
import {markdownToBlocks} from "@/src/pages/Builder";
import FileTabs from "@/components/ui/filetabs";

export default function EditorPage() {
    const {files, updateFileContent, addFile}= useFiles();
    const activeFile = files.find((f)=>f.isActive);

    const handleChange=(e)=>{
        if(activeFile) {
            updateFileContent(activeFile.id, e.target.value);
        }
    };
    const handleFileDrop=async(e)=>{
        //const newBlocks= markdownToBlocks(text.replace(/\r\n/g,"\n"));
        e.preventDefault();
        const droppedFiles=Array.from(e.dataTransfer.files||[]);
        if(droppedFiles.length===0) return;

        for(const file of droppedFiles){
            const text= (await file.text()).replace(/\r\n/g,"\n");

            //use global markdownToBlocks created in Builder
            const newBlocks= window.markdownToBlocks(text);
            addFile({
                name: file.name,
                content: text,
                blocks: newBlocks,
            });
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

                    onDragOver={(e)=>{
                        if(e.dataTransfer.types.includes("Files")){
                        e.preventDefault();
                        }
                    }}
                    onDrop={handleFileDrop}
                    onDragStart={(e)=>{
                            e.preventDefault();
                    }}
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
