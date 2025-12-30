import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import Ingredients from "@/components/Ingredients";
import ProductDetails from "@/components/ProductDetails";
import QASection from "@/components/QASection";
import OrderSection from "@/components/OrderSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <BrandStory />
            <Ingredients />
            <ProductDetails />
            <QASection />
            <OrderSection />
            <Footer />
        </main>
    );
}
