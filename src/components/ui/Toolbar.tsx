import React from "react";

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
}

export function Toolbar({ children, className = "" }: ToolbarProps) {
  return (
    <div
      className={`
        flex flex-col md:flex-row items-center 
        gap-4 ${className}
      `}
    >
      {children}
    </div>
  );
}
