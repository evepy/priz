# Priz 
![alt text](https://media-hosting.imagekit.io/7001d858c7c64256/prizz.png?Expires=1841442351&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=CtIls1DsqKQTTFEOCR0~zuxEBmJqPkqwrDiuuni1nWSNIKYEyUdrR4hUBBW5lWdjhQuHOSQpxeT63cWKxSxAkOVt10wiwumu9ZBhYqqj4AKn3mFgOdbwmj0Sh2GDwG58T1IWzCtXaBHZIFkG3cstpLzscMbGh7JtNRnRzIwiD-62Di2RdLzY5R8vZj0qKKDl8vgz7A~sOib1ECLk~0QAVowzRJA0H0xi8L8cl68CtKlpk32h6EWEvqSuVHPehnRw1li7ptfn5dwK1zlYVrgPmNX8Qt4MTspbxXU4POQAi3LrBOSELJly8v5rGjntXaAzRYaFnUBWr9nEfGVPItVKEA__)
## Descripción del Proyecto

Priz es una aplicación frontend, inspirada en los principios de **vibe-coding**, diseñada para facilitar el intercambio de divisas entre dólares estadounidenses (USD) y pesos chilenos (CLP) de una manera intuitiva, rápida y segura. Permite a los usuarios realizar compras y ventas de divisas aprovechando tipos de cambio competitivos obtenidos en tiempo real.

El objetivo principal es ofrecer una experiencia de usuario fluida y transparente para todas las operaciones de cambio de moneda.

## Tecnologías Principales Utilizadas

El desarrollo del frontend de Priz se ha llevado a cabo utilizando el siguiente stack tecnológico y herramientas:

* **React:** Biblioteca de JavaScript para construir interfaces de usuario interactivas y componentes reutilizables, formando el núcleo de la aplicación.
* **API de Mindicador.cl:** Se utiliza como fuente de datos para obtener los tipos de cambio actualizados entre USD y CLP en tiempo real, asegurando información precisa para los usuarios.
* **Figma:** Herramienta de diseño colaborativo empleada para la creación de prototipos, maquetas detalladas y las especificaciones visuales de la interfaz de usuario.
* **Cursor:** Un editor de código avanzado con capacidades de inteligencia artificial, utilizado para el desarrollo, la depuración y la optimización del código frontend.

## Procedimiento de Desarrollo Frontend

El flujo de trabajo para el desarrollo frontend de Priz se estructuró de la siguiente manera, buscando eficiencia y alineación con los objetivos del proyecto:

1.  **Fase de Diseño (Figma):**
    * **Definición de Requisitos y Flujos:** Se definieron los flujos de usuario clave y las funcionalidades principales.
    * **Creación de Maquetas y Prototipos:** Se diseñaron todas las pantallas, componentes e interacciones en Figma, creando prototipos navegables para validar la experiencia de usuario.

2.  **Fase de Desarrollo (Cursor y React):**
    * **Configuración del Entorno:** Se preparó el entorno de desarrollo React utilizando Cursor como editor principal.
    * **Desarrollo de Componentes:** Los diseños y especificaciones de Figma se tradujeron en componentes React funcionales, modulares y reutilizables.
    * **Implementación de Lógica de Vista:** Se desarrolló la lógica de la interfaz de usuario.
    * **Integración de Estilos:** Aplicación de los estilos definidos en Figma.

3.  **Integración con API (Mindicador.cl):**
    * **Servicios de Conexión:** Se implementaron funciones o servicios para realizar las llamadas a la API de Mindicador.cl.
    * **Manejo de Datos:** Procesamiento y transformación de los datos recibidos de la API para su correcta visualización en la interfaz (tipos de cambio, fechas, etc.).
    * **Actualización en Tiempo Real:** Implementación de mecanismos para refrescar los datos de la API y asegurar que los usuarios siempre vean la información más reciente.


## Uso de Cursor y su Historial

**Cursor** fue una herramienta fundamental en el ciclo de desarrollo. Sus características, como la asistencia de IA para la generación de código, la refactorización inteligente y la depuración, permitieron agilizar el proceso.

El **historial de interacciones y la capacidad de Cursor para mantener el contexto** a lo largo de las sesiones de desarrollo fueron particularmente útiles. Esto facilitó retomar tareas, entender la evolución del código y colaborar de manera más eficiente, ya que el editor "recordaba" el contexto de las consultas y modificaciones previas, optimizando la resolución de problemas y la implementación de nuevas funcionalidades.

## Flujo de Trabajo Visualizado (Diagrama Mermaid)

A continuación, se presenta un diagrama que ilustra el flujo general del proceso de desarrollo frontend:

```mermaid
graph TD
    A[Inicio: Requisitos y Planificación] --> B(Diseño UI/UX en Figma);
    B --> C{Revisión de Diseño y Prototipos};
    C -- Aprobado --> D(Entrega de Especificaciones y Assets desde Figma);
    D -- Instrucciones Visuales Detalladas --> E(Desarrollo de Componentes y Lógica en React con Cursor);
    E --> F(Integración de API Mindicador.cl);
    F --> G(Pruebas Unitarias y de Integración);
    G --> H(Pruebas de Usuario y QA);
    H --> I{Revisión Final y Ajustes};
    I -- Aprobado --> J[Deploy/Entrega];
    C -- Requiere Cambios --> B;
    H -- Requiere Cambios --> E;
