import { Studio } from "@/components/studio";
import { DATE_LABEL, HEADLINE, LEAD, SITE_NAME } from "@/lib/copy";

export default function Home() {
  return (
    <>
      <a
        href="#studio"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-10 focus-visible:bg-foreground focus-visible:px-3 focus-visible:py-2 focus-visible:text-background"
      >
        Skip to the studio
      </a>
      <main
        id="content"
        className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:py-24"
      >
        <header className="max-w-xl">
          <p className="font-display text-lg" translate="no">
            {SITE_NAME}
          </p>
          <p className="mt-8 text-sm text-muted-foreground">{DATE_LABEL}</p>
          <h1 className="mt-3 font-display text-5xl text-balance sm:text-6xl">
            {HEADLINE}
          </h1>
          <p className="mt-4 max-w-md text-pretty text-muted-foreground">
            {LEAD}
          </p>
        </header>
        <Studio />
        <footer className="mt-20 text-sm text-muted-foreground">
          Built by{" "}
          <a
            href="https://github.com/shiarauzo"
            className="text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            translate="no"
          >
            Shiara
          </a>
          . Made with love.
        </footer>
      </main>
    </>
  );
}
