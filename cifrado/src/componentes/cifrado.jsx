import React, { useState } from 'react'; 

function CifradoApp() {
  const [mensajeCesar, setMensajeCesar] = useState('');
  const [mensajeEscitala, setMensajeEscitala] = useState('');
  const [resultadoCesar, setResultadoCesar] = useState('');
  const [resultadoEscitala, setResultadoEscitala] = useState('');
  const [desplazamiento, setDesplazamiento] = useState(0);
  const [numColumnas, setNumColumnas] = useState(2); // Inicializar en 2
  const [mostrarInstruccionesCesar, setMostrarInstruccionesCesar] = useState(false);
  const [mostrarInstruccionesEscitala, setMostrarInstruccionesEscitala] = useState(false);

  const cifrarCesar = (texto, desplazamiento) => {
    const cifrado = texto.split('').map((char) => {
      const codigo = char.charCodeAt(0);
      if (codigo >= 65 && codigo <= 90) {
        return String.fromCharCode(((codigo - 65 + parseInt(desplazamiento)) % 26) + 65);
      }
      if (codigo >= 97 && codigo <= 122) {
        return String.fromCharCode(((codigo - 97 + parseInt(desplazamiento)) % 26) + 97);
      }
      return char;
    });
    return cifrado.join('');
  };

  const descifrarCesar = (texto, desplazamiento) => {
    return cifrarCesar(texto, -desplazamiento);
  };

  const manejarCifradoCesar = (accion) => {
    const resultadoFinal =
      accion === 'cifrar'
        ? cifrarCesar(mensajeCesar, desplazamiento)
        : descifrarCesar(mensajeCesar, desplazamiento);
    setResultadoCesar(resultadoFinal);
  };

  const cifrarEscitala = (texto, columnas) => {
    const n = Math.ceil(texto.length / columnas);
    let resultado = '';

    for (let col = 0; col < columnas; col++) {
      for (let row = 0; row < n; row++) {
        const index = row * columnas + col;
        if (index < texto.length) {
          resultado += texto[index];
        }
      }
    }

    return resultado;
  };
   // Funciones para copiar al portapapeles
   const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto)
      .then(() => alert('Texto copiado al portapapeles!'))
      .catch(err => alert('Error al copiar: ', err));
  };

  const descifrarEscitala = (texto, columnas) => {
    const n = Math.ceil(texto.length / columnas);
    let resultado = '';

    const matriz = Array.from({ length: n }, () => Array(columnas).fill(''));
    let index = 0;

    for (let col = 0; col < columnas; col++) {
      for (let row = 0; row < n; row++) {
        if (index < texto.length) {
          matriz[row][col] = texto[index++];
        }
      }
    }

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < columnas; col++) {
        if (matriz[row][col]) {
          resultado += matriz[row][col];
        }
      }
    }

    return resultado.trim();
  };

  const manejarCifradoEscitala = (accion) => {
    if (!numColumnas || numColumnas <= 0) {
      alert("El número de columnas debe ser un número positivo.");
      return;
    }

    const resultadoFinal =
      accion === 'cifrar'
        ? cifrarEscitala(mensajeEscitala, numColumnas)
        : descifrarEscitala(mensajeEscitala, numColumnas);

    setResultadoEscitala(resultadoFinal);
  };

  const manejarCambioColumnas = (e) => {
    const valor = parseInt(e.target.value);
    if (valor > 0 && valor % 2 === 0) {
      setNumColumnas(valor);
    } else if (valor > 0) {
      alert("Por favor, introduce un número par.");
      setNumColumnas(valor - 1);
    }
  };

  // Funciones para mostrar/ocultar instrucciones
  const abrirInstruccionesCesar = () => setMostrarInstruccionesCesar(true);
  const cerrarInstruccionesCesar = () => setMostrarInstruccionesCesar(false);

  const abrirInstruccionesEscitala = () => setMostrarInstruccionesEscitala(true);
  const cerrarInstruccionesEscitala = () => setMostrarInstruccionesEscitala(false);

  return (
    <div style={{   padding: '20px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap' }}>
      {/* Tarjeta Cifrado César */}
      <div style={{
        width: '90%',
        maxWidth: '390px',
        backgroundColor: '#cce5ff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginTop: '80px',
        color: '#333'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '18px' }}>Cifrado César</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>Mensaje:</label>
          <textarea
            value={mensajeCesar}
            onChange={(e) => setMensajeCesar(e.target.value)}
            placeholder="Ingresa el mensaje"
            style={{
              width: '100%',
              height: '30px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              marginBottom: '10px',
              resize: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Desplazamiento:</label>
            <input
              type="number"
              value={desplazamiento}
              onChange={(e) => setDesplazamiento(e.target.value)}
              style={{
                width: '40px',
                height: '15px',
                padding: '2px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <button
            onClick={() => manejarCifradoCesar('cifrar')}
            style={{
              backgroundColor: '#0056b3',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              marginRight: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            Cifrar
          </button>
          <button
            onClick={() => manejarCifradoCesar('descifrar')}
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            Descifrar
          </button>
          <button
            onClick={abrirInstruccionesCesar}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
          >
            Instrucciones César
          </button>
        </div>

        <h2 style={{ color: '#333', fontSize: '16px' }}>Resultado:</h2>
        <textarea
          value={resultadoCesar}
          readOnly
          style={{
            width: '100%',
            height: '30px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
            resize: 'none',
          }}
        />
         <button
            onClick={() => copiarAlPortapapeles(resultadoCesar)}
            style={{
              backgroundColor: '#0056b3',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              marginLeft: '5px',
              cursor: 'pointer',
            }}
          >
            Copiar
          </button>
      </div>

      {/* Tarjeta Cifrado Escítala */}
      <div style={{
        width: '90%',
        maxWidth: '400px',
        backgroundColor: '#cce5ff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        marginTop: '80px',
        marginLeft: '20px',
        color: '#333'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '18px' }}>Cifrado Escítala</h2>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontWeight: 'bold' }}>Mensaje:</label>
          <textarea
            value={mensajeEscitala}
            onChange={(e) => setMensajeEscitala(e.target.value)}
            placeholder="Ingresa el mensaje"
            style={{
              width: '100%',
              height: '30px',
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              marginBottom: '10px',
              resize: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <label style={{ fontWeight: 'bold' }}>Número de Columnas:</label>
            <input
              type="number"
              value={numColumnas}
              onChange={manejarCambioColumnas}
              step="2" // Aumenta o disminuye en 2
              style={{
                width: '40px',
                height: '15px',
                padding: '2px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                marginBottom: '10px',
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <button
            onClick={() => manejarCifradoEscitala('cifrar')}
            style={{
              backgroundColor: '#0056b3',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              marginRight: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            Cifrar
          </button>
          <button
            onClick={() => manejarCifradoEscitala('descifrar')}
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            Descifrar
          </button>
          <button
            onClick={abrirInstruccionesEscitala}
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '5px',
            }}
          >
            Instrucciones Escítala
          </button>
        </div>

        <h2 style={{ color: '#333', fontSize: '16px' }}>Resultado:</h2>
        <textarea
          value={resultadoEscitala}
          readOnly
          style={{
            width: '100%',
            height: '30px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
            resize: 'none',
          }}
        />
         <button
            onClick={() => copiarAlPortapapeles(resultadoEscitala)}
            style={{
              backgroundColor: '#0056b3',
              color: '#fff',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '5px',
              marginLeft: '5px',
              cursor: 'pointer',
            }}
          >
            Copiar
          </button>
      </div>

      {/* Ventanas emergentes para instrucciones */}
      {mostrarInstruccionesCesar && (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            maxHeight: '80%', // Cambiar a un porcentaje para responsividad
            overflow: 'auto',
            width: '90%', // Cambiar a un porcentaje para responsividad
            maxWidth: '600px', // Ancho máximo
            fontSize: '18px', // Aumentar el tamaño de la fuente
        }}>
    <div>
    <h3>Instrucciones para el Cifrado César</h3>
    <p>
    El cifrado César es uno de los métodos de cifrado más simples y conocidos. Consiste en desplazar cada letra del texto original un número fijo de posiciones en el alfabeto.
    </p>
    <h4>Cómo usar el Cifrado César:</h4>
    <ol>
    <li>
      <strong>Selecciona un desplazamiento:</strong> 
      <p>
        Elige un número que determinará cuántas posiciones se moverán las letras. Por ejemplo, si eliges un desplazamiento de 3, la letra 'A' se convertirá en 'D'.
      </p>
    </li>
    <li>
      <strong>Introduce tu mensaje:</strong>
      <p>
        Escribe el mensaje que deseas cifrar. Asegúrate de que solo contenga letras del alfabeto.
      </p>
    </li>
    <li>
      <strong>Cifra el mensaje:</strong>
      <p>
        Aplica el desplazamiento a cada letra de tu mensaje. Las letras que se mueven más allá de la 'Z' deben continuar desde la 'A'.
      </p>
      <p>
        Para cifrar, puedes utilizar una hoja de papel con el alfabeto escrito en una fila. Desplaza el alfabeto hacia la derecha según el número elegido. Por ejemplo, para un desplazamiento de 3, escribe:
      </p>
      <pre>
        Alfabeto original:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
        Alfabeto cifrado:   D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
      </pre>
        </li>
    <li>
      <strong>Ejemplo:</strong>
      <ul>
        <li>Mensaje original: HELLO</li>
        <li>Desplazamiento: 3</li>
        <li>Mensaje cifrado: KHOOR</li>
      </ul>
      <p>
        Puedes comprobarlo desplazando cada letra de "HELLO" 3 posiciones hacia la derecha.
      </p>
    </li>
    </ol>
    <h4>Consideraciones:</h4>
    <ul>
    <li>El cifrado César no es seguro para la transmisión de información sensible.</li>
    <li>Este método puede ser fácilmente roto con técnicas de análisis de frecuencia.</li>
    </ul>
    </div>
          <button onClick={cerrarInstruccionesCesar} style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            Cerrar
          </button>
        </div>
      )}

      {mostrarInstruccionesEscitala && (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            maxHeight: '80%', // Cambiar a un porcentaje para responsividad
            overflow: 'auto',
            width: '90%', // Cambiar a un porcentaje para responsividad
            maxWidth: '600px', // Ancho máximo
            fontSize: '18px', // Aumentar el tamaño de la fuente
        }}>
         <h3>Instrucciones del Cifrado Escítala</h3>
    <p>
    La Escítala es un antiguo método de cifrado utilizado por los griegos, que consiste en un cilindro y una cinta enrollada alrededor de él. 
    A continuación, se detalla cómo usarla para cifrar y descifrar mensajes.
    </p>

    <h4>¿Qué es la Escítala?</h4>
    <p>
    La Escítala es un dispositivo de cifrado que permite enviar mensajes secretos. Se utiliza un cilindro (que puede ser de madera, metal o cualquier material resistente) y una cinta larga que se puede enrollar alrededor del cilindro.
    </p>
    <h4>¿Cómo se usa la Escítala?</h4>
    <ol>
    <li>
        <strong>Preparación:</strong> Toma un cilindro de diámetro adecuado y una cinta o tira de papel larga. 
    </li>
    <li>
        <strong>Envolver la cinta:</strong> Enrolla la cinta alrededor del cilindro, asegurándote de que esté tensa y alineada.
    </li>
    <li>
        <strong>Escribir el mensaje:</strong> Escribe el mensaje a cifrar a lo largo de la cinta, siguiendo la forma del cilindro. Asegúrate de escribir el mensaje en líneas verticales.
    </li>
    <li>
        <strong>Leer el mensaje cifrado:</strong> Una vez que hayas escrito el mensaje, desenrolla la cinta del cilindro. El texto se leerá como un conjunto de letras que no tienen sentido para quienes no conocen el método.
    </li>
    </ol>
    <h4>Ejemplo de cifrado:</h4>
    <p>
    Si quieres cifrar el mensaje "ENCUENTRO A LAS CINCO", lo escribirías en la cinta enrollada en el cilindro de la siguiente manera (suponiendo que el cilindro tiene un diámetro adecuado para que quepan las letras):
    </p>
    <pre>
    E N C
    U E N
    T R O
    A L
    A S C
    I N C
    O
    </pre>
    <p>
    Al desenrollar la cinta, el mensaje se verá como "ENCALRUITOASNC", que es ilegible sin el cilindro.
    </p>

    <h4>¿Cómo descifrar un mensaje?</h4>
    <ol>
    <li>
        <strong>Usar el mismo cilindro:</strong> Para descifrar, necesitas el mismo cilindro utilizado para cifrar el mensaje.
    </li>
    <li>
        <strong>Enrollar la cinta:</strong> Enrolla nuevamente la cinta con el mensaje cifrado alrededor del cilindro.
    </li>
    <li>
        <strong>Leer el mensaje:</strong> A medida que desenrollas la cinta, leerás el mensaje en su forma original, que debería ser claro.
    </li>
    </ol>

    <h4>Consideraciones finales:</h4>
    <p>
        La Escítala es un método eficaz para la comunicación secreta, siempre y cuando el cilindro y la cinta se mantengan en secreto. 
        Sin embargo, es vulnerable si alguien descubre la longitud de la cinta o el diámetro del cilindro.
    </p>
          <button onClick={cerrarInstruccionesEscitala} style={{
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}

export default CifradoApp;
