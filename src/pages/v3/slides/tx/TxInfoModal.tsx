import Modal from "pages/common/Modal";
import { TxItem } from "./TxItem";
import { FaSpinner } from "react-icons/fa";

interface TxInfoModalProps {
  closeModal: () => void;
  descriptions: string[];
}
export const TxInfoModal = ({ closeModal, descriptions }: TxInfoModalProps) => {
  return (
    <Modal closeModal={closeModal} title="Transaction Details">
        <div className="py-1" />
      {descriptions.length > 0 ? (
        descriptions.map((d, i) => <TxItem description={d} key={i} />)
      ) : (
        <div className="flex-col flex-center py-8">
          <FaSpinner className="animate-spin" size={42} />
          <p className="text-xl mt-4">Loading...</p>
        </div>
      )}
      <div className="p-4 flex">
        <button onClick={closeModal} className="w-full btn btn-primary-active">
          Continue
        </button>
      </div>
    </Modal>
  );
};
