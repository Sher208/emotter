import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { CreatePost } from "~/components/ui/create-post";
import { Post } from "~/components/ui/post";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const user = useUser();
  const { data, isLoading } = api.post.getAll.useQuery();

  if (isLoading) return <div>Loading....</div>;

  if (!data) return <div>Something went wrong!!</div>;

  return (
    <>
      <Head>
        <title>Emotter</title>
        <meta name="description" content="Twitter of Emotes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && (
              <CreatePost user={user.user} />
              // <div>
              //   {/* <SignOutButton /> */}
              // </div>
            )}
          </div>
          <div className="flex flex-col">
            {data?.map((data) => (
              <Post key={data.post.id} post={data.post} author={data.author} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
