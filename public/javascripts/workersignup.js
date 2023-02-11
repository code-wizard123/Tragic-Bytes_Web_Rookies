const fileupload = () => {
    console.log("hello")
    const client = filestack.init("AqIhMj2cQRZqk3hoxPVesz");
    const options = {
        fromSources: ["local_file_system", "instagram", "facebook"],
    };
    client.picker(options).open();
}
