import { DocumentSnapshot, FieldValue, Timestamp } from 'firebase/firestore/lite';

interface Model {
    createdAt: Date | FieldValue | Timestamp;
    deletedAt: Date | FieldValue | Timestamp | null;
    doc: DocumentSnapshot;
    id: string;
    updatedAt: Date | FieldValue | Timestamp | null;
}

export default Model;
