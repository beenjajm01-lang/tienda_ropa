import React from 'react';

export default function About() {
  return (
    <main className="seccion">
      <div className="contenedor">
        <h1 className="seccion__titulo">Sobre ChileGol Store</h1>
        <p className="seccion__bajada">
          La tienda oficial donde la pasión del fútbol chileno se cruza con el poder Saiyajin.
        </p>

        <section className="prosa su-20">
          <p>
            Nacimos con la misión de vestir a los hinchas más apasionados del país con indumentaria de alta resistencia y estilo único.
            Inspirados en las batallas más icónicas del universo anime, diseñamos cada camiseta con estándares de calidad para rendir tanto en la cancha como en la tribuna.
          </p>
        </section>

        <h2 className="seccion__titulo su-20">Nuestro Equipo</h2>
        <div className="equipo su-20">
          <article>
            <h3>Benjamín Pizarro</h3>
            <p><strong>Desarrollador Full Stack & Diseñador UI</strong></p>
            <p>Especialista en arquitectura de interfaz y experiencia de usuario Saiyajin.</p>
          </article>
          <article>
            <h3>Vicente Sáez</h3>
            <p><strong>Desarrollador Backend & QA Tester</strong></p>
            <p>Encargado de la lógica de datos, autenticación y la suite de pruebas automatizadas.</p>
          </article>
        </div>
      </div>
    </main>
  );
}