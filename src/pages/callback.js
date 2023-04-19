import { TkToastError } from "@/globalComponents/TkToastContainer";
import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CallBack = () => {
  console.log("callback");
  const router = useRouter();
  const [message, setMessage] = useState("Loading....");
  // console.log("router", router);
  // console.log("code", router.query.code);
  // console.log("scope", router.query.scope);

  const addRefreshToken = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addRefreshToken`),
  });

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (router.query.code) {
      const dataToAdd = {
        userId: id,
        code: router.query.code,
      };
      addRefreshToken.mutate(dataToAdd, {
        onSuccess: (data) => {
          console.log("data", data);
          setMessage("Logged in successfully......");
        },
        onError: (error) => {
          console.log("error", error);
          setMessage("Error while logging in......");
        },
      });

      // router.push("/dashboard");
      window.close();
    }
  }, [addRefreshToken, router]);

  return (
    <div className="text-center">
      {message}
    </div>
  );
};

export default CallBack;

CallBack.options = {
  // layout: true,
  // auth: true,
};
// refresh_token
