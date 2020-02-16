import React, { useState, useEffect, useReducer, memo } from 'react';
import axios from 'axios';
import {
  FixedSizeList as List,
  FixedSizeList,
  ListChildComponentProps,
  ListOnItemsRenderedProps,
} from 'react-window';
import { Box } from 'style';
import InfiniteLoader from 'react-window-infinite-loader';

type Props = {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  items: Item[];
  loadNextPage: (limit: number, offset: number) => Promise<any> | any;
};
const ExampleWrapper: React.FC<Props> = ({
  hasNextPage,
  isNextPageLoading,
  items,
  loadNextPage,
}) => {
  const [limit, setLimit] = useState(10);
  const ITEM_SIZE = 56;
  const loadMoreItems = isNextPageLoading
    ? () => {}
    : (startIndex: number, stopIndex: number) =>
        loadNextPage(startIndex, stopIndex);
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  function onItemsRendered({
    visibleStartIndex,
    visibleStopIndex,
  }: ListOnItemsRenderedProps) {
    if (!isItemLoaded(0)) {
      loadMoreItems(limit, 0);
    }

    if (!isItemLoaded(visibleStartIndex)) {
      loadMoreItems(limit, visibleStartIndex);
    }

    if (!isItemLoaded(visibleStopIndex)) {
      loadMoreItems(limit, visibleStopIndex);
    }
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={100}
      loadMoreItems={loadMoreItems}
    >
      {({ ref }) => (
        <FixedSizeList
          itemCount={100}
          itemSize={ITEM_SIZE}
          width={800}
          height={450}
          onItemsRendered={onItemsRendered}
          ref={ref}
          style={{ border: '2px solid red' }}
        >
          {({ style, index, data }) => (
            <Item
              index={index}
              style={style}
              isItemLoaded={isItemLoaded}
              items={items}
              data={data}
            />
          )}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
};

type Item = {
  id: number;
  name: string;
  timestamp: string;
};

const TestView = () => {
  const [items, setItems] = useState<Item[]>([]);

  const hasNextPage = items.length < 100;
  const isNextPageLoading = false;
  const loadNextPage = (limit: number, offset: number) => {
    console.log('-------LOAD NEXT PAGE-------');
    let temp = items;

    axios
      .post('http://localhost:4000/test', {
        limit: limit,
        offset: offset,
      })
      .then(res => {
        res.data.forEach((el: Item) => {
          if (!(el.id in items)) temp.push(el);
        });

        setItems(temp);
      });
  };

  return (
    <Box>
      <ExampleWrapper
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        items={items}
        loadNextPage={loadNextPage}
      />
    </Box>
  );
};

// ListChildComponentProps
const Item: React.FC<any> = ({ index, style, isItemLoaded, items }: any) => {
  let content = <>loading...</>;
  if (isItemLoaded(index)) {
    content = (
      <>
        id:{items[index].id}, name: {items[index].name}
      </>
    );
  }

  return <div style={style}>{content}</div>;
};

export default TestView;
