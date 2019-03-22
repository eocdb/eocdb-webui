export interface UploadData {
    dataFiles: File[];
    docFiles: File[];
    submissionId: string;
    path: string;
    publicationDate: string|null;
    username: string;
}
