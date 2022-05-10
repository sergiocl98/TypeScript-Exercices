/** Crear interfaces y clases para definir esta situación:

Tenemos una ciudad con varias CASAS , estas pueden ser compradas por distintas PERSONAS.
 De las casas necesitamos guardar la información de su superficie, precio, número de habitaciones, número de baños, tipo de casa (chalet, piso o duplex),
 si la casa está en venta, y su propietario/s en caso de que los tenga.
 De las personas necesitamos conocer su nombre, su edad, el dinero del que disponen, su DNI y su estado civil,
 en caso de que las personas estén casadas además necesitamos conocer su pareja.

Habrá 2 acciones que sea posible realizar:

- Comprar una casa: En caso de que una casa sea adquirida deberá dejar de estar en venta y se deberá registrar su propietario o propietarios.
- Casarse: 2 personas podrán casarse si no están ya casados con otra persona. Se deberá registrar su nueva pareja y cambiar su estado civil.

Se deberán crear las clases e interfaces necesarias para poder definir las distintas personas y casas.
Además las clases deberán contener los métodos necesarios para que se puedan realizar las acciones descritas.
Se deberá intentar utilizar tipos personalizados y herencia de clases. */
/** Enumeración con los tipos de casa, completar */
var TipoCasa;
(function (TipoCasa) {
    TipoCasa["CHALET"] = "chalet";
    TipoCasa["PISO"] = "piso";
    TipoCasa["DUPLEX"] = "duplex";
})(TipoCasa || (TipoCasa = {}));
/** Enumeración con los tipos de estado civil, completar */
var EstadoCivil;
(function (EstadoCivil) {
    EstadoCivil["CASADO"] = "casado";
    EstadoCivil["SOLTERO"] = "soltero";
})(EstadoCivil || (EstadoCivil = {}));
/** Clase casa, completar con atributos que faltan */
var Casa = /** @class */ (function () {
    function Casa(precio, tipoCasa, numHabitaciones, numBaños, superficie) {
        this.precio = precio;
        this.tipoCasa = tipoCasa;
        this.numHabitaciones = numHabitaciones;
        this.numBaños = numBaños;
        this.superficie = superficie;
        // La casa empieza sin propietarios
        this.propietarios = [];
        // La casa al principio está en venta
        this.enVenta = true;
    }
    /** Función para comprar una casa, añadir lógica para que no se compre una casa si los compradores no disponen del dinero suficiente */
    Casa.prototype.comprar = function (compradores) {
        // Si está en venta se permite comprarla (añadir condición para que los compradores tengan el dinero)
        // y restar de su dinero el precio de la casa si la compran.
        if (this.enVenta) {
            if (compradores.length === 2) {
                var comprador1 = compradores[0];
                var comprador2 = compradores[1];
                var precioAMedias = this.precio / 2;
                if (comprador1.dinero >= precioAMedias && comprador2.dinero >= precioAMedias) {
                    // Se actualizan propietarios
                    this.propietarios = compradores;
                    // La casa deja de estar en venta.
                    this.enVenta = false;
                    // Restamos el dinero de la compra
                    comprador1.dinero = comprador1.dinero - precioAMedias;
                    comprador2.dinero = comprador2.dinero - precioAMedias;
                }
                else {
                    console.log('ERROR: La pareja de compradores no dispone del dinero suficiente.');
                }
            }
            else if (compradores.length === 1) {
                var comprador = compradores[0];
                if (comprador.dinero >= this.precio) {
                    // Se actualizan propietarios
                    this.propietarios = compradores;
                    // La casa deja de estar en venta.
                    this.enVenta = false;
                    // Restamos el dinero de la compra
                    comprador.dinero = comprador.dinero - this.precio;
                }
                else {
                    console.log('ERROR: El comprador no dispone del dinero suficiente.');
                }
            }
            else {
                console.log('ERROR: El número de compradores debe ser 1 o 2.');
            }
        }
        else {
            console.log('ERROR: La casa no está en venta');
        }
    };
    return Casa;
}());
/** Clase persona, completar con atributos y constructor */
var Persona = /** @class */ (function () {
    function Persona(nombre, edad, dinero, dni, estadoCivil) {
        this.nombre = nombre;
        this.edad = edad;
        this.dinero = dinero;
        this.dni = dni;
        this.estadoCivil = estadoCivil;
    }
    /** Implementar lógica para actualizar el estado civil de ambas personas y su pareja
     * Se deberá comprobar que las 2 personas estén solteras antes de casarlos.
     */
    Persona.prototype.casarse = function (persona) {
        if (persona.estadoCivil === EstadoCivil.SOLTERO && this.estadoCivil === EstadoCivil.SOLTERO) {
            //actualizamos estados
            persona.estadoCivil = EstadoCivil.CASADO;
            this.estadoCivil = EstadoCivil.CASADO;
            //actualizamos parejas
            persona.pareja = this;
            this.pareja = persona;
        }
        else {
            console.log("ERROR: La persona ya está casada");
        }
    };
    return Persona;
}());
/** Crear las personas y casas que se desee y hacer pruebas (se valorará que se creen nuevas pruebas inventadas) */
/**
 * Este es un ejemplo de como debería funcionar el programa una vez haya sido terminado, los comentarios a la derecha de cada línea de código describen el resultado que se debe
 * mostrar al usuario por consola:
 *
 * const juan: Persona = new Persona('Juan', 32, 50000, '54672398L', EstadoCivil.SOLTERO);
 * const maria: Persona = new Persona('María', 34, 125000, '34568910T', EstadoCivil.SOLTERO);
 * const paula: Persona = new Persona('Paula', 27, 195000, '34589921D', EstadoCivil.SOLTERO);
 * const chalet1: Casa = new Casa(152, 160000, 3, 2, TipoCasa.CHALET);
 * const piso1: Casa = new Casa(68, 60000, 2, 1, TipoCasa.PISO);
 *
 * maria.casarse(juan); // Debería funcionar correctamente.
 * maria.casarse(paula); // Debería imprimir en consola el error "ERROR: La persona ya está casada".
 * chalet1.comprar([juan, maria]); // Debería comprar el chalet correctamente al tener entre los dos suficiente dinero
 * piso1.comprar([juan]); // ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa.
 *
 * console.log(juan.estadoCivil); // casado
 * console.log(paula.estadoCivil); // soltero
 * console.log(chalet1.enVenta); // false
 * console.log(piso1.enVenta); //true
 *
 */
