import React from "react";
import SellerProfileCard from "../../components/Seller/SellerProfileCard";
import SellerProfile from "../../components/Seller/SellerProfile";
import Header from "../../components/User/Header";
import Footer from "../../components/User/Footer";


const SellerProfilePage:React.FC=()=>{
    return(
        <>
        <Header/>
        <div>
            <SellerProfile/>
        </div>
        <Footer/>
        </>
    )
}


export default SellerProfilePage