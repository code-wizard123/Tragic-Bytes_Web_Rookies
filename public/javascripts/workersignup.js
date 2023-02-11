const linkshow = document.getElementById('linktext')

const fileupload = () => {
    const client = filestack.init("AqIhMj2cQRZqk3hoxPVesz");
    const options = {
        fromSources: ["local_file_system"],
        accept: ['.png', '.jpg', '.jpeg'],
        onUploadDone: file => {
            linkshow.classList.remove('hidden');
            linkshow.value = file.filesUploaded[0].url;
        },
        acceptFn: (file, options) => {
            const mimeFromExtension = options.mimeFromExtension(file.originalFile.name);
            if (options.acceptMime.length && !options.acceptMime.includes(mimeFromExtension)) {
                return Promise.reject('Cannot accept that file')
            }
            return Promise.resolve()
        },
    };
    client.picker(options).open();
}


