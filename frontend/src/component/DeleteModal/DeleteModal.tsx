import React from 'react';
import Modal from 'react-modal';
import { Box, Text, Button } from 'style';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { modalStyle, CloseButton } from 'component/FormModal/styles';
import { DeleteModalStyle } from './styles';

type Props = {
  title: string;
  itemName: string;
  isOpen: boolean;
  closeModal: () => void;
  onDelete: any;
};

const DeleteModal: React.FC<Props> = ({
  title,
  itemName,
  isOpen,
  closeModal,
  onDelete,
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
        <Box mt={8} mb={8}>
          <Text textAlign={'center'}>
            Are you sure to delete <Text color={'danger.700'}>{itemName}</Text>?
          </Text>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            onClick={onDelete}
            p={5}
            color={'danger.700'}
            boxShadow="neumorphism"
            mr={5}
          >
            Delete
          </Button>
          <Button
            onClick={closeModal}
            p={5}
            color={'grey.800'}
            boxShadow="neumorphism"
            type={'button'}
          >
            Cancel
          </Button>
        </Box>
      </DeleteModalStyle>
    </Modal>
  );
};

export default DeleteModal;
