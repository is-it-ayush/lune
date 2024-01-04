import { executeMeJIT } from "@repo/just-in-time";
import { executeMeCompiled } from "@repo/compiled";

export default function Page(): JSX.Element {
  executeMeJIT();
  executeMeCompiled();
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <span className="flex">
        Hi, You can edit this to ensure your website is working. :3
      </span>
    </main>
  );
}
