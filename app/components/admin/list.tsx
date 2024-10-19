import React from 'react';

interface Item {
    id: number;
    name: string;
}

interface AdminListProps {
    items: Item[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const AdminList: React.FC<AdminListProps> = ({ items, onDelete, onEdit }) => {
    return (
        <div>
            <h2>Admin Dashboard</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => onEdit(item.id)}>Edit</button>
                        <button onClick={() => onDelete(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;