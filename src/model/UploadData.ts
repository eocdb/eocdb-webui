export interface UploadData {
    dataFiles: File[];
    docFiles: File[];
    submissionId: string;
    path: string;
    publicationDate: string|null;
    allowPublication: boolean;
    username: string;
    userId: string;
}


export interface SingleUpload {
    file: File;
    submissionId: string;
    path: string;
    publicationDate: string|null;
    allowPublication: boolean;
    username: string;
    userId: string;
}
