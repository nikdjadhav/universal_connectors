import { API_BASE_URL } from "@/utils/Constants";
import tkFetch from "@/utils/fetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CallBack = () => {
  console.log("callback");
  const router = useRouter();
  const [message, setMessage] = useState("Loading....");

  const addRefreshToken = useMutation({
    mutationFn: tkFetch.post(`${API_BASE_URL}/addRefreshToken`),
  });

  useEffect(() => {
    const integrationID = sessionStorage.getItem("integrationId");
    const id = sessionStorage.getItem("userId");
    if (router.query.code) {
      const dataToAdd = {
        id: integrationID,
        userId: id,
        code: router.query.code,
      };
      addRefreshToken.mutate(dataToAdd, {
        onSuccess: (data) => {
          setMessage("Logged in successfully......");
        },
        onError: (error) => {
          console.log("error", error);
          setMessage("Error while logging in......");
        },
      });
      // sessionStorage.removeItem("integrationId");
      window.close();
    }
  }, [addRefreshToken, router]);

  return <div className="text-center">{message}</div>;
};

export default CallBack;

CallBack.options = {};
