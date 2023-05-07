


import { TemplateRef } from '@angular/core';
// import { MatDialog, MatDialogRef } from '@angular/material';

import { Injectable } from '@angular/core';

declare var $: any;
declare var moment: any;
function _window(): any {
    return window;
}

interface IBrowserSpec {
    name: string, version: string
}

@Injectable()
export class UtilService {

    // static currentModalRef: Array<MatDialogRef<any>> = [];
    static clone(srcObj: any) {
        return (Object as any).assign({}, srcObj);
    }

    static get Moment() {
        return moment;
    }

    static copy(srcObj: any, destObj: any) {
        return (Object as any).assign(destObj, srcObj);
    }

    static trim(txt: string) {

        txt = (txt as string).toString();

        if (String.prototype.trim) {
            return txt.trim();
        }
        else {
            return txt.replace(/^\s+|\s+$/g, '');
        }
    }

    static convertToDate(date: string) {
        var parts = date.split('/');
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0])); // months start from 0;
    }

    static StringIsNullOrEmpty(text: string): boolean {

        if (!text) {
            return true;
        }

        text = text.toString();

        if (text == null || text.toLowerCase() == 'null') {

            return true;
        }


        if (UtilService.trim(text).length < 1) {
            return true;
        }

        return false;
    }

    static SaveTokenApiCallStatus() {
        var tokenApiHasBeenCalledBefore = localStorage.getItem("tokenApiHasBeenCalled")
        if(tokenApiHasBeenCalledBefore != null || tokenApiHasBeenCalledBefore != undefined)
        {
          return tokenApiHasBeenCalledBefore.toLowerCase() == "true" ? true:false;
        }
        // var status = tokenStatus == true ?  "true":"false"
        // localStorage.setItem("tokenApiHasBeenCalled", status)
        // return tokenStatus;
        return false;
      }

    // static ObjectKeysLength(obj: any) {

    //     if (!Object.keys) {

    //         // Object.keys = function (obj) {
    //         (Object as any).keys = function (obj) {
    //             var keys = [], k;

    //             for (k in obj) {
    //                 if (Object.prototype.hasOwnProperty.call(obj, k)) {
    //                     keys.push(k);
    //                 }
    //             }
    //             return keys.length;
    //         };
    //     }
    //     else {
    //         return Object.keys(obj).length
    //     }
    // }

    static StringContainsDigit(value: string) {
        if (value) {
            return /\d/.test(value);
        }

        return false;
    }



    static getSanitizedAmount(amountEntered: string) {
        let validAmountXter = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

        if (!amountEntered) {
            return amountEntered;
        }


        let amountArray = amountEntered.toString().split('');
        let finalAmount = '';

        for (let cursor = 0; cursor < amountArray.length; cursor++) {
            if (validAmountXter.indexOf(amountArray[cursor]) != -1) {

                if (finalAmount.indexOf('.') != -1) {
                    let finalAmountArray = finalAmount.split('.');
                    if (finalAmountArray.length == 2 && finalAmountArray[1].length < 2) {
                        finalAmount += amountArray[cursor];
                    }
                    else if (finalAmountArray.length == 1) {
                        finalAmount += amountArray[cursor];
                    }
                }
                else {
                    finalAmount += amountArray[cursor];
                }
            }
        }

        return finalAmount;
    }


    static StringContainsUpperCaseCharacters(value: string) {

        if (value) {
            return value.toLowerCase() != value;
        }

        return false;
    }

    static StringContainsLowerCaseCharacters(value: string) {
        if (value) {
            return value.toUpperCase() != value;
        }

        return false;
    }

    static getBrowserObj(): IBrowserSpec {

        let userAgent = (_window().navigator.userAgent as string);
        let tempArray;
        let M = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {
            tempArray = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

            if (tempArray != null) {
                return { name: 'IE', version: (tempArray[1] || '') };
            }
        }

        if (M[1] === 'Chrome') {
            tempArray = userAgent.match(/\b(OPR|Edge)\/(\d+)/);

            if (tempArray != null) {
                return { name: tempArray[1].replace('OPR', 'Opera'), version: tempArray[2] };
            }
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if ((tempArray = userAgent.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tempArray[1]);
        return { name: M[0], version: M[1] };



        // {name: "MSIE", version: "8"}
        // {name: "Chrome", version: "39"}
        // {name: "Firefox", version: "36"}
        // {name: "Opera", version: "26"}
        // {name: "Edge", version: "14"}
        // {name: "Safari", version: "9"}
    }

    static generateSessionId() {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 7; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }


    // static getScreenType() {

    //     let screenWidth = _window().innerWidth;

    //     if (screenWidth > 1024) {
    //         return 'large';
    //     }
    //     else if (screenWidth >= 640 && screenWidth <= 1024) {
    //         return 'medium';
    //     }
    //     else if (screenWidth < 640) {
    //         return 'small';
    //     }
    // }



    // static getScreenTypeForDashboard() {

    //     let screenWidth = _window().innerWidth;

    //     if (screenWidth > 1024) {
    //         return 'large';
    //     }
    //     else if (screenWidth >= 640 && screenWidth <= 1023) {
    //         return 'medium';
    //     }
    //     else if (screenWidth < 640) {
    //         return 'small';
    //     }
    // }


    static isNotBigScreen() {

        let screenWidth = _window().innerWidth;

        return screenWidth < 1024;
    }



    static htmlDecode(value: string) {
        if (!UtilService.StringIsNullOrEmpty(value)) {
            var e = document.createElement('div');
            e.innerHTML = value;
            return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        }
        return value;
    }


    //INTELLIX CODE
    static onPageLoadCallback(pageName: string = '', useOther = true): void {

        if (typeof _window().htmlElement != "function") {
            _window().htmlElement = function (param) { };
        }

        if (useOther == true) {
            _window().htmlElement('other');
        }
        else {
            _window().htmlElement(pageName);
        }


        // if (useOther == true) {
        //     if (typeof _window().htmlElement != undefined) {
        //         // _window().htmlElement('other');
        //     }

        // }
        // else {
        //     if (typeof _window().htmlElement != undefined) {
        //         // _window().htmlElement(pageName);
        //     }

        // }
    }

    static onLoginPageCallback(): void {
        if (_window().omy) {
            delete _window().omy;
        }
    }



    static onSuccessfullyLoginCallback(authUserId: string): void {
        let _authUserId = authUserId;
        _window().omy = function () {
            var result = {
                "u": { "p": [_authUserId] }
            }

            return result;
        }
    }

    // END INTELLIX CODE


    static get Window() {
        return _window();
    }


    static get JQuery() {
        return $;
    }

    static removeSpecialXtersFromString(value: string) {
        let validXterArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];


        if (UtilService.StringIsNullOrEmpty(value)) {
            return value;
        }

        let valueArray = value.split('');
        let finalValue = '';

        for (let cursor = 0; cursor < valueArray.length; cursor++) {
            if (validXterArray.indexOf(valueArray[cursor].toLowerCase()) != -1) {
                finalValue += valueArray[cursor];
            }
        }

        return finalValue;
    }


    static toTitleCase(value: string) {
        if (!UtilService.StringIsNullOrEmpty(value)) {
            return value.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }

        return value;
    }

    // static showExceptionDialog(modalDialogRef: MatDialogRef<any>, modalTemplate: TemplateRef<any>, _dialog: MatDialog): MatDialogRef<any> {

    //     modalDialogRef = _dialog.open(modalTemplate, {
    //         height: '100%',
    //         width: '100%',
    //         hasBackdrop: true,
    //         disableClose: true,
    //         closeOnNavigation: true
    //     });

    //     let _loadingModalInterval = setInterval(function () {
    //         if ($('div.cdk-overlay-pane').length > 0) {
    //             $('div.cdk-overlay-pane').css('max-width', '100vw');
    //             _window().clearInterval(_loadingModalInterval);
    //         }
    //     }, 50);


    //     if (!this.currentModalRef) {
    //         this.currentModalRef = new Array<MatDialogRef<any>>();
    //     }

    //     this.currentModalRef.push(modalDialogRef);


    //     return modalDialogRef;
    // }



    static GetUniqueArray(array: Array<any>) {
        var arr = [];
        for (var i = 0; i < array.length; i++) {
            if (arr.indexOf(array[i]) == -1) {
                arr.push(array[i]);
            }
        }

        return arr;
    }



    // static getScreenType() {

    //     let screenWidth = _window().innerWidth;

    //     if (screenWidth > 1024) {
    //         return 'large';
    //     }
    //     else if (screenWidth >= 640 && screenWidth <= 1024) {
    //         return 'medium';
    //     }
    //     else if (screenWidth < 640) {
    //         return 'small';
    //     }
    // }


    // static showBasicModal(modalDialogRef: MatDialogRef<any>, modalTemplate: TemplateRef<any>, dialog: MatDialog, usePercentageWidth: boolean = false, percentageWidth = 100): MatDialogRef<any> {

    //     try {
    //         if (usePercentageWidth != true) {
    //             modalDialogRef = dialog.open(modalTemplate,
    //                 {
    //                     hasBackdrop: true,
    //                     disableClose: true,
    //                     closeOnNavigation: true,
    //                     panelClass: ['custom-add-confirmationModal']
    //                 });
    //         }
    //         else {
    //             modalDialogRef = dialog.open(modalTemplate,
    //                 {
    //                     width: `${percentageWidth}%`,
    //                     hasBackdrop: true,
    //                     disableClose: true,
    //                     closeOnNavigation: true,
    //                     panelClass: ['custom-add-confirmationModal']
    //                 });
    //         }


    //         if (!this.currentModalRef) {
    //             this.currentModalRef = new Array<MatDialogRef<any>>();
    //         }

    //         this.currentModalRef.push(modalDialogRef);

    //         return modalDialogRef;
    //     }
    //     catch (ex) {
    //         console.log(ex);
    //     }

    // }



    static NubanValidator(accountNumber: string, registeredBanks: any): any[] {


        if (!registeredBanks || (registeredBanks && registeredBanks.length < 1)) {
            return [];
        }

        let banks: any[] = [];

        try {
            for (let b of registeredBanks) {
                let accountNumberArray: string[] = (b.code + '' + accountNumber).split('');
                let summation = (
                    ((+accountNumberArray[0]) * 3) +
                    ((+accountNumberArray[1]) * 7) +
                    ((+accountNumberArray[2]) * 3) +
                    ((+accountNumberArray[3]) * 3) +
                    ((+accountNumberArray[4]) * 7) +
                    ((+accountNumberArray[5]) * 3) +
                    ((+accountNumberArray[6]) * 3) +
                    ((+accountNumberArray[7]) * 7) +
                    ((+accountNumberArray[8]) * 3) +
                    ((+accountNumberArray[9]) * 3) +
                    ((+accountNumberArray[10]) * 7) +
                    ((+accountNumberArray[11]) * 3)
                )
                let checkSum = (10 - (summation % 10)) % 10;
                if (checkSum === (+accountNumberArray[12])) {
                    banks.push(b);
                }
            }
        } catch (error) {

        }

        return banks;
    }


    static formatDateAsFriendlyShortString(date: Date): string {
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        return `${date.getDate()}/${month}/${date.getFullYear()}`;
    }

    static formatNumStringAsCurrency(numbString, currency?: string) {
        if (currency) {
            return numbString.toLocaleString('en-US', { style: 'currency', currency: currency });
        }
        return numbString.toLocaleString();
    }
    static formatDateAsSystemShortString(date: Date): string {
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        return `${date.getFullYear()}-${month}-${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}`;
    }


    static DifferenceInWeeks(startDate: Date, endDate: Date, addRemnantDaysAsAWeek: boolean = false): number {

        let timeDifference = (startDate.getTime() - endDate.getTime()) / 1000;

        let weekDifference = timeDifference / (60 * 60 * 24 * 7);
        weekDifference = Math.abs(Math.round(weekDifference))

        if (addRemnantDaysAsAWeek == true) {
            let daysDifference = timeDifference / (60 * 60 * 24);
            daysDifference = Math.abs(Math.ceil(daysDifference));

            if (daysDifference > (weekDifference * 7)) {
                weekDifference += 1;
            }
        }

        return weekDifference;
    }



    static JSONToCSVConvertor(JSONData, ShowLabel, fileName) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        if (ShowLabel) {
            var row = "";
            for (var index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            for (var index in arrData[i]) {
                var arrValue = arrData[i][index];
                row += arrValue + ',';
            }

            CSV += row + '\r\n';
        }
        if (CSV == '') {
            console.error("Invalid data");
            return;
        }

        if (this.msieversion()) {
            var IEwindow = _window().open();
            IEwindow.document.write('sep=,\r\n' + CSV);
            IEwindow.document.close();
            IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
            IEwindow.close();
        } else {
            let uri = 'data:application/csv;charset=utf-8,' + _window().escape(CSV);
            let link = _window().document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            _window().document.body.appendChild(link);
            link.click();
            _window().document.body.removeChild(link);
        }
    }



    static msieversion() {
        var ua = _window().navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie != -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number 
        {
            return true;
        } else { // If another browser, 
            return false;
        }
        //return false; 
    }


    static validatePasswordContent(password: string): boolean {

        if (UtilService.StringIsNullOrEmpty(password)) {
            return false;
        }

        // let possible = "abcdefghijklmnopqrstuvwxyz0123456789#^@.:*<>(:)?|&~$%\\";
        let possible = "abcdefghijklmnopqrstuvwxyz0123456789#^@.*<>(:)?|&";


        password = password.toLowerCase();

        for (let _char of password.trim()) {
            // console.log(_char);
            if (possible.indexOf(_char) == -1) {
                // console.log("Return false on: " + _char);
                return false;
            }
        }

        return true;
    }

}