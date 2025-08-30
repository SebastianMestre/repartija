# Repartija - La app de cuentas ARGENTINA

> Cuentas claras, amistades largas. (como esta)

App para trackear y repartir gastos. Similar a splitwise, pero con funciones
especificas para argentinos.

Hecho en JS pelado para q ande en cualquier compu de 2008 para acá.

## Funciones

Esta recontra incompleto.

- **Registro de gastos**
  - [x] Cargar gastos
    - [x] Nombre / descripcion
	- [x] Monto
	- [ ] Fecha
  - [ ] Editar gastos
  - [ ] Guardar gastos en almacenamiento persistente
  - [ ] Gastos con detalle (por ejemplo cargar todos los items de una cuenta de bar)
  - [ ] Fracturar gastos (p.ej. dividir una cuenta de bar en comida y bebida)
- **Manejo de grupos**
  - [x] Crear personas
  - [ ] Editar personas
  - [ ] Crear y editar grupos
  - [ ] Resolucion de cuentas inter-grupo cuando se repiten las personas
- **Modos de repartija de gastos**
  - [x] Manual (Cargar por persona cuanto le corresponde de cada gasto)
  - [ ] Vaquita (proporcional a la cantidad de personas en un gasto)
- **Argentina-Specific Features**
  - [x] Ajuste a inflacion (asi no sufris cuando tu amigo te debe $200 pesos desde 2008)
  - [ ] Uso de inflacion historica mes a mes (ahora le puse 38% anual y listo. Esto obvio es cualquiera a largo plazo)
  - [ ] Cuentas mixtas USD/ARS
- **Resolucion de deudas**
  - [ ] Calcular cuanto salio ganando o perdiendo cada uno
  - [ ] Generacion de plan para saldar todos los balances
  - [ ] Generar plan com minima cantidad de transferencias bancarias posibles
- **Desglose**
  - [ ] Mostrar al usuario la lista de transacciones (por persona?), mostrando como lo afecto la inflacion

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
