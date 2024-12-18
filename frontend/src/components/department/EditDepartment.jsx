import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({});
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/department/${id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/department/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {depLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="max-w-3xl mx-auto mt-10 ng-white p-8 rounded-md shadow-md w-96">
                    <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
                    <form>
                        <div>
                            <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                value={department.dep_name || ""}
                                disabled
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={department.description || ""}
                                disabled
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Delete Department
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EditDepartment;
