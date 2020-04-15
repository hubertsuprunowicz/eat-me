import React from 'react';
import { Box, IconButton, Text } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { WatchesList, SubscribeTag } from './watches.view.style';
import { Link } from 'react-router-dom';
import { useSubscription, useQuery } from '@apollo/react-hooks';
import { RECIPE_DISCOVERD, WATCHES_RECIPES } from './watches.graphql';
import { useAuthState } from 'utils/auth';
import ErrorRedirect from 'component/ErrorRedirect/errorRedirect';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';

const WatchesView: React.FC = () => {
  const { user } = useAuthState();
  const { data, loading, subscribeToMore } = useQuery(WATCHES_RECIPES, {
    fetchPolicy: 'cache-and-network',
    variables: { id: user!._id },
  });

  subscribeToMore({
    document: RECIPE_DISCOVERD,
    variables: { id: user!._id },
    onError: err => {
      return <ErrorRedirect error={err.message} />;
    },
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev.messages;

      // Needed due to multiple resubscriptions
      if (
        prev.watchesRecipes.length > 0 &&
        prev.watchesRecipes[prev.watchesRecipes.length - 1].id ===
          subscriptionData.data.newRecipeDiscover.id
      )
        return prev.watchesRecipes;

      return {
        watchesRecipes: [
          ...prev.watchesRecipes,
          subscriptionData.data.newRecipeDiscover,
        ],
      };
    },
  });

  if (loading) return <>loading...</>;

  return (
    <Box p={5} style={{ paddingBottom: '80px' }}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <span>Watches</span>
        <IconButton bg="transparent">
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </Box>
      <LoadingOverlay isLoading={loading}>
        <WatchesList>
          {data &&
            data.watchesRecipes.map((it: any) => (
              <li key={it.id}>
                <Link to="/profile">
                  <img src={it.image} alt={it.name + '_image'} />
                  <Text fontSize={0} fontWeight={400}>
                    by{' '}
                  </Text>
                  <Text fontSize={0} fontWeight={700}>
                    {it.user.name}
                  </Text>
                </Link>
              </li>
            ))}
        </WatchesList>
      </LoadingOverlay>
    </Box>
  );
};

export default WatchesView;
