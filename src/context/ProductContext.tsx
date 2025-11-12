import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types';
import { initialProducts } from '../data/initialProducts';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { v4 as uuidv4 } from 'uuid';

type State = { products: Product[] };

type Action =
  | { type: 'INIT'; payload: Product[] }
  | { type: 'ADD'; payload: Omit<Product, 'id'> }
  | { type: 'UPDATE'; payload: Product }
  | { type: 'DELETE'; payload: { id: string } };

const initialState: State = { products: [] };

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return { products: action.payload };
    case 'ADD': {
      const newP: Product = { id: uuidv4(), ...action.payload };
      return { products: [newP, ...state.products] };
    }
    case 'UPDATE': {
      return {
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    }
    case 'DELETE': {
      return { products: state.products.filter((p) => p.id !== action.payload.id) };
    }
    default:
      return state;
  }
}

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = getFromLocalStorage('products');
    if (stored && stored.length) dispatch({ type: 'INIT', payload: stored });
    else dispatch({ type: 'INIT', payload: initialProducts });
  }, []);

  useEffect(() => {
    saveToLocalStorage('products', state.products);
  }, [state.products]);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
