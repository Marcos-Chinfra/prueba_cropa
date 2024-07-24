const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  console.log(isOpen);
  return (
    <div>
      <div>
        <button onClick={onClose}>X</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
