import React from 'react'
import './layout.css'
// import women from '../../../assets/layout/women.png'
// import men from '../../../assets/layout/men.png'
// import kids from '../../../assets/layout/kids.png'
const Layout = () => {
  return (
    <div className='product-layout-page'>
          <div className="womens-layout">
               <div className="womens-layout-details">
                    <p className='item-count'>2000+ Items</p>
                    <h1>For Women's</h1>
                    <div className="item-name">
                         <p>Sarees</p>
                         <p>Shalwar-Kamiz</p>
                         <p>Kurta</p>
                         <p>Dresses</p>
                         <p>Hijab</p>
                    </div>
               </div>
          </div>
          <div className="mans-layout">
               <div className="mans-layout-details">
               <p className='item-count'>2500+ Items</p>
               <h1>For Men's</h1>
               <div className='items-name'>
                    <p>Blazers</p>
                    <p>T-Shtirts and Shirts</p>
                    <p>Jackets & Hoodie</p>
                    <p>Panjabi</p>
               </div>
               </div>
          </div>
          <div className="kids-layout">
              <div className="kids-layout-details">
               <p className='item-count'>1000+ Items</p>
                    <h1>For Kid's</h1>
                    <div className="item-name">
                         <p>Shirts</p>
                         <p>Panjabi</p>
                         <p>Three-piece</p>
                         <p>Frocks</p>
                    </div>
              </div>
          </div>
    </div>
  )
}

export default Layout
