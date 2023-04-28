# Chatty

IM based on Tim SDK, Vue3, Vite, Unocss, Mobx.

## Features

* pure css emojis by [unocss](https://unocss.dev/presets/icons).
* keep logged in.
* create your Chatty room by SDKAppID and secretKey.
* support [locales](https://vue-i18n.intlify.dev/)
* support [themes](https://vueuse.org/core/useDark/#usedark)

## Usage

Register an account and get SDKAppID and secretKey in [TIM](https://console.cloud.tencent.com/im).

Login system by SDKAppID and secretKey, then create your userID. we connect each other by userID.

## tips

IM based on Tim SDK, so you need to login with the same SDKAppID and secretKey to chat to others.

## todo

- [ ] Support upload image
- [ ] Support upload file 
- [ ] Support custom message
- [ ] Support audio and video message
- [ ] Support revoke message
- [ ] Support group message

## License

[MIT](https://github.com/chinbor/Chatty/blob/main/LICENSE) License © 2023 [chinbor](https://github.com/chinbor)
