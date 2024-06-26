const tg = window.Telegram.WebApp;


export function useTelegram() {

    const onClose = () => {
        tg.close()
    };
    const onToggleButton = () => {
        if(tg.MainButton.isVisible){
            tg.ManiButton.show();
        }else {
            tg.ManiButton.show();
        }
    }
    return {
        onClose,
        onToggleButton,
        tg,
        user:tg.initDataUnsafe?.user
    }
}