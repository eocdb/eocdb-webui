import { User } from '../model';
import { getLocalStorage, Storage } from "../tools/storage";

export interface SessionState {
    user: User | null;
    userLoginError: string | null;
    userLoginInProgress: boolean;
    legalAgreementAccepted: boolean;
    userLoggedIn: boolean;
}


export function newSessionState() {
    const state: SessionState = {
        user: null,
        userLoginError: null,
        userLoginInProgress: false,
        legalAgreementAccepted: false,
        userLoggedIn: false,
    };

    return loadUserSettings(state);
}


export function storeUserSettings(settings: SessionState) {
    const storage = getLocalStorage();
    if (storage) {
        try {
            _storeProperty(storage, 'legalAgreementAccepted', settings);
        } catch (e) {
            console.warn(`failed to store user settings: ${e}`);
        }
    }
}


export function loadUserSettings(defaultSettings: SessionState): SessionState {
    const storage = getLocalStorage();
    if (storage) {
        const settings = {...defaultSettings};
        try {
            _loadBooleanProperty(storage, 'legalAgreementAccepted', settings, defaultSettings);
        } catch (e) {
            console.warn(`failed to load user settings: ${e}`);
        }
        return settings;
    }
    return defaultSettings;
}

function _storeProperty(storage: Storage, propertyName: string, source: any) {
    storage.setItem(`ocdb.${propertyName}`, source[propertyName] + '');
    // console.log(`stored xcube.${propertyName}`, source);
}

function _loadBooleanProperty(storage: Storage, propertyName: string, target: any, defaultObj: any) {
    const value = storage.getItem(`ocdb.${propertyName}`);
    if (value !== null) {
        target[propertyName] = value == 'true';
    } else {
        target[propertyName] = !!defaultObj[propertyName];
    }
    // console.log(`loaded xcube.${propertyName}`, target);
}

// function _loadIntProperty(storage: Storage, propertyName: string, target: any, defaultObj: any) {
//     const value = storage.getItem(`xcube.${propertyName}`);
//     if (value !== null) {
//         target[propertyName] = parseInt(value);
//     } else {
//         target[propertyName] = defaultObj[propertyName];
//     }
//     // console.log(`loaded xcube.${propertyName}`, target);
// }
