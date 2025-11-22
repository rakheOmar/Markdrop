import { Plus, Table as TableIcon, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
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
    return parsed || { headers: ["Header 1", "Header 2"], rows: [["Cell 1", "Cell 2"]] };
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
    const newHeaders = [...tableData.headers, "New Header"];
    const newRows = tableData.rows.map((row) => [...row, "New Cell"]);
    setTableData({ headers: newHeaders, rows: newRows });
  };

  const removeColumn = (index) => {
    if (tableData.headers.length <= 1) return;
    const newHeaders = tableData.headers.filter((_, i) => i !== index);
    const newRows = tableData.rows.map((row) => row.filter((_, i) => i !== index));
    setTableData({ headers: newHeaders, rows: newRows });
  };

  const addRow = () => {
    const newRow = tableData.headers.map(() => "New Cell");
    setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
  };

  const removeRow = (index) => {
    if (tableData.rows.length <= 1) return;
    const newRows = tableData.rows.filter((_, i) => i !== index);
    setTableData({ ...tableData, rows: newRows });
  };

  return (
    <div className="group relative rounded-md border border-border bg-background transition-all focus-within:border-ring">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <TableIcon className="h-3.5 w-3.5" />
          <span>Table</span>
        </div>

        <ButtonGroup className="bg-background/80">
          <Button variant="ghost" size="sm" onClick={addRow} className="h-7 text-xs gap-1.5">
            <Plus className="h-3 w-3" /> Row
          </Button>
          <ButtonGroupSeparator />
          <Button variant="ghost" size="sm" onClick={addColumn} className="h-7 text-xs gap-1.5">
            <Plus className="h-3 w-3" /> Col
          </Button>
        </ButtonGroup>
      </div>

      <div className="overflow-x-auto p-3">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                {tableData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="relative group border-r last:border-r-0 border-border min-w-[120px]"
                  >
                    <Input
                      value={header}
                      onChange={(e) => updateHeader(index, e.target.value)}
                      className="border-0 font-semibold h-9 px-3 bg-transparent text-left shadow-none focus-visible:ring-0"
                      placeholder="Header"
                    />
                    {tableData.headers.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1.5 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeColumn(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </th>
                ))}
                {tableData.rows.length > 1 && (
                  <th className="w-10 border-l border-border bg-muted/20"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="group border-b last:border-b-0 border-border hover:bg-muted/20 transition-colors"
                >
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="border-r last:border-r-0 border-border p-0">
                      <Input
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="border-0 h-9 px-3 bg-transparent shadow-none focus-visible:ring-0"
                        placeholder="Cell"
                      />
                    </td>
                  ))}
                  {tableData.rows.length > 1 && (
                    <td className="w-10 border-l border-border text-center p-0 bg-muted/20">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-full opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-none"
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
    </div>
  );
}
