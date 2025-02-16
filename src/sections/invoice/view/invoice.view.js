'use client';
// eslint-disable-next-line simple-import-sort/imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import EmptyContent from 'src/components/empty-content/empty-content';
import Iconify from 'src/components/iconify/iconify';
import LoadingProgress from 'src/components/loading-progress';
import useInvoice from 'src/hooks/use-invoice';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import InvoiceItem from '../invoice-item';

export default function InvoiceView() {
  const { invoices, onGetInvoices, invoicesStatus } = useInvoice();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const initialize = useCallback(async () => {
    setLoading(true);
    try {
      await onGetInvoices();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <Stack spacing={1} direction="row">
        <Button
          component={RouterLink}
          href={paths.dashboard.home.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Voltar
        </Button>
      </Stack>
      <Box
        sx={{
          mt: 1,
          width: 1,
          height: 'auto',
          padding: '10px 0',
        }}
      >
        <Typography variant="h3" textAlign={'center'}>
          Minhas faturas
        </Typography>
        <Box p={2}>
          {loading ? (
            <LoadingProgress />
          ) : (
            <>
              {invoicesStatus.empty && (
                <EmptyContent
                  imgUrl="/assets/icons/empty/ic_content.svg"
                  sx={{
                    borderRadius: 1.5,
                    bgcolor: 'background.default',
                    height: '50vh',
                  }}
                  title="Nenhum histórico encontrado"
                />
              )}
              {invoices && !invoicesStatus.empty && user && (
                <Box
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  }}
                >
                  {invoices.map((invoice) => (
                    <Fragment key={invoice.id}>
                      <InvoiceItem invoice={invoice} customer={user} />
                    </Fragment>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
