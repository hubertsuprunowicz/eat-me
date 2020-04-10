import React from 'react';

declare type Direction = 'left' | 'right';
// declare type SwipeHandler = (direction: Direction) => void;
declare type SwipeHandler = (direction: Direction) => void;

declare interface Props {
  /**
   * Whether or not to let the element be flicked away off-screen after a swipe
   *
   * @default true
   */
  flickOnSwipe?: boolean;

  /**
   * An array of directions for which to prevent swiping out of screen. Valid arguments are 'left', 'right', 'up' and 'down'.
   *
   * @default []
   */
  preventSwipe?: String[];

  /**
   * Callback that will be executed when a swipe has been completed
   */
  onCardLeftScreen?: SwipeHandler;
}

declare const TinderCard: React.FC<Props>;

export = TinderCard;
