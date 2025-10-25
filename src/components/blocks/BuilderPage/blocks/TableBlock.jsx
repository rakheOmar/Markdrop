import { Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const parseMarkdownTable = (content) => {
  if (!content) return null;
  const lines = content.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return null;

  const headers = lines[0]
    .split("|")
    .filter((cell) => cell.trim())
    .map((cell) => cell.trim());
  const rows = lines.slice(2).map((line) =>
    line
      .split("|")
      .filter((cell) => cell.trim())
      .map((cell) => cell.trim())
  );
  return { headers, rows };
};

export default function TableBlock({ block, onUpdate }) {
  const [tableData, setTableData] = useState(() => {
    const parsed = parseMarkdownTable(block.content);
    return parsed || { headers: ["Header 1", "Header 2"], rows: [["Add text..", "Add text.."]] };
  });
  const isUpdatingRef = useRef(false);

  const generateMarkdown = useCallback((data) => {
    const headerRow = `| ${data.headers.join(" | ")} |`;
    const separatorRow = `| ${data.headers.map(() => "---").join(" | ")} |`;
    const dataRows = data.rows.map((row) => `| ${row.join(" | ")} |`).join("\n");
    return `${headerRow}\n${separatorRow}\n${dataRows}`;
  }, []);

  useEffect(() => {
    if (isUpdatingRef.current) {
      isUpdatingRef.current = false;
      return;
    }
    const parsed = parseMarkdownTable(block.content);
    if (parsed) {
      setTableData(parsed);
    }
  }, [block.content]);

  useEffect(() => {
    const markdown = generateMarkdown(tableData);
    if (markdown !== block.content) {
      isUpdatingRef.current = true;
      onUpdate(block.id, { ...block, content: markdown });
    }
  }, [tableData, block, onUpdate, generateMarkdown]);

  const updateHeader = (index, value) => {
    const newHeaders = [...tableData.headers];
    newHeaders[index] = value;
    setTableData({ ...tableData, headers: newHeaders });
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newRows = [...tableData.rows];
    newRows[rowIndex][colIndex] = value;
    setTableData({ ...tableData, rows: newRows });
  };

  const addColumn = () => {
    const newHeaders = [...tableData.headers, "Add text.."];
    const newRows = tableData.rows.map((row) => [...row, "Add text.."]);
    setTableData({ headers: newHeaders, rows: newRows });
  };

  const removeColumn = (index) => {
    if (tableData.headers.length <= 1) return;
    const newHeaders = tableData.headers.filter((_, i) => i !== index);
    const newRows = tableData.rows.map((row) => row.filter((_, i) => i !== index));
    setTableData({ headers: newHeaders, rows: newRows });
  };

  const addRow = () => {
    const newRow = tableData.headers.map(() => "Add text..");
    setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
  };

  const removeRow = (index) => {
    if (tableData.rows.length <= 1) return;
    const newRows = tableData.rows.filter((_, i) => i !== index);
    setTableData({ ...tableData, rows: newRows });
  };

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted border-b-2 border-border">
                {tableData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="relative group border-r last:border-r-0 border-border min-w-[150px]"
                  >
                    <Input
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="border-0 font-semibold h-11 px-3 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary bg-transparent text-left shadow-none"
                      placeholder="Add text.."
                    />
                    {tableData.headers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1.5 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-sm shadow-sm"
                        onClick={() => removeColumn(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </th>
                ))}
                {tableData.rows.length > 1 && <th className="w-12 border-l border-border"></th>}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="group border-b last:border-b-0 border-border hover:bg-muted/50 transition-colors"
                >
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border-r last:border-r-0 border-border p-0">
                      <Input
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="border-0 h-11 px-3 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary bg-transparent rounded-none shadow-none"
                        placeholder="Add text.."
                      />
                    </td>
                  ))}
                  {tableData.rows.length > 1 && (
                    <td className="w-12 border-l border-border text-center p-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeRow(rowIndex)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add Row
        </Button>
        <Button variant="outline" size="sm" onClick={addColumn} className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Add Column
        </Button>
      </div>
    </div>
  );
}
