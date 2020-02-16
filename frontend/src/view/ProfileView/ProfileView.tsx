import React from 'react';
import { BackgroundImage, TagWrapper } from './profile.view.style';
import { Box, Tag, Button } from 'style';

type Props = {
  id?: string;
  name?: string;
  image?: string;
};

// TODO: if not logged - redirect to login view
// if (error) return <ErrorRedirect error={error}>
const ProfileView: React.FC<Props> = ({ id, name, image }) => {
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
      >
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
    </Box>
  );
};

export default ProfileView;
