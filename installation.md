**다운로드/설치 전에 꼭 아래 설명을 읽어주세요!**

# 설치

## Windows(64비트)

아래에서 exe 파일을 다운받고 실행하면 자동으로 설치돼요. 이떄 Microsoft Defender SmartScreen이 뜨면 고급 옵션에서 실행하기를 눌러주세요.

## Windows(32비트)

아래에서 msi 파일을 다운받고 설치해주세요. 이떄 Microsoft Defender SmartScreen이 뜨면 고급 옵션에서 실행하기를 눌러주세요.

## macOS

아래에서 dmg 파일을 다운받고 마운트한 다음, 왼쪽의 YouTube Downloader를 오른쪽의 애플리케이션 폴더로 드래그해주세요.

**__중요__**: 첫 실행 시 아래와 같은 창이 떠요. 

![Blocked](./macos-blocked.png)

이 경우 Finder-애플리케이션-YouTube Downloader를 우클릭-열기에서 열기를 눌러주세요. (2번째 실행부터는 Launchpad를 이용하면 돼요)

![Open-1](./macos-open-1.png)

![Open-2](./macos-open-2.png)

## Linux

Ubuntu/Debian: deb 파일

RedHat/Fefora/CentOS: rpm 파일

Arch linux/Manjaro: pacman 파일

을 다운받은 다음 OS의 패키지 매니저를 이용해 설치해주세요.

Ubuntu/Debian: 파일 더블클릭 - 설치 혹은 `sudo apt install <파일 경로>`

RedHat/Fedora/CentOS: 파일 더블클릭 - 설치 혹은 `sudo dnf install <파일 경로>`(dnf가 없을 경우 yum을 이용해주세요)

Arch linux: `sudo pacman -U <파일 경로>`

혹은 Ubuntu/Debian 리눅스의 경우 [PPA](https://github.com/team-int/ppa)를 통해 설치할 수도 있어요

(다른 리눅스 배포판은 지원하지 않아요.)

# 업데이트

## Windows(64비트, 32비트)

업데이트가 있으면 자동으로 다운로드/설치되며, 이 경우 앱을 재실행하면 업데이트가 적용돼요.

## macOS

macOS의 코드 사이닝 정책에 의해 자동 업데이트를 받을 수 없어요.

~~사실 이제 저희가 학생이다보니 개발자 인증받을 돈이 없어서 그런겁니다. 죄송하지만 이해해주세요. 근데 왜 이게 돈이 드는거냐고ㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ~~

## Linux

Debian/Ubuntu 계열: PPA를 통해 설치한 경우 `sudo apt update`와 `sudo apt upgrade`로 업데이트할 수 있어요.

다른 리눅스 배포판은 업데이트를 지원하지 않아요.