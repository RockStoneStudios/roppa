import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Typography } from '@mui/material'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'
import { ProductList } from '../../components/products'
import { IProduct } from '../../interfaces'

const MenPage = () => {
    const {products,isLoading} = useProducts<IProduct[]>('/products?gender=men');
  return (
    <ShopLayout title={'Teslo-Shop - Mens'} pageDescription={'Encuentra los mejores productos para Hombres'}>
        <Typography variant='h1'>Men</Typography>
        
        
        {
           isLoading
            ?  <FullScreenLoading/>
             : <ProductList products={ products }/>
        }
    
    
     </ShopLayout>
  )
}

export default MenPage;