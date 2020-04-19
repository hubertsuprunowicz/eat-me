import React from 'react';
import Modal from 'react-modal';
import { Box, Text } from 'style';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { modalStyle, CloseButton } from 'component/FormModal/styles';
import { DeleteModalStyle } from './styles';

type Props = {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  submitData?: (arg: any) => Promise<void>;
};

const DeleteModal: React.FC<Props> = ({
  children,
  title,
  isOpen,
  closeModal,
  submitData,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      ariaHideApp={false}
    >
      <DeleteModalStyle pl={6} pr={6}>
        <Box pl={6} pr={6} display="flex" justifyContent="space-between">
          <Box>
            <h3>{title}</h3>
          </Box>
          <CloseButton
            mt={6}
            onClick={closeModal}
            borderRadius={0}
            boxShadow="insetNeo"
          >
            <FontAwesomeIcon size={'lg'} icon={faTimes} />
          </CloseButton>
        </Box>
        <Box>
          <Text></Text>
        </Box>
      </DeleteModalStyle>
    </Modal>
  );
};

export default DeleteModal;
