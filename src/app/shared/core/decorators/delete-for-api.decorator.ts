import "reflect-metadata";

const DELETE_KEY = 'delete';
const SELF_DELETE_KEY = 'self';
const LIST_PROPERTIES_KEY = 'propertiesDecorated';

export function IsRemovable(options?: {
    self?: boolean,
    delete?: boolean
}) {
    return function (target: any, property: string) {
        Reflect.defineMetadata(SELF_DELETE_KEY, options?.self || false, target, property);
        Reflect.defineMetadata(DELETE_KEY, options?.delete != undefined ? options.delete : true, target, property);

        savePropertyName(target, property);
    }
}

export function DeletePropertiesForApi(options?: {
    executeDecorator: 'before' | 'after'
}) {
    let executeDecorator = options?.executeDecorator || 'before';
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            //console.log(this);
            let resultFunction = null;
            if (executeDecorator == 'after') resultFunction = originalMethod.apply(this, args);

            let propiertiesDecorated: string[] = Reflect.getMetadata(LIST_PROPERTIES_KEY, target) || [];
            propiertiesDecorated.forEach(property => {
                let removable = <boolean>Reflect.getMetadata(DELETE_KEY, target, property);
                let self = <boolean>Reflect.getMetadata(SELF_DELETE_KEY, target, property);

                if (self) this[property]['deleteForApi']();
                if (removable) delete this[property];
                //this['Name'] = null;
            });

            if (executeDecorator == 'before') resultFunction = originalMethod.apply(this, args);
            return resultFunction;
        }
    }
}

function savePropertyName(target: any, property: string) {
    // get own fields from the target
    let complexFields = Reflect.getOwnMetadata(LIST_PROPERTIES_KEY, target);
    if (!complexFields) {
        // merge with inherited fields, if available.
        complexFields = Reflect.hasMetadata(LIST_PROPERTIES_KEY, target)
            ? Reflect.getMetadata(LIST_PROPERTIES_KEY, target).slice(0)
            : [];

        // define own fields on the target
        Reflect.defineMetadata(LIST_PROPERTIES_KEY, complexFields, target);
    }
    // record complex field
    complexFields.push(property);
}

/*
    npm install "reflect-metadata": "^0.1.13",

    tsconfig.json
        "paths": {
            "@shared_utils/*": ["src/app/shared/utils/*"]
        }
 */