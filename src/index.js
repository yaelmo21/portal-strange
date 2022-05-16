import "@babel/polyfill";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2'
import { saveAs } from 'file-saver';
import './styles.scss';

const main = document.querySelector('main');
const portal = document.getElementById('portal');
const inputFile = document.getElementById('input-file');
const image = document.getElementById('image');
const buttonUpload = document.getElementById('button-upload');
const downloadImage = document.getElementById('download-image');
const containerPortal = document.getElementById('container-portal');
const footer = document.querySelector('footer');
const buttonReset = document.getElementById('button-reset');


buttonReset.style.visibility = 'hidden';
downloadImage.style.visibility = 'hidden';
containerPortal.style.display = 'none';

const renderPortal = () => {
    const countChildren = portal.childNodes.length;
    if (countChildren === 0) {
        for (let i = 0; i < 360; i++) {
            const chispa = document.createElement('div');
            chispa.className = 'chispa';
            const chispaTranslate = Math.random() * (250 - 220) + 220;
            chispa.style.transform = `rotate(${i * 2}deg) translate(${chispaTranslate}px)`;
            portal.appendChild(chispa);
        }
    }
}

buttonUpload.onclick = () => inputFile.click();

inputFile.onchange = ({ target }) => {
    const file = target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        image.src = reader.result;
        containerPortal.style.display = 'block';
        downloadImage.style.visibility = 'visible';
        buttonReset.style.visibility = 'visible';
        renderPortal();
    }
    inputFile.value = '';
}


downloadImage.onclick = async() => {
    main.classList.remove('no-scroll');
    footer.style.visibility = 'hidden';
    Swal.fire('Please wait');
    Swal.showLoading();
    const canvas = await html2canvas(document.querySelector('main'), {
        backgroundColor: '#000',
    });

    footer.style.visibility = 'visible';
    main.classList.add('no-scroll');
    const imageData = canvas.toDataURL('image/png');
    saveAs(imageData, 'portal');
    Swal.close();
    Swal.fire({
        title: 'Image saved',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
    });

}

buttonReset.onclick = () => {
    containerPortal.style.display = 'none';
    downloadImage.style.visibility = 'hidden';
    buttonReset.style.visibility = 'hidden';
    image.src = '';
}