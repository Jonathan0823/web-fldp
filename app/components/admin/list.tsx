import React from 'react';

// Define the interface matching your schema
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
    onEdit: (id: string) => void;
}

const AdminList: React.FC<AdminListProps> = ({ items, onDelete, onEdit }) => {
    console.log(items);
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-green-500 text-white text-left">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">NIP</th>
                            <th className="py-3 px-4">Fakultas</th>
                            <th className="py-3 px-4">Prodi</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Mata Kuliah</th>
                            <th className="py-3 px-4">Created At</th>
                            <th className="py-3 px-4">Updated At</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={item.id}
                                className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <td className="py-3 px-4">{item.nama}</td>
                                <td className="py-3 px-4">{item.nip}</td>
                                <td className="py-3 px-4">{item.fakultas}</td>
                                <td className="py-3 px-4">{item.prodi}</td>
                                <td className="py-3 px-4">{item.email}</td>
                                <td className="py-3 px-4">{item.matakuliah}</td>
                                <td className="py-3 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4">{new Date(item.updatedAt).toLocaleDateString()}</td>
                                <td className="py-3 px-4 flex space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded transition duration-200"
                                        onClick={() => onEdit(item.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded transition duration-200"
                                        onClick={() => onDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminList;
