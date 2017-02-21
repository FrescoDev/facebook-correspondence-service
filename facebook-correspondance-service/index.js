import settings from '../service-container/configuration';
import {Bot, Elements, Buttons} from 'facebook-messenger-bot';

const bot = new Bot(settings.fb.myPageToken, settings.fb.myVerification);

bot.on('message', async message => {
    let buttons;

    console.log(message);
    const {sender} = message;
    await sender.fetch('first_name');

    let out = new Elements();
    out.add({text: `Hey ${sender.first_name}, NioBi here! How are you ?`});

    await bot.send(sender.id, out);

    await Bot.wait(1000);

    // ---- send buttons (single card)
    buttons = new Buttons();
    buttons.add({text: 'Google', url: 'http://google.com'});
    buttons.add({text: 'Yahoo', url: 'http://yahoo.com'});
    buttons.add({text: 'Bing', url: 'http://bing.com'});
    
    out = new Elements();
    out.add({text: 'search engines', subtext: 'click to get redirected', buttons}); // add a card
    await bot.send(sender.id, out);
});

export default bot