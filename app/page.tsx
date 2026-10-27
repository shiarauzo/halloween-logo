import { Studio } from "@/components/studio";
import { HEADLINE, LEAD, SITE_NAME } from "@/lib/copy";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-16 sm:py-24">
      <header className="max-w-xl">
        <p className="font-display text-lg">{SITE_NAME}</p>
        <p className="mt-8 text-sm text-muted-foreground">31 de octubre</p>
        <h1 className="mt-3 font-display text-5xl text-balance sm:text-6xl">
          {HEADLINE}
        </h1>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">{LEAD}</p>
      </header>
      <Studio />
      <footer className="mt-20 text-sm text-muted-foreground">
        Built by{" "}
        <a
          href="https://github.com/shiarauzo"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Shiara
        </a>
        . Made with love.
      </footer>
    </main>
  );
}
