import { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import { MyButton } from '../../components/MyButton'
import styles from '../../theme/globalStyles.module.css'
import { Clientes, PropsRegistroCliente } from '../../components/Types'
import { useClients } from '../../hooks/useClients'
import { Form, Modal } from 'react-bootstrap'


export const Home = () => {

    const { registrarCliente, consultarClientes } = useClients(); //Métodos del custom hook

    const [showRegister, setShowRegister] = useState(false);

    const [users, setUsers] = useState<Clientes[]>([])

    const toggleRegisterModal = () => {
        setShowRegister(!showRegister);
    };
    
    
    const [formDataRegister, setFormDataRegister] = useState<PropsRegistroCliente>({
        Documento: '',
        Nombre: '',
        Apellido1: '',
        Apellido2: '',
        Direccion: '',
        Telefono: '',
        CorreoElectronico: '',
        Ciudad: '',
        CondicionPagoID: '',
        ValorCupo: 0,
        MedioPagoID: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormDataRegister({
            ...formDataRegister,
            [name]: value
        });
    };

    const handleSubmitRegister = () => {
        registrarCliente(formDataRegister);
    };

    // Hacer la solicitud al cargar la página
    useEffect(() => {
        const fetchClientes = async () => {
        try {
            consultarClientes()
            .then(response => {
                setUsers(response)
            })
            .catch(error => {
            console.error('Error al obtener la lista de clientes:', error);
            });
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        }
        };

        fetchClientes();
    }, []);

  return (
    <>
        <div className={ styles.header }>
            <p>Portal de Gestión de Usuarios</p>
            <div className={ styles.headerSpace }></div>
        </div>
        <div>
            <div className={ styles.btnContainer }><MyButton texto={'Crear cliente'} action={ toggleRegisterModal }  /></div>
            <div className={ styles.cardContainer }>
                {users.length > 0 ? (
                  users.map(user => (
                    <div key={user.Documento}>
                      <Card documento={user.Documento} nombreCompleto={`${user.Nombre} ${user.Apellido1} ${user.Apellido2}`} estado={user.Estado} informacion={(
                        <div className={ styles.cardText }>
                            <p>Documento: {user.Documento}</p>
                            <p>Direccion: {user.Direccion}</p>
                            <p>Telefono: {user.Telefono}</p>
                            <p>Correo: {user.CorreoElectronico}</p>
                            <p>Ciudad: {user.Ciudad}</p>
                            <p>Condicion de Pago: {user.CondicionPago}</p>
                            {user.CondicionPago === 'Contado' ? (
                                <p>Medio de Pago: {user.MedioPago}</p>
                            ) : (
                                <p>Valor del Cupo: {user.ValorCupo}</p>
                            )}
                        </div>
                      )}/>
                    </div>
                  ))
                ) : (
                  <p>No hay clientes disponibles</p>
                )}
            </div>
        </div>



        {/* Modal crear cliente */}
        <Modal show={showRegister} onHide={toggleRegisterModal}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar Cliente</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Ingrese la información del cliente a registrar
                <Form className={styles.formulario}>

                    {/* Documento */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicDocumento">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Documento:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="Documento" value={formDataRegister.Documento} onChange={handleChange} type="text" className={styles.formField} placeholder="Documento del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Nombre */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicNombre">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Nombre:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="Nombre" value={formDataRegister.Nombre} onChange={handleChange} type="text" className={styles.formField} placeholder="Nombre del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Apellido 1 */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicApellido1">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Apellido 1:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="Apellido1" value={formDataRegister.Apellido1} onChange={handleChange} type="text" className={styles.formField} placeholder="Primer apellido del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Apellido 2 */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicApellido2">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Apellido 2:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="Apellido2" value={formDataRegister.Apellido2} onChange={handleChange} type="text" className={styles.formField} placeholder="Segundo apellido del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Dirección */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicDireccion">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Dirección:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="Direccion" value={formDataRegister.Direccion} onChange={handleChange} type="text" className={styles.formField} placeholder="Dirección del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Teléfono */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicTelefono">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Teléfono:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="Telefono" value={formDataRegister.Telefono} onChange={handleChange} type="text" className={styles.formField} placeholder="Teléfono del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Correo Electrónico */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicCorreo">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Correo Electrónico:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control required name="CorreoElectronico" value={formDataRegister.CorreoElectronico} onChange={handleChange} type="email" className={styles.formField} placeholder="Correo electrónico del cliente"
                            />
                        </div>
                    </Form.Group>

                    {/* Ciudad (selección) */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicCiudad">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Ciudad:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control as="select" required name="Ciudad" value={formDataRegister.Ciudad} onChange={handleChange} className={styles.formField}>
                                <option value="">Seleccione una ciudad</option>
                                <option value="Bucaramanga">Bucaramanga</option>
                                <option value="Piedecuesta">Piedecuesta</option>
                                <option value="Floridablanca">Floridablanca</option>
                                <option value="Girón">Girón</option>
                            </Form.Control>
                        </div>
                    </Form.Group>

                    {/* Condición de Pago (selección) */}
                    <Form.Group className={styles.formRowRegister} controlId="formBasicCondicionPago">
                        <div>
                            <Form.Label className={styles.formTextLeft}>Condición de Pago:</Form.Label>
                        </div>
                        <div className={styles.secctionRight}>
                            <Form.Control as="select" required name="CondicionPagoID" value={formDataRegister.CondicionPagoID} onChange={handleChange} className={styles.formField}>
                                <option value="">Seleccione una condición de pago</option>
                                <option value="1">Contado</option>
                                <option value="2">Crédito</option>
                            </Form.Control>
                        </div>
                    </Form.Group>

                    {/* Si la Condición de Pago es Contado */}
                    {formDataRegister.CondicionPagoID === '1' ? (
                        <Form.Group className={styles.formRowRegister} controlId="formBasicMedioPago">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Medio de Pago:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control as="select" required name="MedioPagoID" value={formDataRegister.MedioPagoID} onChange={handleChange} className={styles.formField}
                                >
                                    <option value="">Seleccione un medio de pago</option>
                                    <option value="1">Tarjeta de Crédito</option>
                                    <option value="2">Transferencia Bancaria</option>
                                    <option value="3">Efectivo</option>
                                </Form.Control>
                            </div>
                        </Form.Group>
                    ) : null}

                    {/* Si la Condición de Pago es Crédito */}
                    {formDataRegister.CondicionPagoID === '2' ? (
                        <Form.Group className={styles.formRowRegister} controlId="formBasicValorCupo">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Valor de Cupo:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control required name="ValorCupo" value={formDataRegister.ValorCupo} onChange={handleChange} type="number" className={styles.formField} placeholder="Valor del cupo"
                                />
                            </div>
                        </Form.Group>
                    ) : null}

                    {/* Botón de registro */}
                    <div className={styles.btnContainer}>
                        <MyButton texto='Agregar Cliente' mt={15} action={handleSubmitRegister} />
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    </>
  )
}
