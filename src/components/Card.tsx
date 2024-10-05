import { Form, Modal } from 'react-bootstrap';
import styles from '../theme/globalStyles.module.css';
import { FaUser } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Clientes, PropsCliente, PropsRegistroCliente } from './Types';
import { MyButton } from './MyButton';
import { useClients } from '../hooks/useClients';


interface Props {
    documento: string;
    nombreCompleto: string;
    estado: number;
    informacion: React.ReactNode;
}

export const Card = ({ documento, nombreCompleto, estado, informacion }: Props) => {

    const { consultarCliente, actualizarCliente } = useClients(); //Métodos del custom hook

    const [checked, setChecked] = useState(false);
    const [checkedEdit, setCheckedEdit] = useState(false);
    const [estadoCard, setEstadoCard] = useState(0);
    const [estadoEdit, setEstadoEdit] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);

    const toggleEditModal = () => {
        setShowEditModal(!showEditModal);
    };

    const [formDataEdit, setFormDataEdit] = useState<Clientes>({
        Documento: '',
        Nombre: '',
        Apellido1: '',
        Apellido2: '',
        Direccion: '',
        Telefono: '',
        CorreoElectronico: '',
        Ciudad: '',
        CondicionPago: '',
        ValorCupo: 0,
        MedioPago: '',
        Estado: 0,
    });

    const handleClient = async () => {
        const cliente = await consultarCliente(documento)
        setFormDataEdit(cliente)
    }

    // Usamos useEffect para inicializar el estadoCard y el checked
    useEffect(() => {
        setEstadoCard(estado);
        switchCheck();
        handleClient()
        switchCheckEdit();
    }, [estado]);

    const switchCheck = () => {
        if (estado === 1) {
            setChecked(true)
        } else {
            setChecked(false);
        }
    }
    
    const switchCheckEdit = () => {
        if (estadoEdit === 1) {
            setCheckedEdit(true)
        } else {
            setCheckedEdit(false);
        }
    }

    const handleEstado = () => {
        if (estadoCard === 1) {
            setEstadoCard(0);
            switchCheck();
        } else {
            setEstadoCard(1);
            switchCheck();
        }
    }

    const handleEstadoEdit = () => {
        setEstadoEdit((prevEstadoEdit) => {
            const nuevoEstadoEdit = prevEstadoEdit === 1 ? 0 : 1;
            setCheckedEdit(nuevoEstadoEdit === 1);
            setFormDataEdit({
                ...formDataEdit,
                Estado: nuevoEstadoEdit,
            });
            return nuevoEstadoEdit;
        });
        console.log(estadoEdit)
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormDataEdit({
            ...formDataEdit,
            [name]: value
        });
    };

    const handleSubmitEdit = () => {
        actualizarCliente(formDataEdit);
    };

    console.log(formDataEdit.Estado)

    return (
        <>
            <div className={styles.card} onClick={toggleEditModal}>
                <div className={styles.iconCardContainer}>
                    <FaUser className={styles.cardIcon} />
                </div>
                <div className={styles.infoCard}>
                    <span className={styles.cardName}>{nombreCompleto}</span>
                    <div className={styles.switchContainer}>
                        <div>
                            <span style={{ marginRight: 5 }}>Estado: </span>
                        </div>
                        <div>
                            <Form>
                                <Form.Check
                                    onChange={() => handleEstado()}
                                    checked={checked}
                                    type="switch"
                                    label={checked ? "Activo" : "Inactivo"}
                                />
                            </Form>
                        </div>
                    </div>
                </div>
                <div className={styles.cardInfo}>
                    {informacion}
                </div>
            </div>

            {/* Modal editar cliente */}
            <Modal show={showEditModal} onHide={toggleEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Cliente</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Actualice la información del cliente
                    <Form className={styles.formulario}>
                        <div className={styles.switchContainerEdit}>
                            <div>
                                <span style={{ marginRight: 5 }}>Estado: </span>
                            </div>
                            <div>
                                <Form>
                                    <Form.Check
                                        onChange={handleEstadoEdit}
                                        checked={checkedEdit}
                                        type="switch"
                                        label={checkedEdit ? "Activo" : "Inactivo"}
                                        name="Estado"
                                        value={estadoEdit}
                                    />
                                </Form>
                            </div>
                        </div>
                        {/* Documento (no editable) */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicDocumento">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Documento:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    readOnly
                                    value={formDataEdit.Documento}
                                    type="text"
                                    className={styles.formField}
                                    placeholder="Documento del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Nombre */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicNombre">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Nombre:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    required
                                    name="Nombre"
                                    value={formDataEdit.Nombre}
                                    onChange={handleChange}
                                    type="text"
                                    className={styles.formField}
                                    placeholder="Nombre del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Apellido 1 */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicApellido1">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Apellido 1:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    required
                                    name="Apellido1"
                                    value={formDataEdit.Apellido1}
                                    onChange={handleChange}
                                    type="text"
                                    className={styles.formField}
                                    placeholder="Primer apellido del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Apellido 2 */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicApellido2">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Apellido 2:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    required
                                    name="Apellido2"
                                    value={formDataEdit.Apellido2}
                                    onChange={handleChange}
                                    type="text"
                                    className={styles.formField}
                                    placeholder="Segundo apellido del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Dirección */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicDireccion">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Dirección:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    required
                                    name="Direccion"
                                    value={formDataEdit.Direccion}
                                    onChange={handleChange}
                                    type="text"
                                    className={styles.formField}
                                    placeholder="Dirección del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Teléfono */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicTelefono">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Teléfono:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    required
                                    name="Telefono"
                                    value={formDataEdit.Telefono}
                                    onChange={handleChange}
                                    type="text"
                                    className={styles.formField}
                                    placeholder="Teléfono del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Correo Electrónico */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicCorreo">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Correo Electrónico:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    readOnly
                                    name="CorreoElectronico"
                                    value={formDataEdit.CorreoElectronico}
                                    onChange={handleChange}
                                    type="email"
                                    className={styles.formField}
                                    placeholder="Correo electrónico del cliente"
                                />
                            </div>
                        </Form.Group>

                        {/* Ciudad (selección) */}
                        <Form.Group className={styles.formRowRegister} controlId="formBasicCiudad">
                            <div>
                                <Form.Label className={styles.formTextLeft}>Ciudad:</Form.Label>
                            </div>
                            <div className={styles.secctionRight}>
                                <Form.Control
                                    as="select"
                                    required
                                    name="Ciudad"
                                    value={formDataEdit.Ciudad}
                                    onChange={handleChange}
                                    className={styles.formField}
                                >
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
                                <Form.Control
                                    as="select"
                                    readOnly
                                    name="CondicionPagoID"
                                    value={formDataEdit.CondicionPago}
                                    onChange={handleChange}
                                    className={styles.formField}
                                >
                                    <option value="">Seleccione una condición de pago</option>
                                    <option value="1">Contado</option>
                                    <option value="2">Crédito</option>
                                </Form.Control>
                            </div>
                        </Form.Group>

                        {/* Si la Condición de Pago es Contado */}
                        {formDataEdit.CondicionPago === '1' ? (
                            <Form.Group className={styles.formRowRegister} controlId="formBasicMedioPago">
                                <div>
                                    <Form.Label className={styles.formTextLeft}>Medio de Pago:</Form.Label>
                                </div>
                                <div className={styles.secctionRight}>
                                    <Form.Control
                                        as="select"
                                        readOnly
                                        name="MedioPagoID"
                                        value={formDataEdit.MedioPago}
                                        onChange={handleChange}
                                        className={styles.formField}
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
                        {formDataEdit.CondicionPago === '2' ? (
                            <Form.Group className={styles.formRowRegister} controlId="formBasicValorCupo">
                                <div>
                                    <Form.Label className={styles.formTextLeft}>Valor de Cupo:</Form.Label>
                                </div>
                                <div className={styles.secctionRight}>
                                    <Form.Control
                                        required
                                        name="ValorCupo"
                                        value={formDataEdit.ValorCupo}
                                        onChange={handleChange}
                                        type="number"
                                        className={styles.formField}
                                        placeholder="Valor del cupo"
                                    />
                                </div>
                            </Form.Group>
                        ) : null}

                        {/* Botón de edición */}
                        <div className={styles.btnContainer}>
                            <MyButton texto='Guardar Cambios' mt={15} action={handleSubmitEdit} />
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    )
}
