import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './Icons.jsx';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]):not(.hp), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Accessible dialog: traps focus, closes on Escape or backdrop click,
// locks page scroll and returns focus to whatever opened it.
export default function Modal({ open, onClose, labelledBy, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      panelRef.current ? Array.from(panelRef.current.querySelectorAll(FOCUSABLE)) : [];

    const frame = requestAnimationFrame(() => {
      const items = focusables();
      const firstField = items.find((el) => !el.hasAttribute('data-close'));
      (firstField || items[0] || panelRef.current)?.focus();
    });

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal__panel" role="dialog" aria-modal="true" aria-labelledby={labelledBy} ref={panelRef} tabIndex={-1}>
        <button type="button" className="modal__close" data-close aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
