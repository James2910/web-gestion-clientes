

export interface Clientes {
    Documento: string;
    Nombre: string;
    Apellido1: string;
    Apellido2: string;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
    Ciudad: string;
    CondicionPago: string;
    ValorCupo: number;
    MedioPago: string;
    Estado: number;
}

export interface RegistroClientes {
    Documento: string;
    Nombre: string;
    Apellido1: string;
    Apellido2: string;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
    Ciudad: string;
    CondicionPagoID: string;
    ValorCupo: number;
    MedioPagoID: string;
}

export type PropsRegistroCliente = RegistroClientes;
export type PropsCliente = Clientes[];