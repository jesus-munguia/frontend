import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const NewTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const newTask = {
                Title: title,
                Description: description,
                IsCompleted: isCompleted
            };

            await api.post('Task', newTask);
            navigate('/'); 
        } catch (error) {
            console.error('Error creando task:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-white">Crear Nueva Tarea</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3 text-white">
                    <label htmlFor="title">Título:</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3 text-white">
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group mb-3 text-white">
                    <label htmlFor="status">Estado:</label>
                    <select
                        id="status"
                        className="form-control"
                        value={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.value === 'true')}
                    >
                        <option value={false}>Pendiente</option>
                        <option value={true}>Completada</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Crear Tarea</button>
            </form>
        </div>
    );
};

export default NewTask;
