import { useAuthenticator } from "@aws-amplify/ui-react";

export function Home() {
  const { signOut, isPending } = useAuthenticator((context) => [
    context.signOut,
    context.isPending,
  ]);

  return (
    <div>
      <h1>HomePage</h1>
      <hr />
      <div className="home">
        <button disabled={isPending} onClick={signOut}>
          Logout
        </button>
      </div>
    </div>
  );
}
