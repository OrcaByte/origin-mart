
import { ReplaySubject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
type IObjectType = { [key: string]: any }


type InternalEventType = {
    type: 'circularProgressBar' | 'alert_toast' | string,
    data: any
}

const internalNotifier = new ReplaySubject<InternalEventType>(10);

export const emitInternalEvent = (a: InternalEventType) => internalNotifier.next(a);

export const listenInternalEvent = (eventName: InternalEventType["type"], cb: (a: any) => void): Subscription => {
    return internalNotifier.pipe(
        filter(event => event.type === eventName),
        map(b => b.data),
    ).subscribe(cb)
}


// ----------------------------------storage---------------------

export const setPersistStorage = (data: IObjectType) => {
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            sessionStorage.setItem(key, element.toString())
        }
    }
}

export const getPersistStorageValue = (key: string) => sessionStorage.getItem(key)
export const removeStorageItem = (key: string) => sessionStorage.removeItem(key)
export const clearStorage = () => sessionStorage.clear()

// -------------------end of Storage --------------------------



// ---------------begin form gen type json ---------------------



export const genTextFieldInput = (
    label: string,
    placeholder: string,
    formControlName: string,
    validator: (a: string) => any = (a) => true,
    initialValue = '',
    inputType = "text",
) => {
    return {
        label,
        componentNm: 'TextField',
        inputType,
        initialValue,
        placeholder,
        formControlName,
        validator
    };
}


export const genDatePickerInput = (
    label: string,
    placeholder: string,
    formControlName: string,
    validator: (a: string) => any = (a: string) => true,
    initialValue = '',
) => {
    return {
        label,
        componentNm: 'DatePicker',
        initialValue,
        placeholder,
        formControlName,
        validator
    };
}

export type Ioptions = {
    value: string,
    display: string
};


export const genSelectInputField = (
    label: string,
    placeholder: string,
    formControlName: string,
    options: (() => Ioptions[] | any) | Ioptions[],
    validator: (a: string) => any = (a) => true,
    initialValue?: any,
) => {
    return {
        label,
        componentNm: 'SelectField',
        options,
        initialValue,
        placeholder,
        formControlName,
        validator
    };
}









































export const mobileRegex = /^[0-9]{10}$/
export const zipCodeRegex = /^[0-9]{6}$/
export const emailRegex = /^\S+@\S+$/

export const genders = [
    {
        value: 'M',
        display: 'Male',
    },
    {
        value: 'F',
        display: 'Female',
    },
];

export const countries: Ioptions[] = [
    {
        value: 'India',
        display: 'India',
    },
];

export const maritialStatuses: Ioptions[] = [
    {
        value: 'Single',
        display: 'Single',
    },
    {
        value: 'Married',
        display: 'Married',
    },

    {
        value: 'Seperated',
        display: 'Seperated',
    },
];






export const isValidForm = (obj: Object, ...properties: Array<{ key: string, FieldNm: string }>) => properties.every(property => {
    const hasKey = obj.hasOwnProperty(property.key);
    if (!hasKey)
        emitInternalEvent({
            type: "alert_toast",
            data: `Invalid field ${property.FieldNm}`
        })
    return hasKey;
})


// =================================================================




export type ICategories = {
    name: string,
    subCategories: string[],
    _id:string
}