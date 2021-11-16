import Carousel from "react-bootstrap/Carousel"
import landing1 from "../assets/male-carousel.jpg"
import landing2 from "../assets/moda_tendencias_voguees_965319015.jpg"
import landing3 from "../assets/kid-carousel.jpg"

function CarouselComp(){

   // TODO: Recortar las imágenes del carousel y con photopea y cambiarlas según el breakpoint
    return (<Carousel fade>
    <Carousel.Item>
      {/* //FIXME: CENTRAR IMÁGENES AL HACERLAS RESPONSIVE */}
      <img
        className="mx-auto d-block"
        src={landing1}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="mx-auto d-block"
        src={landing2}
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="mx-auto d-block"
        src={landing3}
        alt="Third slide"
      />
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>)
}
export default CarouselComp