import Header from "../../components/User/Header";
import HeroSection from "../../components/User/HeroSection";
import ProductCard from "../../components/User/ProductCard";

const LandingPage: React.FC<{}> = () => {
    return(
      <>
      <div className="mx-2">
     <Header/>
     <HeroSection/>
     <ProductCard/>
     </div>
      </>
    )
  };
  


export default LandingPage