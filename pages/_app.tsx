// React & Next
import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// Style
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/theme";
import GlobalStyle from "styles/globalStyles";
import GlobalFont from "styles/globalFonts";
// Mobx
import { observer } from "mobx-react-lite";
import {
  rootStore,
  StoreProvider,
  useStore,
  reHydrateLocalStorage,
  reHydrateSessionStorage,
} from "store";
// Components
import Layout from "components/layout";
import Seo from "components/seo";

function MyApp({ Component, pageProps }: AppProps) {
  const { themeStore } = useStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    reHydrateLocalStorage([rootStore.themeStore]);
    reHydrateSessionStorage([rootStore.userStore]);
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StoreProvider value={rootStore}>
            <ThemeProvider theme={themeStore.theme === "light" ? lightTheme : darkTheme}>
              <GlobalFont />
              <GlobalStyle />
              <Layout>
                <Seo title="Next app" />
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StoreProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default observer(MyApp);
