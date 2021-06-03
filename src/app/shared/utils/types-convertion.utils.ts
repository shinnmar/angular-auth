import { DatePipe } from "@angular/common";
import { ElementRef } from '@angular/core';

import * as objectPath from 'object-path';
import * as moment from "moment";

export function isNumber(value: any): boolean {
  return !isNaN(toInteger(value));
}

export function getDateString(_date: Date = new Date()): string {
  let pipe = new DatePipe('en-US');
  return pipe.transform(_date, 'yyyy-MM-dd');
}

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function getUrlFromFile(data: Blob): Promise<string> {
  let reader = new FileReader();
  reader.readAsDataURL(data);
  return new Promise((resolve, reject) => {
    reader.onload = (event: any) => { // called once readAsDataURL is completed
      resolve(event.target.result);
    }
  });
}

export function getImageDimensions(data: File): Promise<number[]> {
  let reader = new FileReader();
  reader.readAsDataURL(data);
  return new Promise((resolve, reject) => {
    reader.onload = (event: any) => {
      let image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        resolve([image.width, image.height]);
      }
    }
  });
}

export function buildTreeLevel2<T>(obj: T[], original: T[], IdParent: string) {
  return obj.filter(o => o['IdParent'] == IdParent).map(o => {
    // const node = { text: '', value: '', checked: false, collapsed: false, children: [] };
    // node.value = o.IdItem;
    // node.text = o.Nombre || o.Descripcion;
    const children = original.filter(so => so["IdParent"] == o['IdCatalog']);
    if (children && children.length > 0) {
      o["Children"] = buildTreeLevel2<T>(children, original, o["IdCatalog"]);
    } else {
      o["Children"] = [];
    }
    return o;
  });
}


export function orderBy<T>(list: T[], key: string, type: number): T[] {
  if (Array.isArray(list)) {

    if (type == 1 || type == 2) {
      return list.sort(function (a, b) {
        let value1 = (<number>objectPath.get(a, key.trim())) || 0;
        let value2 = (<number>objectPath.get(b, key.trim())) || 0;
        return (type == 1) ? value1 - value2 : value2 - value1;
      });
    }

    if (type == 3 || type == 4) {
      return list.sort(function (a, b) {
        let value1 = (<string>objectPath.get(a, key.trim())).toLowerCase();
        let value2 = (<string>objectPath.get(b, key.trim())).toLowerCase();
        return (type == 3) ? (value1).localeCompare(value2) : (value2).localeCompare(value1);
      });
    }
  }
  return [];
}

export function scrollUpDown(element: ElementRef, top: number) {
  (<HTMLElement>element.nativeElement).scrollBy({
    top: top, // could be negative value
    left: 0,
    behavior: 'smooth'
  });
}

export function firstDayOfMonth() {
  return moment().startOf('month').toDate();
}

export function lastDayOfMonth() {
  return moment().endOf('month').toDate();
}

export function downloadExcel(data, name) {
  const byteCharacters = atob(data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const filename = name;
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}