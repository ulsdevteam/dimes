import React from "react";
import { render } from "react-dom";
import TileList from "../../Tile"


const items = [
  {"uri": 1, "title": "item 1", "type": "collection", "dates": {"expression": "1990-1991", "start": "1990-01-01", "begin": "1991-12-31"}},
  {"uri": 2, "title": "item 2", "hits": 4, "dates": []},
  {"uri": 3, "title": "item 3", "type": "person"}
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<TileList items={items} />, div);
});
