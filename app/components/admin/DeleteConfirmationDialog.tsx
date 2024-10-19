import { Dialog } from '@headlessui/react';
interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: (id: string) => void;
  selectedId: string | null;
}

const DeleteConfirmationDialog = ({ isOpen, closeModal, handleDelete, selectedId }: DeleteConfirmationDialogProps) => {
    return (
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">Konfirmasi Hapus</Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-700">
              Apakah Anda yakin ingin menghapus data ini?
            </Dialog.Description>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
              >
                Tidak
              </button>
              <button
                onClick={() => handleDelete(selectedId!)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Ya
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  };
  
  export default DeleteConfirmationDialog;  