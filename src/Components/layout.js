import Header from "./header";
import Homesection from "./section";
import Footer from "./footer";
import Mainmenu from "./main";


function Layouts(props) {
    return (
        <div>
            <Header />
            <Mainmenu/>
            <Homesection />
            <Footer />
        </div>
    );
}

export default Layouts;