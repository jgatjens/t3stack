import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
// import { api } from "~/trpc/server";
import { redirect } from "~/navigation";
// import { CreatePost } from "~/components/create-post";

export default async function Home() {
  const session = await getServerAuthSession();

  // redirect if user doesn't have a session
  if (!session?.user) {
    redirect("/login");
  }

  // const hello = await api.post.hello.query({ text: "from tRPC" });

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>

        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p> */}

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
            {/* <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link> */}
          </div>
        </div>

        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const session = await getServerAuthSession();
//   if (!session?.user) return null;

//   const latestPost = await api.post.getLatest.query();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
