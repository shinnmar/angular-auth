import { DefaultUrlSerializer, UrlSerializer, UrlTree } from "@angular/router";

export class CustomUrlSerializer implements UrlSerializer {
    private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

    serialize(tree: UrlTree): string {
        return this._defaultUrlSerializer.serialize(tree).replace(/%20/g, '+').replace(/%7C/g, '|');
    }

    parse(url: string): UrlTree {
        url = url.replace(/\+/g, '%20').replace(/\|/g, '%7C');
        // Use the default serializer.
        return this._defaultUrlSerializer.parse(url);
    }
}