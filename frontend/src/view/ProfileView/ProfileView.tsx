import React, { useState } from 'react';
import { BackgroundImage, TagWrapper, TagText } from './styles';
import { Box, Tag, Button, LinkButton, Text } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'utils/auth';
import { useParams } from 'react-router-dom';
import { USER } from './profile.graphql';
import { useQuery } from '@apollo/react-hooks';
import UpdateUserDialog from './UpdateUserDialog';
import FormModal from 'component/FormModal/FormModal';
import { RECIPES_VIEW } from 'view/Route/constants.route';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';

const defaultAvatar = 'img/user-solid.svg';

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

  if (error) return <ErrorRedirect error={error} />;
  if (!data) return null;
  const { name, avatar, description, recipe } = data.User[0];

  return (
    <LoadingOverlay isLoading={loading}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <BackgroundImage
          src={avatar ? avatar : defaultAvatar}
          alt={name + '_avatar'}
        />

        <Box
          mt={-130}
          p={7}
          borderRadius={0}
          width={'80%'}
          backgroundColor={'white'}
          display={'flex'}
          justifyContent={'space-around'}
          flexDirection={'column'}
          minHeight={'240px'}
          maxHeight={'340px'}
          alignContent={'space-around'}
          alignItems={'center'}
          boxShadow={'spread'}
          position={'relative'}
        >
          <Text variant={'cursive'} color={'grey.900'} mt={-20} fontSize={40}>
            {name}
          </Text>
          <Text fontSize={0} margin={0}>
            {description}
          </Text>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            pr={3}
            pl={3}
          >
            {recipe && recipe.length > 0 && (
              <>
                <TagText
                  color={'grey.300'}
                  fontWeight={700}
                  fontSize={65}
                  variant={'cursive'}
                >
                  Favourites!
                </TagText>
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
        </Box>

        <Box mt={5}>
          {(user && user.name === username) ||
            (!username && (
              <Button
                color={'secondary.600'}
                onClick={() => setIsOpen(true)}
                mr={4}
                boxShadow={'neumorphism'}
              >
                Edit Profile
              </Button>
            ))}
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
            <UpdateUserDialog
              refetch={refetch}
              user={data.User[0]}
              setIsOpen={setIsOpen}
            />
          </FormModal>
        )}
      </Box>
    </LoadingOverlay>
  );
};

export default ProfileView;
