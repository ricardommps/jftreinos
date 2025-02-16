import { useCallback } from 'react';
import { getInvoiceReq, getInvoicesReq, getTotalPaindReq } from 'src/redux/slices/invoice';
import { useDispatch, useSelector } from 'src/redux/store';
export default function useInvoice() {
  const dispatch = useDispatch();
  const { invoice, invoiceStatus, invoiceTotalPaid, invoices, invoicesStatus } = useSelector(
    (state) => state.invoice,
  );

  const onGetInvoice = useCallback(
    async (invoiceId) => {
      await dispatch(getInvoiceReq(invoiceId));
    },
    [dispatch],
  );

  const onGetTotalPaind = useCallback(async () => {
    await dispatch(getTotalPaindReq());
  }, [dispatch]);

  const onGetInvoices = useCallback(async () => {
    await dispatch(getInvoicesReq());
  }, [dispatch]);

  return {
    onGetInvoice,
    invoice,
    invoiceStatus,
    invoiceTotalPaid,
    onGetTotalPaind,
    invoices,
    invoicesStatus,
    onGetInvoices,
  };
}
