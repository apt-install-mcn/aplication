import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../style/blog.css';

const MAX_CARACTERES_TESTIMONIO = 800; // Define el número máximo de caracteres permitidos

const TestimonioFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [testimonio, setTestimonio] = useState('');
  const [imagen, setImagen] = useState(null);
  const [prevIndiceMostrar, setPrevIndiceMostrar] = useState(0);

  const [transition, setTransition] = useState(true);

  const [testimoniosObtenidos, setTestimoniosObtenidos] = useState([]);
  const [indiceMostrar, setIndiceMostrar] = useState(0);
  const [caracteresRestantes, setCaracteresRestantes] = useState(MAX_CARACTERES_TESTIMONIO);
  const [mostrarContenidoCompleto, setMostrarContenidoCompleto] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTestimonio, setModalTestimonio] = useState({});

  const obtenerTestimonios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/testimonios');
      setTestimoniosObtenidos(response.data);
      setMostrarContenidoCompleto(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error('Error al obtener los testimonios:', error);
    }
  };

  useEffect(() => {
    obtenerTestimonios();
  }, []);

  const handleNombreChange = (e) => {
    setNombre(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setImagen(imageFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('testimonio', testimonio);
    formData.append('imagen', imagen);

    try {
      await axios.post('http://localhost:5000/enviar-testimonio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNombre('');
      setEmail('');
      setTestimonio('');
      setImagen(null);

      obtenerTestimonios();
      alert('Testimonio y imagen enviados con éxito');
    } catch (error) {
      alert('Error al enviar el testimonio e imagen');
    }
  };

  const handleRetroceder = () => {
    if (indiceMostrar - 3 >= 0) {
      setTransition(false);
      setTimeout(() => {
        setIndiceMostrar(indiceMostrar - 3);
        setTransition(true);
      }, 10);
    }
  };

  const handleAvanzar = () => {
    if (indiceMostrar + 3 < testimoniosObtenidos.length) {
      setTransition(false);
      setTimeout(() => {
        setIndiceMostrar(indiceMostrar + 3);
        setTransition(true);
      }, 10);
    }
  };

  const handleTestimonioChange = (e) => {
    const testimonioText = e.target.value;
    const caracteresRestantes = MAX_CARACTERES_TESTIMONIO - testimonioText.length;
    setTestimonio(testimonioText);
    setCaracteresRestantes(caracteresRestantes);
  };

  const handleVerMas = (index) => {
    setModalTestimonio(testimoniosObtenidos[index]);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div data-aos="fade-down" style={{ textAlign: 'center' }}>
      <h2>Testimonios:</h2>

      <div style={{ position: 'relative' }}>
        {indiceMostrar > 0 && (
          <button
            style={{
              background: '#2cbb2c',
              color: 'white',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              position: 'absolute',
              left: '150px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: '1',
              padding: '10px',
              borderRadius: '5px',
              transition: 'background 0.3s ease',
            }}
            onClick={handleRetroceder}
            onMouseEnter={(e) => (e.target.style.background = '#016401')}
            onMouseLeave={(e) => (e.target.style.background = '#2cbb2c')}
          >
            {'<'}
          </button>
        )}

        <Carousel showThumbs={false}>
          <ul
            className={transition ? 'transition' : ''}
            style={{
              listStyle: 'none',
              padding: '0',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {testimoniosObtenidos.slice(indiceMostrar, indiceMostrar + 3).map((testimonio, index) => (
              <li key={index} style={{ marginBottom: '20px' }}>
                <div
                  style={{
                    padding: '20px',
                    margin: '40px',
                    backgroundImage: `url('/img/testimonio.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    minHeight: '300px',
                    minWidth: '350px',
                    maxHeight: '300px',
                    maxWidth: '350px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ maxWidth: '100%', textAlign: 'center', margin: 'auto', padding: '20px' }}>
                    <strong>Nombre:</strong> {testimonio.nombre}
                    <br />
                    <strong>Email:</strong> {testimonio.email}
                    <br />
                    <strong>Testimonio:</strong>
                    {mostrarContenidoCompleto[index] ? (
                      <div>{testimonio.testimonio}</div>
                    ) : (
                      <div>{testimonio.testimonio.slice(0, 100)}...</div>
                    )}
                    <br />
                    <button
                      onClick={() => handleVerMas(index)}
                      style={{
                        background: '#2cbb2c',
                        color: 'white',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        transition: 'background 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.background = '#016401')}
                      onMouseLeave={(e) => (e.target.style.background = '#2cbb2c')}
                    >
                      Ver más
                    </button>
                    <br />
                    <img
                      src={`http://localhost:5000/uploads/${testimonio.imagen}`}
                      alt="Imagen del testimonio"
                      style={{ maxWidth: '60px', maxHeight: '60px', borderRadius: '50%', marginBottom: '10px' }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Carousel>

        {indiceMostrar < testimoniosObtenidos.length && (
          <button
            style={{
              background: '#2cbb2c',
              color: 'white',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              position: 'absolute',
              right: '150px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: '1',
              padding: '10px',
              borderRadius: '5px',
              transition: 'background 0.3s ease',
            }}
            onClick={handleAvanzar}
            onMouseEnter={(e) => (e.target.style.background = '#016401')}
            onMouseLeave={(e) => (e.target.style.background = '#2cbb2c')}
          >
            {'>'}
          </button>
        )}
      </div>

      {/* Modal para mostrar el testimonio completo */}
      {modalVisible && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '2',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '5px',
              maxWidth: '600px',
              overflow: 'auto',
            }}
          >
            <h3>Testimonio completo</h3>
            <p>{modalTestimonio.testimonio}</p>
            <img
              src={`http://localhost:5000/uploads/${modalTestimonio.imagen}`}
              alt="Imagen del testimonio"
              style={{ maxWidth: '100%', marginTop: '10px' }}
            />
            <button onClick={closeModal} 
              style={{
                background: '#2cbb2c',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                padding: '4px 8px',
                marginTop: '8px',
                borderRadius: '5px',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.background = '#016401')}
              onMouseLeave={(e) => (e.target.style.background = '#2cbb2c')}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          margin: 'auto',
          border: '1px solid green',
          padding: '10px',
          marginBottom: '5%',
        }}
        onSubmit={handleSubmit}
      >
        <h1>Cuentanos tu experiencia</h1>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={handleNombreChange}
          required
          style={{ marginBottom: '10px', padding: '5px', border: '1px solid green' }}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          style={{ marginBottom: '10px', padding: '5px', border: '1px solid green' }}
        />

        <label htmlFor="testimonio">Tu testimonio:</label>
        <textarea
          id="testimonio"
          value={testimonio}
          onChange={handleTestimonioChange}
          maxLength={MAX_CARACTERES_TESTIMONIO}  // Agrega esta línea
          rows="4"
          cols="50"
          required
          style={{ marginBottom: '10px', padding: '5px', border: '1px solid green' }}
        ></textarea>
        <p>Caracteres restantes: {caracteresRestantes}</p>

        <label htmlFor="imagen">Subir imagen:</label>
        <input
          type="file"
          id="imagen"
          accept="image/*"
          onChange={handleImageUpload}
          required
          style={{ marginBottom: '10px', padding: '5px', border: '1px solid green' }}
        />

        <button type="submit" style={{ padding: '8px', backgroundColor: 'green', color: '#fff', border: 'none' }}>
          Enviar testimonio
        </button>
      </form>
    </div>
  );
};

export default TestimonioFormulario;
