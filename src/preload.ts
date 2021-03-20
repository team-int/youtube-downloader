import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCFormField } from '@material/form-field';
import { MDCRadio } from '@material/radio';
import ytdl from 'ytdl-core';
import ffmpeg from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import child from 'child_process';
import os from 'os';
window.addEventListener('load', () => {
    console.log('\x1b[37m\x1b[31m%s\x1b[0m\n\x1b[37m\x1b[31m%s\x1b[0m\n\x1b[37m\x1b[31m%s\x1b[0m\n\x1b[37m\x1b[31m%s\x1b[0m\n\x1b[37m\x1b[31m%s\x1b[0m\n\x1b[37m\x1b[34m%s\x1b[33m%s\x1b[32m%s\x1b[0m\n\x1b[37m\x1b[34m%s\x1b[33m%s\x1b[32m%s\x1b[0m\n\x1b[37m\x1b[34m%s\x1b[33m%s\x1b[32m%s\x1b[0m\n\x1b[37m\x1b[34m%s\x1b[33m%s\x1b[32m%s\x1b[0m\n\x1b[37m\x1b[34m%s\x1b[33m%s\x1b[32m%s\x1b[0m\n\x1b[37m\x1b[30m%s\x1b[0m\n\x1b[37m\x1b[30m%s\x1b[0m\n\x1b[37m\x1b[30m%s\x1b[0m\n\x1b[37m\x1b[30m%s\x1b[0m\n\x1b[37m\x1b[30m%s\x1b[0m', '            intintintint', '            intintintint', '            intintintint', '            intintintint', '            intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', 'intintintint', '            intintintint', '            intintintint', '            intintintint', '            intintintint', '            intintintint');
    if (!fs.existsSync(path.join(os.homedir(), '/.youtube-download'))) fs.mkdirSync(path.join(os.homedir(), '/.youtube-download'));
    if (!fs.existsSync(path.join(os.homedir(), '/YouTube'))) fs.mkdirSync(path.join(os.homedir(), '/YouTube'));
    const sessionId: number = Math.floor(Math.random() * 1000000);
    fs.mkdirSync(path.join(os.homedir(), '/.youtube-download/', sessionId.toString()));
    const textField = new MDCTextField(document.querySelector('#videoid-container') as Element);
    new MDCRipple(document.querySelector('#searchBtn') as Element);
    new MDCRipple(document.querySelector('#download') as Element);
    document.querySelector('#searchBtn')?.addEventListener('click', () => {
        ytdl.getInfo(`https://youtube.com/watch?v=${textField.value}`).then((info) => {
            (window as any).info = info;
            let formats: Array<string> = [];
            (document.querySelector('#header') as HTMLElement).style.display = 'none';
            (document.querySelector('#dloptions') as HTMLElement).style.display = 'block';
            (Array.from(document.querySelectorAll('.mdc-form-field')) as Array<HTMLElement>).forEach(x => x.innerHTML = '');
            document.querySelector('#thumbnail')?.setAttribute('src', info.videoDetails.thumbnails.sort((a, b) => b.width * b.height - a.width * a.height)[0].url);
            document.querySelector('#title')!.innerHTML = info.videoDetails.title;
            document.querySelector('#author')!.innerHTML = info.videoDetails.author.name;
            document.querySelector('#duration')!.innerHTML = `${Number(info.videoDetails.lengthSeconds) / 3600 | 0}:${Number(info.videoDetails.lengthSeconds) % 3600 / 60 | 0}:${Number(info.videoDetails.lengthSeconds) % 60}`;
            for (let format of info.formats.filter(x => x.hasVideo).sort((a, b) => b.height! - a.height!)) {
                const div = document.createElement('div');
                div.setAttribute('class', 'mdc-radio');
                div.innerHTML = `<input class="mdc-radio__native-control video" class="video" type="radio" id="${format.itag}-video" name="video"><div class="mdc-radio__background"><div class="mdc-radio__outer-circle"></div><div class="mdc-radio__inner-circle"></div></div><div class="mdc-radio__ripple"></div>`;
                const label = document.createElement('label');
                label.setAttribute('for', `${format.itag}-video`);
                label.innerHTML = `${format.qualityLabel}(${format.container})`;
                document.querySelector('#radio-container-video')?.appendChild(div);
                document.querySelector('#radio-container-video')?.appendChild(label);
            }
            for (let format of info.formats.filter(x => x.hasAudio).sort((a, b) => b.height! - a.height!)) {
                const div = document.createElement('div');
                div.setAttribute('class', 'mdc-radio');
                div.innerHTML = `<input class="mdc-radio__native-control" class="audio" type="radio" id="${format.itag}-audio" name="audio"><div class="mdc-radio__background"><div class="mdc-radio__outer-circle"></div><div class="mdc-radio__inner-circle"></div></div><div class="mdc-radio__ripple"></div>`;
                const label = document.createElement('label');
                label.setAttribute('for', `${format.itag}-audio`);
                label.innerHTML = `${format.audioBitrate}kbps(${format.container})`;
                document.querySelector('#radio-container-audio')?.appendChild(div);
                document.querySelector('#radio-container-audio')?.appendChild(label);
            }
            const div = document.createElement('div');
            div.setAttribute('class', 'mdc-radio');
            div.innerHTML = `<input class="mdc-radio__native-control video" type="radio" id="novideo" name="video"><div class="mdc-radio__background"><div class="mdc-radio__outer-circle"></div><div class="mdc-radio__inner-circle"></div></div><div class="mdc-radio__ripple"></div>`;
            const label = document.createElement('label');
            label.setAttribute('for', 'novideo');
            label.innerHTML = '오디오만 다운로드';
            document.querySelector('#radio-container-video')?.appendChild(div);
            document.querySelector('#radio-container-video')?.appendChild(label);
            formats = ['mp4', 'webm', 'mkv', 'avi'];
            for (let x of formats) {
                const div = document.createElement('div');
                div.setAttribute('class', 'mdc-radio');
                div.innerHTML = `<input class="mdc-radio__native-control format" type="radio" id="${x}" name="format"><div class="mdc-radio__background"><div class="mdc-radio__outer-circle"></div><div class="mdc-radio__inner-circle"></div></div><div class="mdc-radio__ripple"></div>`;
                const label = document.createElement('label');
                label.setAttribute('for', x);
                label.innerHTML = x;
                document.querySelector('#radio-container-format')?.appendChild(div);
                document.querySelector('#radio-container-format')?.appendChild(label);
            }
            for (let x of Array.from(document.querySelectorAll('.video'))) {
                x.addEventListener('click', e => {
                    document.querySelector('#radio-container-format')!.innerHTML = '';
                    if ((e.target as HTMLInputElement).id == 'novideo') {
                        formats = ['mp3', 'm4a', 'webm'];
                    } else {
                        formats = ['mp4', 'webm', 'mkv', 'avi'];
                    }
                    for (let x of formats) {
                        const div = document.createElement('div');
                        div.setAttribute('class', 'mdc-radio');
                        div.innerHTML = `<input class="mdc-radio__native-control format" type="radio" id="${x}" name="format"><div class="mdc-radio__background"><div class="mdc-radio__outer-circle"></div><div class="mdc-radio__inner-circle"></div></div><div class="mdc-radio__ripple"></div>`;
                        const label = document.createElement('label');
                        label.setAttribute('for', x);
                        label.innerHTML = x;
                        document.querySelector('#radio-container-format')?.appendChild(div);
                        document.querySelector('#radio-container-format')?.appendChild(label);
                    }
                });
            }
            const videoSelection = new MDCFormField(document.querySelector('#radio-container-video') as Element);
            const audioSelection = new MDCFormField(document.querySelector('#radio-container-audio') as Element);
            const formatSelection = new MDCFormField(document.querySelector('#radio-container-format') as Element);
            videoSelection.input = new MDCRadio(document.querySelector('.video') as Element);
            audioSelection.input = new MDCRadio(document.querySelector('.audio') as Element);
            formatSelection.input = new MDCRadio(document.querySelector('.format') as Element);
        });
    });
    document.querySelector('#download')?.addEventListener('click', () => {
        // @ts-ignore
        let videoId: string = Array.from(document.querySelectorAll('.video')).find((x: HTMLInputElement) => x.checked)?.id.replace('-video', '');
        // @ts-ignore
        let audioId: string = Array.from(document.querySelectorAll('.audio')).find((x: HTMLInputElement) => x.checked)?.id.replace('-audio', '');
        // @ts-ignore
        let format: string = Array.from(document.querySelectorAll('.format')).find((x: HTMLInputElement) => x.checked)?.id;
        (document.querySelector('#search') as HTMLElement).style.display = 'none';
        (document.querySelector('#metadata') as HTMLElement).style.display = 'none';
        (document.querySelector('#dloptions') as HTMLElement).style.display = 'none';
        (document.querySelector('#downloading') as HTMLElement).style.display = 'block';
        let doneItems: number = 0;
        if (videoId == 'novideo') {
            for (let x of (Array.from(document.querySelectorAll('.onlyvideo')) as Array<HTMLLIElement>)) {
                x.style.display = 'none';
            }
            const dl = ytdl(`https://youtube.com/watch?v=${textField.value}`, {
                quality: audioId
            });
            dl.pipe(fs.createWriteStream(path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/audio`)));
            dl.on('end', () => {
                (document.querySelector('#audiodl') as HTMLLIElement).innerHTML = '100';
                const enc = child.spawn(ffmpeg, [
                    '-loglevel', '8', '-hide_banner', '-i', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), '/audio'), '-vn', path.join(os.homedir(), '/YouTube/', `${(window as any).info.videoDetails.title.replace(/ /gi, '-')}.${format}`)
                ], {
                    windowsHide: true,
                    stdio: [
                        'inherit', 'inherit', 'inherit'
                    ]
                });
                enc.on('close', () => {
                    (document.querySelector('#audioenc') as HTMLLIElement).innerHTML = '100';
                    alert(`오디오가 모두 다운로드됐어요. 파일은 ${os.homedir()}${process.platform == 'win32' ? '\\' : '/'}YouTube${process.platform == 'win32' ? '\\' : '/'}${(window as any).info.videoDetails.title.replace(/ /gi, '-')}.${format}에서 찾을 수 있어요.`);
                    fs.rmSync(path.join(os.homedir(), '/.youtube-download/', sessionId.toString()), {
                        recursive: true,
                        force: true
                    });
                });
            });
        } else {
            const videoDl = ytdl(`https://youtube.com/watch?v=${textField.value}`, {
                quality: videoId
            });
            videoDl.pipe(fs.createWriteStream(path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/pre_video`)));
            const audioDl = ytdl(`https://youtube.com/watch?v=${textField.value}`, {
                quality: audioId
            });
            audioDl.pipe(fs.createWriteStream(path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/pre_audio`)));
            videoDl.on('end', () => {
                (document.querySelector('#videodl') as HTMLLIElement).innerHTML = '100';
                (document.querySelector('#audiodl') as HTMLLIElement).innerHTML = '100';
                doneItems++;
                if (doneItems == 2) encode();
            });
            audioDl.on('end', () => {
                doneItems++;
                if (doneItems == 2) encode();
            });
        }
        function encode(): void {
            doneItems = 0;
            const videoEnc = child.spawn(ffmpeg, [
                '-loglevel', '8', '-hide_banner', '-i', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/pre_video`), '-an', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/video.webm`)
            ], {
                windowsHide: true,
                stdio: [
                    'inherit', 'inherit', 'inherit'
                ]
            });
            const audioEnc = child.spawn(ffmpeg, [
                '-loglevel', '8', '-hide_banner', '-i', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/pre_audio`), '-vn', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/audio.webm`)
            ], {
                windowsHide: true,
                stdio: [
                    'inherit', 'inherit', 'inherit'
                ]
            });
            videoEnc.on('close', () => {
                (document.querySelector('#videoenc') as HTMLLIElement).innerHTML = '100';
                doneItems++;
                if (doneItems == 2) merge();
            });
            audioEnc.on('close', () => {
                (document.querySelector('#audioenc') as HTMLLIElement).innerHTML = '100';
                doneItems++;
                if (doneItems == 2) merge();
            });
        }
        function merge(): void {
            const mergeing = child.spawn(ffmpeg, [
                '-loglevel', '8', '-hide_banner', '-i', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/video.webm`), '-i', path.join(os.homedir(), '/.youtube-download/', sessionId.toString(), `/audio.webm`), '-map', '0:v', '-map', '1:a', path.join(os.homedir(), '/YouTube/', `${(window as any).info.videoDetails.title.replace(/ /gi, '-')}.${format}`)
            ], {
                windowsHide: true,
                stdio: [
                    'inherit', 'inherit', 'inherit'
                ]
            });
            mergeing.on('close', () => {
                (document.querySelector('#merge') as HTMLLIElement).innerHTML = '100';
                alert(`비디오가 모두 다운로드됐어요. 파일은 ${os.homedir()}${process.platform == 'win32' ? '\\' : '/'}YouTube${process.platform == 'win32' ? '\\' : '/'}${(window as any).info.videoDetails.title.replace(/ /gi, '-')}.${format}에서 찾을 수 있어요.`);
                fs.rmSync(path.join(os.homedir(), '/.youtube-download/', sessionId.toString()), {
                    recursive: true,
                    force: true
                });
            });
        }
    });
});