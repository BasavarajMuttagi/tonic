import { ScrollArea } from "@/components/ui/scroll-area";
import type { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

MainLayout.Header = ({ children }: { children: ReactNode }) => (
  <div className="flex h-20 w-full items-center border-b border-zinc-500/20">
    {children}
  </div>
);

MainLayout.Main = ({ children }: { children: ReactNode }) => (
  <main className="min-h-screen flex-1 overflow-auto">
    <ScrollArea className="h-full w-full">
      <div className="mb-60 flex flex-col">{children}</div>
    </ScrollArea>
  </main>
);

export default MainLayout;
