import React,{useState} from 'react';
import Horizon from '../../baseUI/horizon-item/index';
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";

function Singers () {
    let [category, setCategory] = useState ('');
    let [alpha, setAlpha] = useState ('');
  
    let handleUpdateAlpha = (val) => {
      setAlpha (val);
    }
  
    let handleUpdateCategory = (val) => {
      setCategory (val);
    }
    
    return (
      <NavContainer>
        <Horizon 
          list={categoryTypes} 
          title={"分类:"} 
          handleClick={handleUpdateCategory} 
          oldVal={category}></Horizon>
        <Horizon 
          list={alphaTypes} 
          title={"首字母:"} 
          handleClick={val => handleUpdateAlpha (val)} 
          oldVal={alpha}></Horizon>
      </NavContainer>
    )
  }
  
  export default React.memo (Singers);