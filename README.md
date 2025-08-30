# Repartija - La app de cuentas ARGENTINA

> Cuentas claras, amistades largas. (como esta)

App para trackear y repartir gastos. Similar a splitwise, pero con funciones
especificas para argentinos.

Hecho en JS pelado para q ande en cualquier compu de 2008 para acá.

## Funciones

Esta recontra incompleto.


- Carga de datos
  - Gastos
    - [x] Nombre / descripcion
    - [x] Monto
    - [ ] Fecha (Importante para el tema de la inflacion)
    - Modos de atribucion de gastos
      - [x] Manual (Cargar por persona cuanto le corresponde de cada gasto)
      - [ ] Vaquita (proporcional a la cantidad de personas en un gasto)
    - [ ] Gastos con subitems (por ejemplo cargar todos los items de una cuenta de bar)
  - [x] Personas
  - [ ] Grupos
- Edicion de datos
  - [ ] Gastos
  - [ ] Personas
  - [ ] Grupos
  - [ ] Fracturar gastos (p.ej. dividir una cuenta de bar en comida y bebida)
- Persistencia de datos
  - Investigar como se hace con JS pelado
    - [ ] LocalStorage
    - [ ] IndexedDB
  - [ ] implementar (???)
- Resolucion de deudas
  - Calcular balance de cada persona
    - Ajuste a inflacion (asi no sufris cuando tu amigo te debe $200 pesos desde 2008)
      - [x] Calculo basico
      - [ ] Uso de inflacion historica mes a mes (ahora le puse 38% anual y listo. Esto obvio es cualquiera a largo plazo)
    - Desglose del calculo
      - [x] generacion del desglose
      - Visualizacion
        - [ ] tablita de transferencias y movimientos por inflacion
        - [ ] animacion copada q muestre la historia (???)
        - [ ] filtrar desglose por persona
  - Plan para saldar balances
    - [ ] Generacion de plan para saldar balances
    - [ ] Plan con minima cantidad de transferencias posible (sale con programacion dinamica para no mas de 20 personas)
  - [ ] Resolucion de cuentas inter-grupo cuando se repiten las personas
  - [ ] Cuentas con distintas monedas (por ejemplo USD, EUR, etc.)

## Requisitos

Este proyecto esta hecho en JS Pelado, y sin usar modulos de ES6. Corre directo
en el navegador. No hace falta ni levantar un servidor. Metes el codigo en una
carpetita y lo abris desde Firefox o el que sea tu navegador favorito.

O sea, clonas el repo, lo abris y lo empezas a usar.

```bash
git clone https://github.com/SebastianMestre/repartija.git
firefox repartija/src/index.html
```

## Contribuciones

Si tenes ganas de meterla alguna funcion o de arreglarle algun bug abrite un
Pull Request en este repo.

## Licencia

El proyecto esta bajo la licencia GNU Affero General Public License v3.0
(AGPL-3.0) - chusmeate [LICENSE.md](LICENSE.md) para ver los detalles.

## Autores

- **Sebastian** - *Desarrollo inicial* - [SebastianMestre](https://github.com/SebastianMestre)

## Contacto

Sebastian - [@SebastianMestre](https://github.com/SebastianMestre)

Link al proyecto: [https://github.com/SebastianMestre/repartija](https://github.com/SebastianMestre/repartija)
