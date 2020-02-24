import React, { useState } from 'react';
import { BackgroundImage, TagWrapper, EditButton } from './profile.view.style';
import { Box, Tag, Button } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'utils/auth';
import { useParams } from 'react-router-dom';
import { USER } from './profile.graphql';
import { useQuery } from '@apollo/react-hooks';
import EditUserDialog from './EditUserDialog';
import FormModal from 'component/FormModal/FormModal';

const ProfileView: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { slug } = useParams();
  const { user } = useAuthState();

  const username = 'pass';

  const getName = () => {
    if (slug && slug !== '') return slug;
    if (user) return user.name;

    return undefined;
  };

  const { loading, error, data } = useQuery(USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      name: getName(),
    },
  });

  if (loading) return <>loading...</>;

  const { name, email, avatar, description } = data.user;

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <BackgroundImage src="https://www.gdansk.pl/download/2019-09/135042.jpg" />
      <Box
        mt={-130}
        p={4}
        borderRadius={5}
        width={'80%'}
        backgroundColor={'white'}
        display={'flex'}
        justifyContent={'space-around'}
        flexDirection={'column'}
        minHeight={'240px'}
        maxHeight={'280px'}
        alignContent={'space-around'}
        alignItems={'center'}
        boxShadow={'spread'}
        position={'relative'}
      >
        {user && username === user.name && (
          <EditButton
            mt={4}
            mr={4}
            borderRadius={0}
            boxShadow="insetNeo"
            onClick={() => setIsOpen(true)}
          >
            <FontAwesomeIcon size={'lg'} icon={faEdit} />
          </EditButton>
        )}
        <span>Hubert Suprunowicz</span>
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          pr={3}
          pl={3}
        >
          <p style={{ fontSize: '12px', margin: 0 }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <hr style={{ width: '100%' }} />
          <h4 style={{ fontSize: '14px', margin: 0 }}>Ulubiona Kuchnia:</h4>
          <TagWrapper>
            <Tag bg={'primary.500'}>Polska</Tag>
            <Tag bg={'primary.500'}>Azjatycka</Tag>
            <Tag bg={'primary.500'}>Staropolska</Tag>
          </TagWrapper>
        </Box>
      </Box>
      <Box mt={5}>
        <Button bg={'secondary.800'} borderRadius={'5px'} mr={4}>
          Send Message
        </Button>
        <Button bg={'warn.600'} borderRadius={'5px'}>
          Recipes
        </Button>
      </Box>
      {data && (
        <FormModal
          title="Edit User"
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          allRequired={false}
        >
          <EditUserDialog user={data.user} setIsOpen={setIsOpen} />
        </FormModal>
      )}
    </Box>
  );
};

export default ProfileView;
