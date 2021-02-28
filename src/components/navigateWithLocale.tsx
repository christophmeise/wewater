import { navigate } from 'gatsby';
import i18n from 'i18next';

export default function navigateWithLocale(path: string) {
    if (i18n.language != 'de') {
        navigate('/' + i18n.language + path);
    } else {
        navigate(path);
    }
}

export function getPathWithLocale(path: string) {
    if (i18n.language != 'de') {
        return '/' + i18n.language + path;
    } else {
        return path;
    }
}
