import ThemePreviewCard from "@/components/layout/themePreviewCard";
import { themesRegistry } from "@/themes/lib/themeRegistry";

export default function Home() {
  return (
    <div className="min-h-screen h-auto w-full">
      <div className="pb-8 pt-2">
        <h1 className="font-semibold text-lg md:text-2xl lg:text-4xl mb-4">Open Source Theme Picker</h1>
        <p className="text-base">Are you still find the best theme for you project, Try this.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          themesRegistry.map(themes => (
            <ThemePreviewCard
              key={themes.id}
              id={themes.id}
              title={themes.title}
              previewColor={themes.previewColor}
            />
          ))
        }
      </div>
    </div>
  );
}
