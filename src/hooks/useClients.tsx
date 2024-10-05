import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Clientes, PropsCliente, PropsRegistroCliente } from "../components/Types";


export const useClients = () => {

    const navigate = useNavigate();

    const registrarCliente = (formDataRegistro: PropsRegistroCliente) => {

        try {
            // Llamada a la API para registrar el cliente
            axios.post('http://localhost:3001/users/add', formDataRegistro)
                .then(response => {
                    alert('Cliente insertado correctamente');
                    // Puedes redirigir a otra página si es necesario
                    navigate('/');
                })
                .catch(error => {
                    alert('Error en la inserción');
                    console.error(error);
                });
        } catch (error) {
            alert('Error en la inserción');
            console.error(error);
        }
    };

    const consultarClientes = async(): Promise<PropsCliente> => {
        try {
            const response = await axios.get<PropsCliente>(`http://localhost:3001/users/clientList`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la lista de clientes:', error);
            throw error;
        }
    };

    const consultarCliente = async(Documento:string): Promise<Clientes> => {
        try {
            const response = await axios.get<Clientes>(`http://localhost:3001/users/client/${Documento}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la información del cliente:', error);
            throw error;
        }
    };

    const actualizarCliente = async(formData: Clientes): Promise<Clientes> => {

        try {
            const response = await axios.post<Clientes>(`http://localhost:3001/users/clientUpdate/${formData.Documento}`, formData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la información del cliente:', error);
            throw error;
        }
    };

    return ({
        registrarCliente,
        consultarClientes,
        consultarCliente,
        actualizarCliente,
    })
}