var juan = new Persona('Juan', 32, 50000, '54672398L', EstadoCivil.SOLTERO);
var maria = new Persona('María', 34, 125000, '34568910T', EstadoCivil.SOLTERO);
var paula = new Persona('Paula', 27, 195000, '34589921D', EstadoCivil.SOLTERO);
var chalet1 = new Casa(160000, TipoCasa.CHALET, 3, 2, 152);
var piso1 = new Casa(60000, TipoCasa.PISO, 2, 1, 68);
/* ;

/*; // ERROR: Los compradores no tienen suficiente dinero para adquirir esta casa. */
/*     console.log("Juan",juan.estadoCivil); // casado
    console.log("Maria",maria.estadoCivil); // casado
     // soltero
    console.log(chalet1.enVenta); // false */
/*console.log(piso1.enVenta); //true */
console.log("TEST 1, María se casa con Juan");
maria.casarse(juan); // Debería funcionar correctamente.
console.log("Juan", juan.estadoCivil); // casado
console.log("Maria", maria.estadoCivil); // casado
console.log("Pareja de Maria", maria.pareja);
console.log("Pareja de Juan", juan.pareja);
console.log("TEST 2, María se intenta casar con Paula");
maria.casarse(paula); // Debería imprimir en consola el error "ERROR: La persona ya está casada".
console.log(paula.estadoCivil);
console.log("TEST 3, Juan y María se intentan comprar el chalet");
chalet1.comprar([juan, maria]); // No compran el chalet porque uno de los dos no dispone de su parte del dinero */
console.log(chalet1);
console.log("TEST 4, Juan se intenta comprar el piso");
piso1.comprar([juan]); // No puede comprar el piso porque no tiene dinero suficiente */
console.log(chalet1);
console.log("TEST 5, Juan y María se intentan comprar el chalet");
juan.dinero = juan.dinero + 40000;
chalet1.comprar([juan, maria]); // No debería haber problema*/
console.log(chalet1);
