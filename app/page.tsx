import { Button } from "@/components/ui/button"
import { TypographyH1 } from "@/components/ui/typography-h1";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16">
        <TypographyH1>Create your own dream set!</TypographyH1>
        <Button>
          <Link href="/dashboard">Create</Link>
        </Button>
      </main>
    </div>
  );
}
