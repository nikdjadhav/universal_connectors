import { useEffect, createContext } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import "@/styles/globals.css";
import "@/styles/globals-copy.css";
import "@/styles/scss/themes.scss";
import "@/styles/custom.scss";
import { Slide, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  return (
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
  );
}

function AuthenticateUser({ children }) {
  return children;
}

function Auth({ children }) {
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
