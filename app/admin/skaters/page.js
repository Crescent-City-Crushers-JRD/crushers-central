import {useState} from "react";

export default function AdminSkatersPage() {
    const [editId, setEditId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [skaterPayload, setSkaterPayload] = useState({
        status: ""
    });

    return (
        <div>Coming Soon</div>
    )
}