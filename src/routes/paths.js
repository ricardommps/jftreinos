// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
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
    security: `${ROOTS.DASHBOARD}/security`,
  },
};
