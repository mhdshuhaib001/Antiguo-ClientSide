import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

const whatsappIcon = "/icons/whatsapp.png";
const gmailIcon = "/icons/gmail.png";
const notificationIcon = "/icons/notification.png";

interface NotificationMethodSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: string) => void;
}

const NotificationMethodSelector: React.FC<NotificationMethodSelectorProps> = ({
  isOpen,
  onClose,
  onSelectMethod
}) => {
  const notificationMethods = [
    { icon: whatsappIcon, label: "Whatsapp" },
    { icon: gmailIcon, label: "Email" },
    { icon: notificationIcon, label: "Notification" }
  ];

  const handleSelect = (label: string) => {
    onSelectMethod(label);
    onClose();
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        className="bg-white max-w-2xl mx-auto max-h-full	"
      >
        <ModalContent 
          className="bg-gray-50 shadow-lg rounded-lg h-auto" 
          style={{ padding: "2rem" }} 
        >
          <ModalHeader 
            className="flex flex-col gap-1 text-amber-900 border-b border-amber-200 text-lg font-bold"
          >
            Choose Notification Method
          </ModalHeader>
          <ModalBody className="py-6  ">
            <div className="flex justify-around gap-4">
              {notificationMethods.map((method, index) => (
                <Button
                  key={index}
                  className="flex flex-col items-center bg-transparent hover:bg-amber-100 text-amber-900 transition-transform transform hover:scale-110" // Add hover effect
                  onPress={() => handleSelect(method.label)}
                  style={{ padding: "1rem", borderRadius: "0.5rem", height: "120px" }} 
                  >
                  <img src={method.icon} alt={method.label} className="w-12 h-12 mb-2" /> 
                  <span className="text-lg font-medium">{method.label}</span> 
                </Button>
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationMethodSelector;
