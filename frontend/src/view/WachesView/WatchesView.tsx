import React from 'react';
import { Box, Text } from 'style';
import { WatchesList } from './styles';
import { Link } from 'react-router-dom';
import { useAuthState } from 'utils/auth';
import LoadingOverlay from 'component/LoadingOverlay/LoadingOverlay';
import { RECIPE_VIEW } from 'view/Route/constants.route';
import ErrorRedirect from 'component/ErrorRedirect/ErrorRedirect';
import {
  useWatchesRecipesQuery,
  NewRecipeDiscoverDocument,
} from 'model/generated/graphql';

const WatchesView: React.FC = () => {
  const { user } = useAuthState();
  const { data, loading, subscribeToMore } = useWatchesRecipesQuery({
    fetchPolicy: 'cache-and-network',
    variables: { id: user?._id ?? '' },
  });

  subscribeToMore({
    document: NewRecipeDiscoverDocument,
    variables: { id: user?._id ?? '' },
    onError: (err) => {
      return <ErrorRedirect error={err.message} />;
    },
    updateQuery: (prev: any, { subscriptionData }: any) => {
      if (!subscriptionData.data) return prev.watchesRecipes;

      // Needed due to multiple resubscriptions
      if (
        prev.watchesRecipes.length > 0 &&
        prev.watchesRecipes[0]._id ===
          subscriptionData.data.newRecipeDiscover._id
      )
        return prev;

      return {
        watchesRecipes: [
          subscriptionData.data.newRecipeDiscover,
          ...prev.watchesRecipes,
        ],
      };
    },
  });

  return (
    <Box p={5} pb={80}>
      <Box display={'flex'} justifyContent={'flex-start'}>
        <span>Watches</span>
      </Box>
      <LoadingOverlay isLoading={loading}>
        <WatchesList>
          {data &&
            data.watchesRecipes.map((it) => (
              <li key={it._id ?? ''}>
                <Link to={`${RECIPE_VIEW}/${it._id}`}>
                  <img src={it.image} alt={it.name + '_image'} />
                  <div>
                    <Text fontSize={0} fontWeight={400}>
                      by{' '}
                    </Text>
                    <Text fontSize={0} fontWeight={700}>
                      {it.user.name}
                    </Text>
                  </div>
                </Link>
              </li>
            ))}
        </WatchesList>
      </LoadingOverlay>
    </Box>
  );
};

export default WatchesView;
