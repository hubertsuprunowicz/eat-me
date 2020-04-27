import React, { useState } from 'react';
import { BackgroundImage, TagWrapper, TagText } from './styles';
import { Box, Tag, Button, LinkButton, Text, IconButton } from 'style';
import { useAuthState, useAuthDispatch } from 'utils/auth';
import { useParams } from 'react-router-dom';
import UpdateUserDialog from './UpdateUserDialog';
import FormModal from 'component/FormModal/FormModal';
import { RECIPES_VIEW } from 'utils/constants.route';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';
import { useGetUserQuery, User } from 'model/generated/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const defaultAvatar = 'img/user-solid.svg';

const ProfileView: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { username } = useParams();
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();

  const getName = () => {
    if (username && username !== '') return username;
    if (user) return user.name;

    throw new Error('Something went wrong. Plese come back later.');
  };

  const { loading, error, data, refetch } = useGetUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      name: getName(),
    },
  });

  const handleLogout = () => {
    dispatch({
      type: 'logout',
    });
  };

  if (error) return <ErrorRedirect error={error} />;
  if (!data) return null;

  const userData = data?.User?.[0];

  return (
    <LoadingOverlay isLoading={loading}>
      {userData && (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <BackgroundImage
            src={userData.avatar ? userData.avatar : defaultAvatar}
            alt={userData.name + '_avatar'}
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
            <Text color={'grey.800'} mt={-20} fontSize={30}>
              {userData.name}
            </Text>
            <Text fontSize={0} margin={0}>
              {userData.description}
            </Text>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              pr={3}
              pl={3}
            >
              {userData.recipe && userData.recipe.length > 0 && (
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
                    {userData.recipe.slice(0, 3).map((it) => {
                      if (it?.tag && it.tag.length > 0)
                        return (
                          <Tag
                            key={it?.tag[0]._id ? it?.tag[0]._id : ''}
                            bg={'primary.500'}
                          >
                            {it?.tag[0].name}
                          </Tag>
                        );
                    })}
                  </TagWrapper>
                </>
              )}
            </Box>
          </Box>

          <Box display="flex" mt={7}>
            {(user && user.name === username) ||
              (!username && (
                <Button
                  variant="secondary"
                  onClick={() => setIsOpen(true)}
                  mr={5}
                >
                  Edit Profile
                </Button>
              ))}
            <LinkButton
              to={`${RECIPES_VIEW}/${getName()}`}
              mr={5}
              variant="warn"
            >
              Recipes
            </LinkButton>
            {(user && user.name === username) ||
              (!username && (
                <IconButton onClick={handleLogout}>
                  <FontAwesomeIcon size={'1x'} icon={faSignOutAlt} />
                </IconButton>
              ))}
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
                user={userData as User}
                setIsOpen={setIsOpen}
              />
            </FormModal>
          )}
        </Box>
      )}
    </LoadingOverlay>
  );
};

export default ProfileView;
