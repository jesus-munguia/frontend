import React, { useState, useEffect } from 'react';
import api from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTask, setEditedTask] = useState({ title: '', description: '', isCompleted: false, id: '', createdAt: '' });
    const [searchTerm, setSearchTerm] = useState('');

    //Enlistar
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('Task');
                setTasks(response.data);
            } catch (error) {
                console.error('Error obteniendo tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    // Activar modificacion
    const handleEditClick = (task) => {
        setEditTaskId(task.id);
        setEditedTask({
            title: task.title,
            description: task.description,
            isCompleted: task.isCompleted,
            id: task.id,
            createdAt: task.createdAt
        });
    };
    //Actualizar 

    const handleSave = async () => {
        if (!editedTask.title || !editedTask.description) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const updatedTask = {
                Title: editedTask.title,
                Description: editedTask.description,
                IsCompleted: editedTask.isCompleted,
                Id: editedTask.id
            };

            await api.put(`Task/${editedTask.id}`, updatedTask);

            const response = await api.get('Task');
            setTasks(response.data);
            setEditTaskId(null);
        } catch (error) {
            console.error('Error actualizando task:', error);
        }
    };
    // Borrar

    const handleDelete = async (id) => {
        try {
            await api.delete(`Task/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error borrando task:', error);
        }
    };

    const handleCancel = () => {
        setEditTaskId(null);
    };

    // Barra de búsqueda
    const filteredTasks = tasks.filter(task => {
        return (
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-white">Lista de Tareas</h1>

            {/* Barra de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar tareas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Fecha de Creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.map((task) => (
                        <tr key={task.id}>
                            {editTaskId === task.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editedTask.title}
                                            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <textarea
                                            className="form-control"
                                            value={editedTask.description}
                                            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            className="form-control"
                                            value={editedTask.isCompleted}
                                            onChange={(e) => setEditedTask({ ...editedTask, isCompleted: e.target.value === 'true' })}
                                        >
                                            <option value={true}>Completada</option>
                                            <option value={false}>Pendiente</option>
                                        </select>
                                    </td>
                                    <td>{new Date(editedTask.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-primary me-2" onClick={handleSave}>Aceptar</button>
                                        <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>
                                        <span className={`badge ${task.isCompleted ? 'bg-success' : 'bg-warning text-black'}`}>
                                            {task.isCompleted ? 'Completada' : 'Pendiente'}
                                        </span>
                                    </td>
                                    <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-warning me-2" onClick={() => handleEditClick(task)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Borrar</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <a href="/nueva-tarea" className="btn btn-success mt-4">Crear Nueva Tarea</a>
        </div>
    );
};

export default TaskList;
