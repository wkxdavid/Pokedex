import React from "react";

import { FullShopGrid } from './shop-components/ShopFullGrid.js';

export function ShopPage(props) {
  const data = props.data;
  const currentUser = props.currentUser
  const pokeCoins = props.pokeCoins
  return(
    <main>
      <FullShopGrid data={data} currentUser={currentUser} pokeCoins={pokeCoins}/>
    </main>
  )
}
