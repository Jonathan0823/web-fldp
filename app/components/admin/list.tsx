import React, { useState } from 'react';

interface Item {
    id: string;
    nama: string;
    nip: string;
    fakultas: string;
    prodi: string;
    email: string;
    matakuliah: string;
    createdAt: string;
    updatedAt: string;
}

interface AdminListProps {
    items: Item[];
    onDelete: (id: string) => void;
    onEdit: (updatedItem: Item) => void;  
}

const AdminList: React.FC<AdminListProps> = ({ items, onDelete, onEdit }) => {
    const [editRowId, setEditRowId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Item | null>(null);  

    const handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
        if (editFormData) {
            setEditFormData({
                ...editFormData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleEditClick = (item: Item) => {
        setEditRowId(item.id);
        setEditFormData(item);
    };

    const handleSubmitClick = () => {
        if (editFormData) {
            onEdit(editFormData);
            setEditRowId(null);
            setEditFormData(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-green-500 text-white text-left">
                            <th className="py-3 px-2 sm:px-4">Name</th>
                            <th className="py-3 px-2 sm:px-4">NIP</th>
                            <th className="py-3 px-2 sm:px-4">Fakultas</th>
                            <th className="py-3 px-2 sm:px-4">Prodi</th>
                            <th className="py-3 px-2 sm:px-4">Email</th>
                            <th className="py-3 px-2 sm:px-4">Mata Kuliah</th>
                            <th className="py-3 px-2 sm:px-4">Created At</th>
                            <th className="py-3 px-2 sm:px-4">Updated At</th>
                            <th className="py-3 px-2 sm:px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center text-lg font-semibold p-4">
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            items.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                    <td className="py-3 px-2 sm:px-4">
                                        {editRowId === item.id ? (
                                            <input
                                                type="text"
                                                name="nama"
                                                value={editFormData?.nama || ''}
                                                onChange={handleInputChange}
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            item.nama
                                        )}
                                    </td>
                                    <td className="py-3 px-2 sm:px-4">
                                        {editRowId === item.id ? (
                                            <input
                                                type="text"
                                                name="nip"
                                                value={editFormData?.nip || ''}
                                                onChange={handleInputChange}
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            item.nip
                                        )}
                                    </td>
                                    <td className="py-3 px-2 sm:px-4">
                                        {editRowId === item.id ? (
                                            <input
                                                type="text"
                                                name="fakultas"
                                                value={editFormData?.fakultas || ''}
                                                onChange={handleInputChange}
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            item.fakultas
                                        )}
                                    </td>
                                    <td className="py-3 px-2 sm:px-4">
                                        {editRowId === item.id ? (
                                            <input
                                                type="text"
                                                name="prodi"
                                                value={editFormData?.prodi || ''}
                                                onChange={handleInputChange}
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            item.prodi
                                        )}
                                    </td>
                                    <td className="py-3 px-2 sm:px-4">
                                        {editRowId === item.id ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editFormData?.email || ''}
                                                onChange={handleInputChange}
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            item.email
                                        )}
                                    </td>
                                    <td className="py-3 px-2 sm:px-4">
                                        {editRowId === item.id ? (
                                            <input
                                                type="text"
                                                name="matakuliah"
                                                value={editFormData?.matakuliah || ''}
                                                onChange={handleInputChange}
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        ) : (
                                            item.matakuliah
                                        )}
                                    </td>
                                    <td className="py-3 px-2 sm:px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-2 sm:px-4">{new Date(item.updatedAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-2 sm:px-4 flex space-x-2">
                                        {editRowId === item.id ? (
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded transition duration-200"
                                                onClick={handleSubmitClick}
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 w-20 px-2 rounded transition duration-200"
                                                onClick={() => handleEditClick(item)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded transition duration-200"
                                            onClick={() => onDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminList;
