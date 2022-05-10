// Creamos una enumeración para limitar las operaciones existentes en nuestra calculadora.
enum Operacion {
    SUMA = '+',
    RESTA= '-',
    MULTIPLICACION= '*',
    DIVISION= '/',
    EXPONENTE= '**'
}

/** OPCIÓN 1: Añadimos los operandos y la operación manualmente desde nuestro archivo typescript */
// const operando1: number = 4;
// const operando2: number = 2;
// const operacion: Operacion = '+';

/** OPCIÓN 2: El usuario introduce por consola los operandos y las operaciones que desee realizar
 * Ej: node ./js-files/calculadora.js 4 2 *
 * 
 * Para obtener los valores que pasa el usuario por consola se utiliza "process.argv", un array que contiene todos esos valores en el mismo orden.
 * Para poder utilizar este valor intalar: 
 * npm install --save-dev @types/node 
 * 
 * El primer valor de process.argv es el path y el segundo el nombre de nuestro archivo. A partir del tercer elemento, posición 2 del array tenemos los argumentos que hemos añadido
 * nosotros por consola. 
*/
const operando1: number = parseInt(process.argv[2]);
const operando2: number = parseInt(process.argv[3]);
/** Casteo al tipo Operacion para indicarle que el valor que introduce el usuario por consola es de dicho tipo */
const operacion: Operacion = process.argv[4] as Operacion;

/** Creamos una función que raliza la operación que le especifiquemos y devuelve el resultado.
 * Si la operació no existe devuelve -1
 */
const operar = (operando1: number, operando2: number, operacion: Operacion): number => {
    console.log(operacion)
    switch(operacion) {
        case Operacion.SUMA:
            return sumar(operando1, operando2);
        case Operacion.RESTA:
            return restar(operando1, operando2);
        case Operacion.MULTIPLICACION:
            return multiplicar(operando1, operando2);
        case Operacion.DIVISION:
            return dividir(operando1, operando2);
        case Operacion.EXPONENTE:
            return exponente(operando1, operando2);
        default:
            console.log('ERROR: La operación introducida no existe');
            return -1;
    }
}

/** Función que suma dos números */
const sumar = (operando1: number, operando2: number) => {
    return operando1 + operando2;
}

/** Función que resta dos números */
const restar = (operando1: number, operando2: number) => {
    return operando1 - operando2;
}

/** Función que multiplica dos números */
const multiplicar = (operando1: number, operando2: number) => {
    return operando1 * operando2;
}

/** Función que divide dos números */
const dividir = (operando1: number, operando2: number) => {
    return operando1 / operando2;
}

/** Función que devuelve el un número elevado a otro */
const exponente = (operando1: number, operando2: number) => {
    return operando1 ** operando2;
}

/** Se infiere el tipo number de la función al ser el tipo de su valor de retorno */
const result = operar(operando1, operando2, operacion);
/** Imprimimos el resultado de nuestra operación */
console.log(result);
