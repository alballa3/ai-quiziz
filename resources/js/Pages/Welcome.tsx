import AboutUs from "@/Components/pages/index/aboutus";
import AIIntegration from "@/Components/pages/index/AI";
import CallToAction from "@/Components/pages/index/call";
import Features from "@/Components/pages/index/features";
import Hero from "@/Components/pages/index/hero";
import HowItWorks from "@/Components/pages/index/howitwork";
import Testimonials from "@/Components/pages/index/user";
import Guest from "@/Layouts/GuestLayout";

export default function Welcome(){
    return(
        <Guest>
            <Hero/>
            <AboutUs/>
            <Features/>
            <HowItWorks/>
            <Testimonials/>
            <AIIntegration/>
            <CallToAction/>
        </Guest>
    )
}
