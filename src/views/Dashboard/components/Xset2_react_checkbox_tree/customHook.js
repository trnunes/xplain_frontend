import { useState, useEffect } from 'react';

let listeners = [];
let state = { };

const setState = (newState) => {
  state = { ...state, ...newState };
  
  listeners.forEach((listener) => {
    listener(state);
  });
};

const useCustom = () => {
    
    const newListener = useState()[1];
    useEffect(() => {
        listeners.push(newListener);
        return () => {
            // Called just before the component unmount
            listeners = listeners.filter(listener => listener !== newListener);
        };
    }, []);
    return [state, setState];
};

export default useCustom;