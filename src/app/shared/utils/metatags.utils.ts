import { MetaDefinition } from '@angular/platform-browser';
//import { PageModel } from '../../modules/intranet/settings/models/page.model';

export class MetatagsUtils {

    static createMetatags(data: any | 'PageModel'): MetaDefinition[] {
        let meta: MetaDefinition[] = [];

        if (data.Description?.trim()) meta.push({ name: 'description', content: data.Description });
        if (data.Keywords?.trim()) meta.push({ name: 'keywords', content: data.Keywords });
        if (data.Author?.trim()) meta.push({ name: 'author', content: data.Author });
        if (data.Copyright?.trim()) meta.push({ name: 'copyright', content: data.Copyright });
        //if(data.Date?.trim()) meta.push({name: 'date', content: data.Date, scheme: 'YYYY-MM-DD'});

        return meta;
    }

}