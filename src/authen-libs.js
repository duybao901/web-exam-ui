const WIDTH_POPUP = 760
const HEIGHT_POPUP = 600

function openPopupResize(urlNavigitation, popupName) {

    const screenLeft = window.screenLeft || window.screenX // IE8
    const screenTop = window.screenTop || window.screenY

    const width = window.outerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const height = window.outerHeight || document.documentElement.clientHeight || document.body.clientHeight

    const left = Math.max(0, (width / 2) - (WIDTH_POPUP / 2) + screenLeft)
    const top = Math.max(0, (height / 2) - (HEIGHT_POPUP / 2) + screenTop)

    const config = `width=${WIDTH_POPUP}, height=${HEIGHT_POPUP}, top=${top}, left=${left}, scrollbars=yes`

    return window.open(urlNavigitation, popupName, config)
}

const ExamAuth = (() => {
    return {
        AuthPopup(host, redirectUrl, popupName) {
            return new Promise((resolve, reject) => {
                const url = host + `?redirect_url=${redirectUrl}`

                const registerWindowPopup = openPopupResize(url, popupName)

                if (!registerWindowPopup) {
                    reject({ "error": true, "msg": "Popup Blocked" })
                }

                if (registerWindowPopup.focus) {
                    window.focus()
                }

                // checking status window
                const intervalId = setInterval(() => {
                    if (registerWindowPopup.closed) {
                        clearInterval(intervalId)
                        reject({ "error": true, "msg": "User Cancelled" })
                    }

                    let href = ""
                    try {
                        href = registerWindowPopup.location.href
                    } catch (err) {
                        // console.log(err)                        
                    }

                    // checking href or black page
                    if (!href || href === "about::blank") {
                        return;
                    }

                    if (href.startsWith(redirectUrl)) {
                        // console.log("Server send href",href )
                        clearInterval(intervalId)
                        resolve({ sucess: true, href })
                        registerWindowPopup.close()
                    }
                }, 50)
            })
        }
    }
})()

export default ExamAuth