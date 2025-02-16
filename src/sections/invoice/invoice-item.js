import PrintIcon from '@mui/icons-material/Print';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { useRef } from 'react';
import Label from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';

import InvoicePDF from './pdf/invoice-pdf';

// {format(new Date(date_published), 'dd MMM yyyy')}
export default function InvoiceItem({ invoice, customer }) {
  const parentRef = useRef(null);
  const view = useBoolean();

  const renderStatus = () => {
    switch (invoice.status) {
      case 'paid':
        return (
          <Label variant="soft" color={'success'}>
            Pago
          </Label>
        );
      case 'pending':
        return (
          <Label variant="soft" color={'warning'}>
            Pendente
          </Label>
        );
      case 'overdue':
        return (
          <Label variant="soft" color={'error'}>
            Atrasado
          </Label>
        );
      case 'draft':
        return (
          <Label variant="soft" color={'info'}>
            Rascunho
          </Label>
        );
      default:
        <Label variant="soft">-</Label>;
    }
  };
  return (
    <>
      <Stack component={Card} direction="row">
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            width: '100%',
          }}
        >
          <Stack direction="row" pb={2}>
            <Box flexGrow={1}>{renderStatus()}</Box>
          </Stack>
          <Stack spacing={1} flexGrow={1}>
            <Box component="span" sx={{ typography: 'subtitle2' }}>
              {`Número:  ${invoice.invoiceNumber || '-'}`}
            </Box>
            <Box component="span" sx={{ typography: 'subtitle2' }}>
              {`Valor:  ${invoice.totalAmount || '-'}`}
            </Box>
            <Box component="span" sx={{ typography: 'subtitle2' }}>
              {`Vencimento:  ${format(new Date(invoice.dueDate), 'dd/MM/yyyy')}`}
            </Box>
            <Box component="span" sx={{ typography: 'subtitle2' }}>
              {`Descrição: ${invoice.description || '-'}`}
            </Box>
            {invoice.status === 'paid' && (
              <PDFDownloadLink
                document={<InvoicePDF invoice={invoice} customer={customer} />}
                fileName={invoice.invoiceNumber}
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <>
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Button variant="contained" endIcon={<PrintIcon />} onClick={view.onTrue}>
                        Baixar comprovante
                      </Button>
                    )}
                  </>
                )}
              </PDFDownloadLink>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
