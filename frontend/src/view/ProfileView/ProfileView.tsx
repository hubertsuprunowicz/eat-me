import React, { useState } from 'react';
import { BackgroundImage, TagWrapper, EditButton } from './profile.view.style';
import { Box, Tag, Button, LinkButton } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'utils/auth';
import { useParams } from 'react-router-dom';
import { USER } from './profile.graphql';
import { useQuery } from '@apollo/react-hooks';
import EditUserDialog from './EditUserDialog';
import FormModal from 'component/FormModal/FormModal';
import { RECIPES_VIEW } from 'view/Route/constants.route';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';

const defaultAvatar = 'https://www.gdansk.pl/download/2019-09/135042.jpg';

const ProfileView: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { username } = useParams();
  const { user } = useAuthState();

  const getName = () => {
    if (username && username !== '') return username;
    if (user) return user.name;

    throw new Error('Something went wrong. Plese come back later.');
  };

  const { loading, error, data, refetch } = useQuery(USER, {
    fetchPolicy: 'cache-and-network',
    variables: {
      name: getName(),
    },
  });

  if (!data) return null;
  const { name, email, avatar, description, recipe } = data.User[0];

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <BackgroundImage
        src={avatar ? avatar : defaultAvatar}
        alt={name + '_avatar'}
      />
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
        <LoadingOverlay isLoading={loading}>
          {(user && user.name === username) ||
            (!username && (
              <EditButton
                mt={4}
                mr={4}
                borderRadius={0}
                boxShadow="insetNeo"
                onClick={() => setIsOpen(true)}
              >
                <FontAwesomeIcon size={'lg'} icon={faEdit} />
              </EditButton>
            ))}
          <span>{name}</span>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            pr={3}
            pl={3}
          >
            <p style={{ fontSize: '12px', margin: 0 }}>{description}</p>
            {recipe && recipe.length > 0 && (
              <>
                <hr style={{ width: '100%' }} />
                <h4
                  style={{ fontSize: '14px', margin: 0, marginBottom: '5px' }}
                >
                  Favourites!
                </h4>
                <TagWrapper>
                  {recipe.slice(0, 3).map((it: any) => (
                    <Tag key={it.tag[0]._id} bg={'primary.500'}>
                      {it.tag[0].name}
                    </Tag>
                  ))}
                </TagWrapper>
              </>
            )}
          </Box>
        </LoadingOverlay>
      </Box>

      <Box mt={5}>
        <Button
          color={'secondary.600'}
          borderRadius={'5px'}
          mr={4}
          boxShadow={'neumorphism'}
        >
          Send Message
        </Button>
        <LinkButton to={`${RECIPES_VIEW}/${getName()}`} color={'warn.600'}>
          Recipes
        </LinkButton>
      </Box>

      {data && (
        <FormModal
          title="Edit User"
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          allRequired={false}
        >
          <EditUserDialog
            refetch={refetch}
            user={data.User[0]}
            setIsOpen={setIsOpen}
          />
        </FormModal>
      )}
    </Box>
  );
};

export default ProfileView;
