import { enderecoServidorGraphql } from "../../configuracao";

export class UploadAdapter {

    private loader: any;

    constructor(loader) {
        this.loader = loader;
    }

    upload(info) {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const data = new FormData();
                data.append('arquivo', file);
                data.append('nome', file.name);
                var url = `${enderecoServidorGraphql}/upload`;
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.onload = function () {
                    const result = JSON.parse(xhr.responseText);
                    if (result['ok']) {
                        resolve({ default: result['url'] })
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.send(data);
            }));
    }

    abort() {
    }

}