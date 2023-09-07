import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTarea, deleteTarea, editTarea, getTareas } from '../store/tareasSlice';

export const ListaTareas = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [inputData, setInputData] = useState('');
    const dispatch = useDispatch();
    const tareas = useSelector((state) => state.tareas.items);
    const status = useSelector((state) => state.tareas.status);
    useEffect(() => {
        if (status === "idle") {
            dispatch(getTareas())
        }
    }, [status, dispatch])

    const handleChange = (e) => {
        setInputData(e.target.value);
    }

    useEffect(() => {
        if (inputData.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [inputData])

    const handleSubmit = () => {
        const data = {
            descripcion: inputData,
            vigente: true
        }
        dispatch(addTarea(data)).then(() => {
            dispatch(getTareas());
            setInputData("");
        });
        alert("Tarea Guardada...")
    }

    const handleDelete = (id) => {
        if (window.confirm("¿desea eliminar esta tarea?")) {
            dispatch(deleteTarea(id));
        }
    }

    const handleEditClick = (id, descripcion) => {
        setIsEditing(true);
        setCurrentId(id);
        setInputData(descripcion);
    }

    const handleEdit = () => {
        const data = {
            descripcion: inputData,
        }
        dispatch(editTarea({
            id: currentId,
            updates: data
        })).then(() => {
            dispatch(getTareas());
            setInputData("");
        });
        alert("Tarea Editada...")
    }

    return (
        <div>
            <div className="container-md"><hr></hr>
                <div className="card border-danger mb-3">
                    <div className="card-header text-bg-danger mb-3">
                        <b className='text-white'>Listado de Tareas</b>
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                {/* Columna para la lista de tareas */}
                                <div className="col-12 col-md-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <ul>
                                                {tareas.map(tarea =>
                                                    <li key={tarea.id} className='list-group-item d-flex justify-content-between align-items-center mb-2' style={{ padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                                                        <span>{tarea.descripcion}</span>
                                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                                            <button type="button" className="btn btn-warning btn-sm" onClick={() => handleEditClick(tarea.id, tarea.descripcion)}>Editar</button>
                                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(tarea.id)}>Eliminar</button>
                                                        </div>
                                                    </li>)
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="card border-primary mb-3">
                                        <div className="card-body">
                                            <textarea className="form-control" rows="3" onChange={handleChange} value={inputData}></textarea>
                                            <div className='float-end'>
                                                {isEditing ? (
                                                    <button type="button" className="btn btn-primary mt-3" disabled={disabled} onClick={handleEdit}>Editar Tarea</button>
                                                ) : (
                                                    <button type="button" className="btn btn-primary mt-3" disabled={disabled} onClick={handleSubmit}>Agregar Tarea</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-bg-danger">
                        <b className='text-white float-end'>Coopeuch</b>
                    </div>
                </div>
            </div>
        </div>
    )
}
