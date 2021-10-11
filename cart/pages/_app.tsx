import { useEffect } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";
import { GlobalProvider } from "../context";

import "nprogress/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Wrapper from "../components/wrapper";

function MyApp({ Component, pageProps }) {
  console.log(Component.navigation);
  const Navigation = Component.navigation || (({ children }) => <>{children}</>);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
    return () => {
      Router.events.off("routeChangeStart", null);
      Router.events.off("routeChangeComplete", null);
      Router.events.off("routeChangeError", null);
    };
  }, []);

  return (
    <GlobalProvider>
      <Wrapper>
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
      </Wrapper>
    </GlobalProvider>
  );
}

export default MyApp;
