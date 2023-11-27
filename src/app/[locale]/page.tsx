import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "~/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  // redirect if user doesn't have a session
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="flex flex-col items-center gap-2">
          <Link
            href={"/settings"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            settings
          </Link>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
