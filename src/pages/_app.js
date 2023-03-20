import { useEffect, createContext, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/globals.css";
import "@/styles/globals-copy.css";
import "@/styles/scss/themes.scss";
import "@/styles/custom.scss";
import { Slide, ToastContainer } from "react-toastify";
import { Router, useRouter } from "next/router";

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

import Layout from "@/components/layout";
import { AuthContext } from "@/utils/Contexts";
import TkNetworkStatus from "@/globalComponents/TkNetworkStatus";
import useGlobalStore from "@/utils/globalStore";
import Login from "./login";
import tkFetch from "@/utils/fetch";
import { API_BASE_URL } from "@/utils/Constants";

export default function MyApp({ Component, pageProps }) {
  console.log("App rerendered");
  useEffect(() => {
    // <html lang="en" data-layout-style="default" data-sidebar-size="lg" data-sidebar="dark" data-layout-mode="light" data-layout-width="fluid" data-layout-position="fixed" data-topbar="light" data-layout="vertical" data-sidebar-image="none"></html>
    function changeHTMLAttribute(attribute, value) {
      if (document && document.documentElement)
        document.documentElement.setAttribute(attribute, value);
    }
    // we have added the below attributes to HTML tag beacuse we are using a website template and template id dependent on this attributes
    //the styling in scss files is done with respect to the below attributes in html
    changeHTMLAttribute("data-layout-style", "default");
    changeHTMLAttribute("data-sidebar-size", "lg");
    changeHTMLAttribute("data-sidebar", "dark");
    changeHTMLAttribute("data-layout-mode", "light");
    changeHTMLAttribute("ddata-layout-width", "fluid");
    changeHTMLAttribute("data-layout-position", "fixed");
    changeHTMLAttribute("data-topbar", "light");
    changeHTMLAttribute("data-layout", "vertical");
    changeHTMLAttribute("data-sidebar-image", "none");
  }, []);

  const router = useRouter();
  const [verified, setVerified] = useState(null);
  // const verifyToken = useMutation({
  //   mutationFn: tkFetch.post("http://localhost:4000/v1/verifyToken"),
  // });

  useEffect(() => {
    if (
      !window.location.pathname.includes("login") ||
      !window.location.pathname.includes("signup") ||
      !window.location.pathname.includes("forgot-password")
    ) {
      const token = sessionStorage.getItem("loginCredentials");
      // console.log("token===>", token);
      if (token) {
        const userToken = {
          token: token,
        };
        // console.log("userToken===>", userToken);
        async function tokenVerifiedApi() {
          // const response = await fetch("http://localhost:4000/v1/verifyToken", {
          const response = await fetch(`${API_BASE_URL}/verifyToken`, {

            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userToken),
          }).then(async (response) => {
             const userToken = await response.json();
             console.log("token verified API response",userToken);
             if(!userToken.data[0]?.verified){
                sessionStorage.clear();
                router.push("/login");
             }
          });
        }
        tokenVerifiedApi();
      }
    }
  }, [router]);

  return (
    <>
      {/* {verified === null ? (
        //*** display loader
        <QueryClientProvider client={queryClient}>
        <AuthWrap wrap={Component?.options?.auth}>
          <LayoutWrap wrap={Component?.options?.layout}>
            <Component {...pageProps} />
          </LayoutWrap>
        </AuthWrap>
        </QueryClientProvider>
      ) : ( */}
      <>
        <ToastContainer
          position="top-center"
          autoClose={10000}
          closeButton={true}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          theme="light"
          transition={Slide}
        />
        {/* <TkNetworkStatus /> */}
        <QueryClientProvider client={queryClient}>
          {/* <SessionProvider session={pageProps.session}> */}
          <AuthWrap wrap={Component?.options?.auth}>
            <LayoutWrap wrap={Component?.options?.layout}>
              <Component {...pageProps} />
            </LayoutWrap>
          </AuthWrap>
          {/* </SessionProvider> */}
        </QueryClientProvider>
      </>
      {/* )} */}
    </>
  );
}

function AuthenticateUser({ children }) {
  const [setUserAuthenticated, setUserSessionData] = useGlobalStore((state) => [
    state.setUserAuthenticated,
    state.setUserSessionData,
  ]);
  const router = useRouter();
  const [data, setData] = useState(children);

  useEffect(() => {
    // if (typeof window === "undefined") return null;

    const loggedInUser = sessionStorage.getItem("loginCredentials");
    // console.log("loggedInUser", loggedInUser);
    if (loggedInUser === null) {
      router.push("/login");
      setData(null);
    } else {
      setUserAuthenticated(true);
      setUserSessionData(loggedInUser);
    }
    // setData(children)
    // return <AuthContext.Provider>{children}</AuthContext.Provider>;
  }, [router, setUserAuthenticated, setUserSessionData]);

  return data;
}

function Auth({ children }) {
  const [isUserAuthenticated, sessionData] = useGlobalStore((state) => [
    state.isUserAuthenticated,
    state.userSessionData,
  ]);
  const router = useRouter();

  // console.log("sessionData", sessionData);
  console.log("isUserAuthenticated", isUserAuthenticated);

  if (isUserAuthenticated) {
    console.log("authenticated");

    // if(router.asPath.includes("/login")){
    //   router.push("/dashboard");
    //   console.log('incorrect');
    //   return <div>Loading...</div>;
    // }
    return (
      <AuthContext.Provider value={sessionData}>
        {children}
      </AuthContext.Provider>
    );
  }
  console.log("authentication failed");
  return <AuthenticateUser>{children}</AuthenticateUser>;
}

function AuthWrap({ children, wrap }) {
  if (wrap) {
    return <Auth>{children}</Auth>;
  }
  return children;
}

function LayoutWrap({ children, wrap }) {
  if (wrap) {
    return <Layout>{children}</Layout>;
  }
  return children;
}
