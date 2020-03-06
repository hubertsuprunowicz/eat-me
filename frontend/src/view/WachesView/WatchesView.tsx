import React from 'react';
import { Box, IconButton, Tag } from 'style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { WatchesList, SubscribeTag } from './watches.view.style';
import { Link } from 'react-router-dom';

type Props = {};

const WatchesView: React.FC<Props> = () => {
  return (
    <Box p={5} style={{ paddingBottom: '80px' }}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <span>Watches</span>
        <IconButton bg="transparent">
          <FontAwesomeIcon icon={faEllipsisV} />
        </IconButton>
      </Box>
      <WatchesList>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRW-6kkUVv1JWapToUlIq_3xoAfiSssBvyptHJhBUbPeoiR9fZ"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTH554DH7o2j2D4yHITgUX7ADnFF-3unX2AOLmRMwH9EnjtOFG-"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGb7lDEd5Q6foBfeZGU-SBBFuCei9vy_4z2H3iaLAhEkdpE9Qv"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSmVLcEkcHmbDfmachF6prNvSIvny2iCzW11Kj7NbCDgoyfxiYx"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCBx28acYlpUdfYPOqB4_mlpIjtUkASTbRADpECTW78vVlVEzf"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS_bplhWkKldrNAwNLeyUhGCQXQW7zdvlgPRqXXKt4VdFqAKGXF"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
        <li>
          <Link to="/profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTxUfSevDDou209NwNJlJV0nHhi_5LpNgOIQOnLaMzSHHnyEDfr"
              alt=""
            />
            <b style={{ fontSize: '14px' }}>Lorem ipsum</b>
          </Link>
          <SubscribeTag
            defaultValue={'0'}
            p={0}
            m={0}
            bg={'warn.600'}
            color={'grey.700'}
          >
            3
          </SubscribeTag>
        </li>
      </WatchesList>
    </Box>
  );
};

export default WatchesView;
