import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/react';
import CategoryForm from '../../containers/adminContainer/CategoryForm';
import { Category, UploadCategory } from '../../interface/adminTypes/adminApiTypes';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UploadCategory) => void;
  category?: Category | null;
  isEditMode: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSave, category, isEditMode }) => {
  const handleCategorySubmit = (data: UploadCategory) => {
    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="lg">
      <ModalContent>
        <ModalHeader>
          <h2 className="text-lg font-bold">
            {isEditMode ? 'Edit Category' : 'Add New Category'}
          </h2>
        </ModalHeader>
        <ModalBody className="p-7">
          <CategoryForm
            onSave={handleCategorySubmit}
            initialData={category}
            isEditMode={isEditMode}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CategoryModal;
