var pica = new pica();
var zip = new JSZip();
var data = [];

function displayFiles() {
    let files = document.getElementById('badge-files').files;
    console.log(files);
}

function postEmotes() {
    let files = document.getElementById('emote-files').files;
    let images = document.getElementById('emotes-container');
    images.style.border = 'solid 0.125rem #9446ff';

    for (let i = 0; i < files.length; i++) {
        let imageSet = document.createElement("div");
        imageSet.setAttribute('class', 'image-set');
        let file = files[i];
        let source = "";
        let image112;
        let image56;
        let image28;

        const reader = new FileReader();
        reader.onloadend = function () {
            var fileName = file.name.substr(0, file.name.lastIndexOf('.'));
            source = reader.result.toString();

            image112 = resize(imageSet, 112, source);
            image112.setAttribute("title", fileName + "_112");
            data.push(image112);

            image56 = resize(imageSet, 56, source);
            image56.setAttribute("title", fileName + "_56");
            data.push(image56);


            image28 = resize(imageSet, 28, source);
            image28.setAttribute("title", fileName + "_28");
            data.push(image28);
        }

        reader.readAsDataURL(file);
        images.appendChild(imageSet);
    }
}

function postBadges() {
    let files = document.getElementById('badge-files').files;
    let images = document.getElementById('badges-container');
    images.style.border = 'solid 0.125rem #9446ff';

    for (let i = 0; i < files.length; i++) {
        let imageSet = document.createElement("div");
        imageSet.setAttribute('class', 'image-set');
        let file = files[i];
        let source = "";
        let image72;
        let image36;
        let image18;

        const reader = new FileReader();
        reader.onloadend = function () {
            var fileName = file.name.substr(0, file.name.lastIndexOf('.'));
            source = reader.result.toString();

            image112 = resize(imageSet, 72, source);
            image112.setAttribute("title", fileName + "_72");
            data.push(image72);

            image56 = resize(imageSet, 36, source);
            image56.setAttribute("title", fileName + "_36");
            data.push(image36);


            image28 = resize(imageSet, 18, source);
            image28.setAttribute("title", fileName + "_18");
            data.push(image18);
        }

        reader.readAsDataURL(file);
        images.appendChild(imageSet);
    }
}


function resize(container, size, path) {
    let canvas = document.createElement('canvas');
    let scaledImage = new Image();
    scaledImage.src = path;

    canvas.width = size;
    canvas.height = size;

    scaledImage.onload = function() {
        pica.resize(scaledImage, canvas, {
            quality: 2,
            alpha: true
        });
    }

    container.appendChild(canvas);

    return canvas;
}

function urlToPromise(url) {
    return new Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(url, function(err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
}

function downloadAll() {
    for (let i = 0; i < data.length; i++) {
        zip.file(data[i].title + ".png", urlToPromise(data[i].toDataURL()), {binary:true});
    }

    zip.generateAsync({type: "blob"})
        .then(function(content) {
            saveAs(content, "archive.zip");
        })
}

function typeSelector(imgType) {
    let tabcontent = document.getElementsByClassName("tabcontent");

    for (let i = 0; i < tabcontent.length; i++)
        tabcontent[i].style.display = "none";

    let tablinks = document.getElementsByClassName("tablinks");

    for (let i = 0; i < tablinks.length; i++)
        tablinks[i].className = tablinks[i].className.replace(" active", "");

    document.getElementById(imgType.toLowerCase()).style.display = "block";
    this.className += " active";
}

const chooser = document.getElementById('emote-files');
chooser.addEventListener('input', postEmotes);

const badgesUpload = document.getElementById('badge-files');
badgesUpload.addEventListener('input', postBadges);

const downloader = document.getElementById('download-button');
downloader.addEventListener('click', downloadAll);




