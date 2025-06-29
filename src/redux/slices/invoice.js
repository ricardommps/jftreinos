import { createSlice } from '@reduxjs/toolkit';
import { API_ENDPOINTS, jfAppApi } from 'src/utils/axios';

const initialState = {
  invoice: [],
  invoiceStatus: {
    loading: false,
    error: null,
    empty: false,
  },
  invoiceTotalPaid: 0,
  invoices: [],
  invoicesStatus: {
    loading: false,
    error: null,
    empty: false,
  },
};

const slice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    getInvoiceStart(state) {
      state.invoice = [];
      state.invoiceStatus.loading = true;
      state.invoiceStatus.error = null;
      state.invoiceStatus.empty = false;
    },
    getInvoiceFailure(state, action) {
      state.invoice = [];
      state.invoiceStatus.loading = false;
      state.invoiceStatus.error = action.payload;
      state.invoiceStatus.empty = false;
    },
    getInvoiceSuccess(state, action) {
      const invoice = action.payload;

      state.invoice = invoice;
      state.invoiceStatus.loading = false;
      state.invoiceStatus.error = false;
      state.invoiceStatus.empty = !invoice.length || invoice.length === 0;
    },
    getTotalPaindStart(state) {
      state.invoiceTotalPaid = 0;
    },
    getTotalPaindFailure(state) {
      state.invoiceTotalPaid = 0;
    },
    getTotalPaindSuccess(state, action) {
      const invoiceTotalPaid = action.payload;
      state.invoiceTotalPaid = invoiceTotalPaid;
    },
    getInvoicesStart(state) {
      state.invoices = [];
      state.invoicesStatus.loading = true;
      state.invoicesStatus.error = null;
      state.invoicesStatus.empty = false;
    },
    getInvoicesFailure(state, action) {
      state.invoices = [];
      state.invoicesStatus.loading = false;
      state.invoicesStatus.error = action.payload;
      state.invoicesStatus.empty = false;
    },
    getInvoicesSuccess(state, action) {
      const invoices = action.payload;

      state.invoices = invoices;
      state.invoicesStatus.loading = false;
      state.invoicesStatus.error = false;
      state.invoicesStatus.empty = !invoices.length || invoices.length === 0;
    },
  },
});
export default slice.reducer;
export function getInvoiceReq(invoiceId) {
  return async (dispatch) => {
    dispatch(slice.actions.getInvoiceStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.invoice.my}/${invoiceId}`);
      dispatch(slice.actions.getInvoiceSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getInvoiceFailure(error));
    }
  };
}

export function getTotalPaindReq() {
  return async (dispatch) => {
    dispatch(slice.actions.getTotalPaindStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.invoice.totalPaid}`);
      dispatch(slice.actions.getTotalPaindSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getTotalPaindFailure(error));
    }
  };
}

export function getInvoicesReq() {
  return async (dispatch) => {
    dispatch(slice.actions.getInvoicesStart());
    try {
      const response = await jfAppApi.get(`${API_ENDPOINTS.invoice.invoices}`);
      dispatch(slice.actions.getInvoicesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.getInvoicesFailure(error));
    }
  };
}
