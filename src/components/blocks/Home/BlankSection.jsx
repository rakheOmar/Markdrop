export default function BlankSection() {
  return (
    <>
      <div
        className="
          border-r border-b border-[#CECECE] dark:border-[#16181d]
        "
      ></div>

      <div
        className="
          border-b border-[#CECECE] dark:border-[#16181d]
          [--pattern-foreground:var(--color-gray-300)]
          dark:[--pattern-foreground:#16181d]
          bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)]
          bg-size-[10px_10px]
        "
      ></div>

      <div
        className="
          border-l border-b border-[#CECECE] dark:border-[#16181d]
        "
      ></div>
    </>
  );
}
