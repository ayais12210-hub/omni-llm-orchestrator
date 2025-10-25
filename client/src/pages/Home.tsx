import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * All content in this page are only for example, delete if unneeded
 * When building pages, remember your instructions in Frontend Best Practices, Design Guide and Common Pitfalls
 */
export default function Home() {
  // If theme is switchable in App.tsx, we can implement theme toggling like this:
  // const { theme, toggleTheme } = useTheme();

  // Use APP_LOGO (as image src) and APP_TITLE if needed

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        <Loader2 className="animate-spin" />
        Example Page
        <Button variant="default">Example Button</Button>
      </main>
    </div>
  );
}
