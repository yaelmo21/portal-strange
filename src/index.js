import html2canvas from 'html2canvas';
import './styles.scss';

const portal = document.getElementById('portal');
const inputFile = document.getElementById('input-file');
const image = document.getElementById('image');
const buttonUpload = document.getElementById('button-upload');
const downloadImage = document.getElementById('download-image');
const containerPortal = document.getElementById('container-portal');
const footer = document.querySelector('footer');
downloadImage.style.visibility = 'hidden';
containerPortal.style.display = 'none';

const renderPortal = () => {
    for (let i = 0; i < 360; i++) {
        const chispa = document.createElement('div');
        chispa.className = 'chispa';
        const chispaTranslate = Math.random() * (250 - 220) + 220;
        chispa.style.transform = `rotate(${i * 2}deg) translate(${chispaTranslate}px)`;
        portal.appendChild(chispa);
    }
}

buttonUpload.onclick = () => inputFile.click();

inputFile.onchange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        image.src = reader.result;
        containerPortal.style.display = 'block';
        downloadImage.style.visibility = 'visible';
        renderPortal();
    }
}


downloadImage.onclick = async() => {
    footer.style.visibility = 'hidden';
    const canvas = await html2canvas(document.querySelector('main'), {
        backgroundColor: '#000',
    });
    footer.style.visibility = 'visible';
    const imageData = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');
    link.download = 'portal-strange.png';
    link.href = imageData;
    link.click();
}