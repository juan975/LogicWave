<p align="right">
  <img src="https://i.postimg.cc/13qQdqZs/utpllogo.png" alt="Logo UTPL" width="150"/>
</p>

<h1 align='center'>
  Diagrama de Casos de Uso 
  <br>
  Aplicación Bolsa de Empleos "CAIL"
</h1>

---

## **¿Qué es un Diagrama de Casos de Uso?**

Un **Diagrama de Casos de Uso** es una herramienta fundamental del Lenguaje Unificado de Modelado (UML) que se utiliza para describir gráficamente las **funcionalidades de un sistema** desde la perspectiva del usuario. Representa las interacciones entre los **"actores"** (usuarios o sistemas externos) y el **"sistema"** para alcanzar un objetivo específico.

En esencia, este diagrama no describe *cómo* funciona el sistema internamente, sino *qué* hace el sistema en respuesta a las solicitudes de un actor para proporcionarle un resultado de valor.

---

## **Propósito Principal de un Diagrama de Casos de Uso**

El objetivo principal de este diagrama es capturar y comunicar los **requisitos funcionales** del sistema de una manera clara y concisa. Sirve para:

* **Definir el Alcance:** Establece claramente qué debe hacer el sistema y qué queda fuera de sus límites.
* **Facilitar la Comunicación:** Actúa como un lenguaje común entre los *stakeholders* (como los directivos de la Cámara de Industrias) y el equipo de desarrollo.
* **Identificar Actores:** Clarifica quién (o qué) interactuará con el sistema.
* **Guiar el Desarrollo y las Pruebas:** Cada caso de uso sirve como base para planificar la arquitectura, el desarrollo y, fundamentalmente, los casos de prueba.

---

## **Estructura y Componentes Clave**

Un diagrama de casos de uso se compone de pocos elementos, lo que facilita su comprensión:

1.  **Actor:**
    * Representa cualquier entidad externa que interactúa con el sistema (un usuario humano, otro software, un dispositivo).
    * Se dibuja como una figura humana.

2.  **Caso de Uso:**
    * Representa una funcionalidad específica que el sistema proporciona para entregar un resultado de valor al actor (ej. "Publicar Oferta Laboral", "Validar Candidato").
    * Se dibuja como un **óvalo**.

3.  **Sistema:**
    * Un **rectángulo** que delimita el alcance del sistema. Los casos de uso se dibujan *dentro* de este límite y los actores *fuera*.

4.  **Relaciones:**
    * **Asociación:** Una línea sólida que conecta a un actor con un caso de uso. Indica que el actor participa en esa funcionalidad.
    * **Inclusión (`<<include>>`):** Una flecha punteada que indica que un caso de uso *siempre* invoca a otro (ej. "Administrar Postulaciones" `<<include>>` "Evaluar Perfil"). Se usa para reutilizar funcionalidad obligatoria.
    * **Extensión (`<<extend>>`):** Una flecha punteada que indica que un caso de uso *opcionalmente* puede extender a otro (ej. "Buscar Ofertas" `<<extend>>` "Aplicar Filtros Avanzados").

---

# **Casos de Uso del Sistema de Gestión de Postulaciones**

Basado en el Mapa de Capacidades, se identifican los siguientes actores y casos de uso principales:

## **Actores Principales**

1.  **Candidato:** (O Postulante) Usuario que busca empleo. Su objetivo es registrar su perfil, buscar ofertas y postularse.
2.  **Empleador:** Representante de una empresa. Su objetivo es registrar la empresa, publicar ofertas de trabajo y gestionar los candidatos que se postulan.
3.  **Administrador del Sistema:** Rol interno de supervisión. Su objetivo es mantener la integridad de la plataforma, validando nuevos empleadores y candidatos.

---

## **1. Diagrama de Caso de Uso: Administracion de perfiles**

Este diagrama cubre la administración de los actores clave del sistema: los empleadores y los candidatos.


![Caso de uso Perfiles](https://github.com/user-attachments/assets/db28aadb-bd4e-4970-a7ae-14ff7b1ed72f)




## **2. Diagrama de Caso de Uso: Administracion de candidatos**

![Caso de uso Candidatos](https://github.com/user-attachments/assets/1480a3ad-94cd-4341-a51e-706e322f6ce6)


## **3. Diagrama de Caso de Uso: Definicioon de vacantes**


![Caso de uso Vacantes](https://github.com/user-attachments/assets/4832b462-8585-4561-ab92-de4fdfb8332d)


## **4. Diagrama de Caso de Uso: Ciclo de vida Oferta**


![Caso de uso Ciclo Oferta](https://github.com/user-attachments/assets/fe87a559-4855-46af-87f9-2552a3cc9657)














