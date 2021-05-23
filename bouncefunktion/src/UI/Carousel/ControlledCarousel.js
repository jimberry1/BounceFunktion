import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '90vh',
        width: '100vw',
        zIndex: 0,
        overflow: 'hidden',
      }}
      controls={false}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1605211419780-4f71a6227d21?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG11c2ljJTIwcHJvZHVjdGlvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="First slide"
          style={{ height: '90vh', width: '100%', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBwcm9kdWN0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="Second slide"
          style={{ height: '90vh', width: '100%', objectFit: 'cover' }}
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1582024959432-aee9b60ff4e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWMlMjBwcm9kdWN0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          alt="Third slide"
          style={{ height: '90vh', width: '100%', objectFit: 'cover' }}
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
