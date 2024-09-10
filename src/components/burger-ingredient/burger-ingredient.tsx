import React, { FC, memo, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {useDispatch, useSelector} from '../../services/store'
import { addBun, addIngredients} from '../../slices/ingredientsConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
		const dispatch = useDispatch()
    const location = useLocation();
    const handleAdd = () => {
			const { type} = ingredient
			const dataBun = ingredient
			if(type === 'bun'){
			dispatch(addBun(dataBun))
			} else if (type !== 'bun'){
				dispatch(addIngredients(ingredient))
			} 
			
		};

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
