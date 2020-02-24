import React, { useState } from 'react';
import Modal from 'react-modal';
import { FormModalStyle, modalStyle, CloseButton } from './form.modal.style';
import { Box, IconButton, Button, Text } from 'style';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BooleanValueNode } from 'graphql';

type Props = {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  submitData?: ({}: any) => Promise<void>;
  allRequired?: boolean;
};

const FormModal: React.FC<Props> = ({
  children,
  title,
  isOpen,
  closeModal,
  submitData,
  allRequired = true,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      ariaHideApp={false}
    >
      <FormModalStyle pl={6} pr={6}>
        <Box pl={6} pr={6} display="flex" justifyContent="space-between">
          <Box>
            <h3>{title}</h3>
            {allRequired && (
              <Text color={'grey.500'} fontSize={0}>
                * All fields are required
              </Text>
            )}
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
        {children}
      </FormModalStyle>
    </Modal>
  );
};

export default FormModal;
