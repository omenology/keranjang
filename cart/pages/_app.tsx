import { useEffect } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";

import "nprogress/nprogress.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Wrapper from "../components/wrapper";

function MyApp({ Component, pageProps }) {
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
    <Wrapper {...pageProps}>
      <Navigation {...pageProps}>
        <Component {...pageProps} />
      </Navigation>
    </Wrapper>
  );
}

export default MyApp;
