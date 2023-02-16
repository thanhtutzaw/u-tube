import React from 'react'
import { Item } from './Item';
import Comments from './Comments';

export function Comment() {
  return (
      <>
          {Array.from(Array(10), (_, i) => (
              <Item  key={i} />
          ))}
      </>
  );
}

