// pages/post-signin-redirect.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

const PostSigninRedirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleWorkspaceRedirection = async () => {
      const session = await getSession();
      const userId = session?.user?.id;

      if (!userId) {
        alert("Failed to retrieve user ID");
        setLoading(false);
        return;
      }

      const hasWorkspace = await fetch(`/api/check-workspace?id=${userId}`);
      const profileData = await hasWorkspace.json();

      if (profileData.hasWorkspace) {
        const lastWorkspace = profileData.lastWorkspace;
        console.log(lastWorkspace.id, "from post-signin-redirect page");

        router.push(
          `/user/${userId}/workspace/${lastWorkspace.workspaceName}/${lastWorkspace.id}/dashboard`
        );
      } else {
        router.push("/createworkspace");
      }

      setLoading(false);
    };

    handleWorkspaceRedirection();
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="flex flex-col items-center">
          <Loader2 className="h-6 w-6 animate-spin mb-2" />
          <p>Redirecting, please wait...</p>
        </div>
      ) : null}
    </div>
  );
};

export default PostSigninRedirect;
