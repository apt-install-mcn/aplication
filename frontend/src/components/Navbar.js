import React, { useEffect } from 'react';
import '../style/css/bootstrap.min.css';
import '../style/style.css';
import Gallery from './Gallery';




const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top" data-aos="fade-down" id="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#homePage">
          <img src="./img/logo3.png" alt="Bootstrap" width="230" height="50" className="logo-img" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://127.0.0.1:5500/quieneSomos.html">¿Quiénes somos?</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://127.0.0.1:5500/tienda.html">Tienda</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://127.0.0.1:5500/biblioteca.html">Biblioteca</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="http://localhost:3000/">Blog</a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success" type="submit">
              <img src="./img/mano donar1.svg" alt="Icono" className="icon-img me-2" />
              Donaciones
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

const TuComponente = () => {
  return (
    <div>
      <div className="w-100 overflow-hidden bg-gray-100" id="quienesTop">
        <div className="container">
          <div className="row">
            <div className="container py-4" id="tienda" data-aos="fade-down">
              <div className="px-4 py-3 text-center d-flex justify-content-center align-items-center ">
                <h1 className="display-5 fw-bold text-body-emphasis d-inline-block" id="quieneSomos">Blog</h1>
                <img src="/img/tiendaLogo.png" alt="" className="d-inline-block ml-3" id="quieneSomos" style={{ height: '68px', margin: '15px' }} />
              </div>
              <p className="fs-3 text-center mt-2 mb-5" data-aos="fade-left">Bienvenido a nuestra plataforma dedicada a compartir
               experiencias en la Fundación ADEE. En este espacio, damos voz a aquellos que han sido parte de esta noble causa,
                brindando apoyo y oportunidades. La Fundación ADEE se ha comprometido a transformar vidas, y queremos que tu historia 
                sea parte de ese testimonio.</p>
              <div className="text-center">
              </div>
              <div className="d-flex justify-content-center pb-5 pt-4"  >
                <img src="/img/blog.png " id="quienesImg" alt="" data-aos="fade-down"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Footer = () => {

  const footerStyle = {
    backgroundColor: '#37885a',
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className="container-fluid" id="footer" data-aos="fade-up" style={footerStyle}>
      <div className="row p-5 text-white">
        <div className="col-12 col-md-6 col-lg-3 mx-auto">
          <h3 className="d-flex align-items-center ms-2 mb-3">
            <img src="/img/logo completa empresa.png" alt="Imagen" className="me-2" width="282" height="141" id="redes" />
          </h3>
          <div className="mb-5 ms-2">
            <p>
              Somos una fundación sin ánimo de lucro, inspirados en las personas con ADEE
            </p>
          </div>
          <div className="mb-4 ms-2">
            <div className="d-flex align-items-center ms-2">
              <a href="mailto:contacto@funcoadee.org" className="text-white me-3" target="_blank">
                <img src="/img/gmail.png" alt="Gmail" width="30" height="30" id="redes" />
              </a>
              <a href="https://www.instagram.com/fundacioncolombianaadee/" className="text-white me-3" target="_blank">
                <img src="/img/instagram.png" alt="Instagram" width="30" height="30" id="redes" />
              </a>
              <a href="tel:+573144709947" className="text-white me-3" target="_blank">
                <img src="/img/whatsapp.png" alt="WhatsApp" width="30" height="30" id="redes" />
              </a>
            </div>
          </div>
          <div className="mb-3 ms-2">
            <p>&copy; 2023 Fundacion Colombiana ADEE. Todos los derechos reservados.</p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mx-auto">
          <p className="h5 mb-5">Enlaces</p>
          <div className="mb-4">
            <a className="text-white" id="subrayado" href="#homePage">Home</a>
          </div>
          <div className="mb-4">
            <a className="text-white" id="subrayado" href="quieneSomos.html">¿Quiénes somos?</a>
          </div>
          <div className="mb-4">
            <a className="text-white" id="subrayado" href="tienda.html">Tienda</a>
          </div>
          <div className="mb-4">
            <a className="text-white" id="subrayado" href="biblioteca.html">Biblioteca</a>
          </div>
          <div className="mb-4">
            <a className="text-white" id="subrayado" href="/mi-aplicacion/frontend/public/index.html">Blog</a>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-6 mx-auto" id="galeria">
          <p>Galería</p>
          <div className="row">
            <Gallery />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3 mx-auto">
          <p className="mb-5">Con apoyo de:</p>
          <div className="mb-4">
            <a className="text-white" id="subrayado" href="https://www.fundacionalpe.org/es" target="_blank">Fundacion Alpe</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export  {Navbar, TuComponente, Footer};




