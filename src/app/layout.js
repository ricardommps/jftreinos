// slick-carousel
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import PropTypes from 'prop-types';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';
import MotionLazy from 'src/components/animate/motion-lazy';
import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { LocalizationProvider } from 'src/locales';
import ReduxProvider from 'src/redux/redux-provider';
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

import ErrorBoundary from './error-boundary';

export const metadata = {
  title: 'Joana Foltz',
  description: 'App de assessoria',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1', // <-- here
  keywords: 'assessoria, corrida, personalS',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className} class="notranslate" translate="no">
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />
      <head>
        <meta name="google" content="notranslate" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body>
        <AuthProvider>
          <ReduxProvider>
            <LocalizationProvider>
              <SettingsProvider
                defaultSettings={{
                  themeMode: 'dark',
                  themeDirection: 'ltr',
                  themeContrast: 'default',
                  themeLayout: 'mini',
                  themeColorPresets: 'default',
                  themeStretch: false,
                }}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <SnackbarProvider>
                      <ErrorBoundary>
                        <SettingsDrawer />
                        <ProgressBar />
                        <AuthConsumer>{children}</AuthConsumer>
                      </ErrorBoundary>
                    </SnackbarProvider>
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </LocalizationProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
