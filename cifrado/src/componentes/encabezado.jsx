import React from 'react';

function Encabezado() {
  return (
    <div style={{
      width: '100%', // Ancho completo de la pantalla
      height: '40px', // Altura de 40 píxeles
      backgroundColor: '#001f3f', // Color azul marino
      display: 'flex', // Flexbox para alinear el contenido
      flexDirection: 'column', // Elementos en columna
      alignItems: 'center', // Centrado horizontal
      justifyContent: 'center', // Centrado vertical
      color: '#ffffff', // Color de texto blanco
      fontFamily: 'Arial, sans-serif', // Fuente moderna
      position: 'fixed', // Fijo en la parte superior
      top: '0',
      left: '0',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)', // Sombra de texto
      zIndex: '1000', // Asegura que esté por encima de otros elementos
      padding: '19px 0', // Espaciado vertical
    }}>
      <h1 style={{
        fontSize: '25px', // Tamaño de fuente más grande
        fontWeight: 'bold',
        margin: '0', // Sin márgenes para el encabezado
      }}>Seguridad Informática</h1>
      <h2 style={{
        fontSize: '25px', // Tamaño de fuente más grande
        fontWeight: '300',
        margin: '0', // Sin márgenes para el encabezado
      }}>Cifrado De Mensajes</h2>
    </div>
  );
}

export default Encabezado;
