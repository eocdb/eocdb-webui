import * as React from 'react';
import Dropzone, { FileRejection, Accept } from 'react-dropzone';
import styled from "styled-components";


interface FileUploadProps {
    label: string;
    onChange: (acceptedFiles: File[]) => void;
    files: File[];
    acceptedFiles?: Accept;
    onDropRejected: (files: File[]) => void;
}


const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isFocused) {
        return '#2196f3';
    }
    return '#eeeeee';
}


const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;


export default function FileUpload(props: FileUploadProps) {

    const handleOnchange = (files: File[]) => {
        props.onChange(files);
    };

    const handleOnDropRejected = (fileRejections: FileRejection[]) => {
        const files = fileRejections.map((fileRejection: FileRejection) => {
            return fileRejection.file;
        });
        props.onDropRejected(files);
    };

    return (
        <Dropzone onDrop={handleOnchange} onDropRejected={handleOnDropRejected} accept={props.acceptedFiles}>
            {({acceptedFiles, fileRejections, getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject}) => (
                <section>
                    <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ? <p>Drop files here...</p> :
                                <p>{props.label}</p>
                        }
                        {
                            props.files.length > 0 ? 'Accepted:' : ''
                        }
                        {
                            props.files.map((file: File) => {
                                return "\u00A0 " + file.name + "\u00A0";
                            })
                        }
                        {
                            fileRejections.length > 0 ? <br></br> : ''
                        }
                        {
                            fileRejections.length > 0 ? 'Rejected:' : ''
                        }
                        {
                            fileRejections.map(
                                (file: FileRejection) => {
                                    return "\u00A0 " + file.file.name + "\u00A0";
                                }
                            )
                        }
                    </Container>
                </section>
            )}
        </Dropzone>
    );
}
