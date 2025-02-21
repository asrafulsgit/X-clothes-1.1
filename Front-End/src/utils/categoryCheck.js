
import { subCategories,categories } from "../allProductDetails/ProductCategories"

export const subCategory =(category)=>{
     for(let item of subCategories){
          if(item.category === category){
               return true;
          }
     }
}

export const categoryCheck = (category)=>{
     for(let item of categories){
          if(item.category == category){
               return true ;
          }
     }
}
