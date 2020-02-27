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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
              src="https://www.gdansk.pl/download/2019-09/135042.jpg"
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
