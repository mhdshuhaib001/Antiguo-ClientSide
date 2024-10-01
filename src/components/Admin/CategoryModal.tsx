import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import CategoryForm from '../../containers/adminContainer/CategoryForm';

const CategoryModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (data: { name: string; image: File | null; icon: File | null }) => void }> = ({ isOpen, onClose, onSave }) => {
  
  const handleCategorySubmit = (data: { name: string; image: File | null; icon: File | null }) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop='blur' size='lg'>
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h2 className="text-lg font-bold">Add New Category</h2>
            </ModalHeader>
            <ModalBody className='p-7'>
              <CategoryForm onSave={handleCategorySubmit} />
            </ModalBody>
            
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
