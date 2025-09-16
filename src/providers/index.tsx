import SessionProvider from "./SessionProvider";
import { ThemeProvider } from "./ThemeProvider";

export default function ContextWrapper({ children }: ChildrenProps) {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
