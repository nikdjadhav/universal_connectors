import { useRouter } from "next/router";
import React, { useEffect } from "react";

const CallBack = () => {
  console.log("callback");
  const router = useRouter();
  console.log("router", router);
  console.log("code", router.query.code);
  console.log("scope", router.query.scope);
  const { query } = useRouter();
  console.log(query);

  useEffect(() => {
    if (router.query.code) {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div className="text-center">
      <h3>successfully logged in...</h3>
    </div>
  );
};

export default CallBack;

CallBack.options = {
  // layout: true,
  // auth: true,
};
