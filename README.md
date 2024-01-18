> **_NOTA SOBRE EL CÓDIGO DE MI PROYECTO TERMINAL DE INGENIERÍA TELEMÁTICA: **
> 
> El código de dicho proyecto se encuentra en un repositorio de mi otra cuenta de GitHub: github.com/mauguzmor. Sin embargo, es un repositorio protegido.
> 
> Si está interesado en conocer una muestra de dicho código, contácteme al correo mauricio.guzz@outlook.com.
> 
> Recomiendo visitar mi portafolio de proyectos para conocer de qué trata mi proyecto terminal de ingeniería telemática:
> qué temas de investigación abarcó, el software de simulación de eventos discretos que diseñé y desarrollé, que arquitecturas implementé,
> y como utilicé conocimiento tanto de la academia como de la industria para resolver distintos problemas que se me presentaron durante el desarrollo
> de este proyecto. Haga clic en el enlace siguiente:
> 
> [Simulador de eventos discretos para la evaluación de protocolos de comunicaciones para enlaces ópticos satelitales](https://mauguzz.notion.site/Proyecto-de-titulaci-n-Caracterizaci-n-y-dise-o-de-estrategia-de-control-de-flujo-para-un-enlace-p-209b460cd8f349989ae0d2578e4301fc)

# Sistema Desarrollado de Migración - Ingeniería Web (SIS-IW)

Este código corresponde a un proyecto de la materia de Ingeniería Web de la carrera de Telemática en la UPIITA del Instituto Politécnico Nacional.
El grupo se dividió en equipos de entre dos y tres personas. Cada equipo creó una especificación de requerimientos para un sistema informático con aplicaciones específicas fungiendo como clientes.
Posteriormente, a cada equipo se le asignó la tarea de desarrollar el sistema informático de otro equipo, cumpliendo con los requerimientos que éste hubiese colocado, y utilizando tecnologías web.

Nuestro cliente nos solicitó un "Sistema Desarrollado de Migración", en el que planteaban mejorar la administración y seguimiento de los migrantes en México, como si fuese un sistema para el Instituto Nacional de Migración de México.

Esta aplicación web es el resultado.

Como decisión dentro dentro del equipo de desasarrollo, se utilizó muy fuertemente el lenguaje JavaScript en su versión Vanilla, es decir, tratando de NO utilizar librerías como JQuery. Lo anterior con el objetivo de entender muy bien la lógica del lenguaje JavaScript puro. De hecho, para las peticiones HTTP se utilizó fetch(), utilizando una estructura modular completamente diseñada por nosotros.
Se utilizó el lenguaje PHP en el backend, tratando de emular una API Rest, ya que se implementaron las funciones básicas GET, PUT, POST y DELETE por separado y dependiendo de los elementos a los que se accedía. 
Se implementó una base de datos en MySQL. Desde luego que para su tiempo, no se implementaron las mejores prácticas de seguridad para la conexión entre PHP y MySQL, por lo tanto el código es vulnerable a inyección de SQL, actualmente estamos conscientes de ello.

En el frontend se adoptó Bootstrap para diseñar la interfaz gráfica.

Con este proyecto y gracias a la curiosidad, aprendimos los fundamentos de múltiples tecnologías web, la relación de la web con el protocolo HTTP (ya que no utilizamos frameworks) que revisamos en la materia de Protocolos de Internet en UPIITA, y además trabajamos mediante git para sincronizar nuestro trabajo y comprender su funcionamiento.
