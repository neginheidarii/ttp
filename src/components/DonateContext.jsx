import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import DonateModal from './DonateModal.jsx';

const DonateCtx = createContext({ openDonate: () => {} });

// Lets any button on the site open the donation popup: const { openDonate } = useDonate();
// openDonate('partner-one') pre-selects a partner.
export function DonateProvider({ children }) {
  const [state, setState] = useState({ open: false, partner: 'most' });
  const openDonate = useCallback((partner) => {
    setState({ open: true, partner: typeof partner === 'string' ? partner : 'most' });
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  const value = useMemo(() => ({ openDonate }), [openDonate]);
  return (
    <DonateCtx.Provider value={value}>
      {children}
      <DonateModal open={state.open} partner={state.partner} onClose={close} />
    </DonateCtx.Provider>
  );
}

export const useDonate = () => useContext(DonateCtx);
