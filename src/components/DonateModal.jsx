import Modal from './Modal.jsx';
import DonationForm from './DonationForm.jsx';

export default function DonateModal({ open, partner, onClose }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="donate-modal-title">
      <div className="modal__head">
        <h2 id="donate-modal-title" className="modal__title">Support education</h2>
        <p className="modal__sub">Your support helps trusted partner NGOs expand equitable learning opportunities.</p>
      </div>
      <DonationForm variant="modal" initialPartner={partner} onDone={onClose} />
    </Modal>
  );
}
