import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorScreen = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/')
  }, [])

  return (
    <main className="flex items-center justify-center h-screen w-full text-2xl text-center">

    </main>
  );
};

export default ErrorScreen;
