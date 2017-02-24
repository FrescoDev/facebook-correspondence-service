import {Bot} from 'facebook-messenger-bot';
import settings from '../service-container/configuration';

const correspondent = new Bot(settings.fb.myPageToken, settings.fb.myVerification);
export default correspondent;