+++
title = 'Métodos Numéricos en Física Computacional'
author = 'Marlon Brenes'
date = 2024-09-12T09:00:00-07:00
tags = ['Física Computacional']
+++

# Sistemas dinámicos

Los sistemas dinámicos son modelos de suma importancia en las ciencias. En general, un modelo dinámico intenta resolver la trayectoria temporal de alguna cantidad física como función de algún generador dinámico; este último usualmente representado de forma funcional.

En algunos casos, podemos modelar la dinámica de un estado genérico $y$
mediante la ecuación dinámica 

$$
\frac{dy}{dt} = f(t, y)
$$

sujeta a la condición inicial 

$$
y(t_0) = y_0
$$

En esta notación, $y$ corresponde a un estado del sistema. Este estado puede ser representado mediante diferentes objetos matemáticos: desde cantidades escalares hasta matrices que representan cierto operador lineal. En la ecuación anterior, $t$ corresponde a la variable temporal.

El problema dinámico descrito anteriormente es usualmente conocido en el campo de las matemáticas aplicadas como **problema de condición inicial**.

# Laboratorio

Este tipo de problemas, el cual corresponde a algún modelo dinámico (para nombrar algunos ejemplos: sistemas electromagnéticos, dinámica de fluidos, sistemas caóticos, sistemas cuánticos, entre otros) será tema del curso más adelante. En este laboratorio, nuestro objetivo es aplicar conceptos de programación en `Python` utilizando `Jupyter Notebook`s para resolver el problema dinámico.

## Breve introducción a `Numpy`

En cálculos referentes a ciencia aplicada, una de las bibliotecas más importantes para diseñar aplicaciones científicas en `Python` es `Numpy`. `Numpy` está estructurado como un módulo, que debe ser importado para su uso.

Esto se realiza mediante la cláusula:

```python
import numpy as np
```

La cláusula `import` importa el módulo a nuestro ambiente de programación, mientras que el *keyword* `as` implica que usaremos un acrónimo para invocar la funcionalidad del módulo; con el simple objetivo de no escribir la palabra `numpy` antes de cada función que invoquemos.

El objeto más importante del módulo `Numpy` es el `numpy.ndarray`. Este objeto es un contenedor (estructura de datos) que representa objetos como vectores, matrices o tensores.

El constructor (estudiaremos contructores más adelante), se invoca pasando como argumento un `Python` `list`. Veamos por ejemplo como construir una matriz identidad 2x2 con esta estructura:

```python
identityMatrix = np.array([[1,0], [0,1]])

print(identityMatrix)
```

Note que pasamos una lista de listas para crear un objeto de mayor dimensión; i.e, una matrix. Los objetos creados con `np.array` contienen varias propiedades, tales como su tamaño y dichos atributos se accesan mediante el operador `.`:

```python
identityMatrix.shape
```

Los objetos se pueden operar matemáticamente de forma sencilla:

```python
identityMatrix + identityMatrix
```

```python
aEx = np.array([[0,1], [1,0]])

np.dot(aEx, aEx) # El producto matricial A*B
```

La documentación de `Numpy` se puede accesar mediante su página de referencia: [NumPy](https://numpy.org/)

## Soluciones a sistemas dinámicos

Los sistemas dinámicos y las soluciones numéricas a ecuaciones diferenciales son un tema importante de este curso que será estudiado más adelante. De momento, queremos utilizar este problema para familiarizarnos con el ambiente de programación científica.

Lo primero que vamos a hacer es describir el método numérico que vamos a utilizar para implementar la solución.

Vamos a utilizar el método Runge-Kutta de orden 4 para resolver el problema.

## Método Runge-Kutta de orden 4 (RK4)

$$
\begin{aligned}
y_{n+1} &= y_n + \frac{1}{6} \left( k_1 + 2k_2 + 2k_3 + k_4 \right)
\end{aligned}
$$

donde

$$
\begin{aligned}
k_1 &= h f(t_n, y_n) \\
k_2 &= h f\left(t_n + \frac{h}{2}, y_n + \frac{k_1}{2}\right) \\
k_3 &= h f\left(t_n + \frac{h}{2}, y_n + \frac{k_2}{2}\right) \\
k_4 &= h f\left(t_n + h, y_n + k_3\right)
\end{aligned}
$$

## Ejemplo

Armados con esta metodología vamos a estudiar la solución de un problema dinámico genérico.

Asumamos que queremos estudiar la evolución temporal de un estado $\textrm{y}(t)$. Este estado será representado mediante una matriz 2x2 que corresponde a algún operador lineal. La función que genra la dinámica del problema es

$$
f(t, \mathbf{y}) = -{\rm{i}} [\mathbf{O}, \mathbf{y}(t)],
$$

donde $\mathbf{O}$ es otro operador lineal, $\rm{i}$ es la constante compleja y $[A, B] = AB - BA$ es un operación de conmutación. Note que la función no depende explícitamente de la variable temporal.

En Python, la constante compleja se denota mediante:

```python
iConst = 1.0j

print(iConst)
```

La dinámica del problema depende intrínsicamente del operador $\mathbf{O}$. Escojamos el siguiente operador:

```python
oOper = np.array([[0, 1], [1, 0]])

print(oOper)
```

Dicho operador puede tener distintos significados físicos dependiendo del problema dinámico en cuestión. Puede representar un mapa algebraico, el generador dinámico de un sistema caótico, un Hamiltoniano, etc.

Lo siguiente es difinir un estado inicial. De igual forma, dicho estado puede representar cantidades físicas de un sistema. Consideremos:

```python
yInit = np.array([[1, 0], [0, 0]])

print(yInit)
```

Note que el operador $\mathbf{O}$ no es diagonal, por lo cual esperamos que conforme avanza el tiempo, dicho operador modifica el estado $\mathbf{y}(t)$.

Implementemos la función $f(t, \mathbf{y})$ en Python. Para esto puede utilizar la función [np.dot](https://numpy.org/doc/stable/reference/generated/numpy.dot.html)
