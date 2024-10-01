// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ANAMNESE: '/anamnese',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  anamnese: {
    root: ROOTS.ANAMNESE,
    anamnese: {
      root: `${ROOTS.ANAMNESE}`,
    },
  },
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    home: {
      root: `${ROOTS.DASHBOARD}/home`,
      details: (id) => `${ROOTS.DASHBOARD}/home/${id}`,
    },
    metrics: {
      root: () => `${ROOTS.DASHBOARD}/metrics/`,
    },
    programs: {
      root: () => `${ROOTS.DASHBOARD}/programs/`,
    },
    historic: {
      root: () => `${ROOTS.DASHBOARD}/historic/`,
    },
    share: {
      root: () => `${ROOTS.DASHBOARD}/share/`,
    },
    security: `${ROOTS.DASHBOARD}/security`,
    training: {
      root: (id) => `${ROOTS.DASHBOARD}/training/${id}`,
    },
  },
};
